import Cookies from "js-cookie";
import BASE_URL from "./apiService";

interface IOrderHotelHeaderService {
  getOrderHotelHeaderByUserId(): Promise<IOrderHotelHeader[]>;
  getOrderHotelHeaderBySupplierId(): Promise<IOrderHotelHeader[]>;
  updateOrderHotelHeader(orderHotelHeader: {
    completed: boolean;
  }): Promise<IOrderHotelHeader[]>;
}

const orderHotelHeaderService: IOrderHotelHeaderService = {
  async getOrderHotelHeaderByUserId() {
    try {
      const response = await fetch(
        `https://localhost:7132/getOrderHotelHeaderByUserId`,
        {
          method: "GET",
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("token")}`, // Retrieve token from localStorage
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch order hotel headers");
      }
      const data = await response.json();
      console.log(data); // Trigger refetch after fetching
      return data;
    } catch (error) {
      console.error("Error fetching order hotel headers:", error);
      throw error;
    }
  },
  async getOrderHotelHeaderBySupplierId() {
    try {
      const response = await fetch(
        `https://localhost:7132/getOrderHotelHeaderBySupplierId`,
        {
          method: "GET",
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("tokenSupplier")}`, // Retrieve token from localStorage
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch order hotel headers");
      }
      const data = await response.json();
      console.log(data); // Trigger refetch after fetching
      return data;
    } catch (error) {
      console.error("Error fetching order hotel headers:", error);
      throw error;
    }
  },
  async updateOrderHotelHeader(orderHotelHeader) {
    try {
      const response = await fetch(
        `https://localhost:7132/updateOrderHotelHeader`,
        {
          method: "PUT",
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("tokenSupplier")}`, // Retrieve token from localStorage
          },
          body: JSON.stringify(orderHotelHeader),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch order hotel headers");
      }
      const data = await response.json();
      console.log(data); // Trigger refetch after fetching
      return data;
    } catch (error) {
      console.error("Error fetching order hotel headers:", error);
      throw error;
    }
  },
};

export default orderHotelHeaderService;
