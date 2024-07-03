import Cookies from 'js-cookie';
interface IOrderHotelDetailService{
    getOrderHotelDetailByOrderHotelHeaderId(orderHotelHeaderId: number): Promise<IOrderHotelDetail>;
}

const orderHotelDetailService: IOrderHotelDetailService = {
    async getOrderHotelDetailByOrderHotelHeaderId(orderHotelHeaderId) {
        try {
          const response = await fetch(
            `https://localhost:7132/getOrderHotelDetailByOrderHotelHeaderId/${orderHotelHeaderId}`,
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
            throw new Error("Failed to fetch user");
          }
          const data = await response.json();
          console.log(data); // Trigger refetch after fetching
          return data;
        } 
        catch (error) {
          console.error("Error fetching user:", error);
          throw error;
        }
      },
}
export default orderHotelDetailService;