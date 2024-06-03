interface ITourOrderService {
  getTourOrderBySupplierId(supplierId: number): Promise<ITourOrder[]>;
  updateTourOrder(tourOrder: {
    tourOrderId: number;
    userId: number;
    tourId: number;
    tourOrderDate: string | Date;
    tourOrderQuantity: number;
    tourTotalPrice: number;
    supplierId: number;
    isConfirmed: boolean;
    status: boolean;
  }): Promise<void>;
}

const tourOrderService: ITourOrderService = {
  async getTourOrderBySupplierId(supplierId) {
    // console.log(supplierId);
    try {
      const response = await fetch(
        `https://localhost:7132/getTourOrderBySupplierId/${supplierId}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
            // Include the token in the headers
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Retrieve token from localStorage
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch tour order list");
      }
      const data = await response.json();
      // console.log(data); // Trigger refetch after fetching
      return data;
    } catch (error) {
      console.error("Error fetching tour order list:", error);
      throw error;
    }
  },
  async updateTourOrder(tourOrder) {
    try {
      const response = await fetch(
        `https://localhost:7132/updateTourOrder/${tourOrder.tourOrderId}`,
        {
          method: "PUT",
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Retrieve token from localStorage
          },
          body: JSON.stringify(tourOrder),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to edit tour order");
      }
      const updatedTourOrder = await response.json();
      console.log(updatedTourOrder); // Log updated booking details
      // mutate(this.getBookingsBySupplierId);
      return updatedTourOrder;
    } catch (error) {
      console.error("Error editing booking:", error);
      throw error;
    }
  },
};
export default tourOrderService;
