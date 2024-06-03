import { mutate } from "swr";

interface IBookingService {
    getBookingsBySupplierId(supplierId: number): Promise<IBooking[]>;
    updateBooking(booking: {
      bookingId: number;
      userId: number;
      hotelId: number;
      roomId: number;
      checkInDate: string|Date;
      checkOutDate: string|Date;
      totalPrice: number;
      roomQuantity: number;
      voucherCode: string;
      userNote: string;
      status: boolean;
      isConfirmed: boolean;
    }): Promise<void>;
  }
  
  const bookingService: IBookingService = {
    async getBookingsBySupplierId(supplierId) {
      // console.log(supplierId);
      try {
        const response = await fetch(
          `https://localhost:7132/getBookingBySupplierId/${supplierId}`,
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
          throw new Error("Failed to fetch booking list");
        }
        const data = await response.json();
        // console.log(data); // Trigger refetch after fetching
        return data;
      } 
      catch (error) {
        console.error("Error fetching booking list:", error);
        throw error;
      }
    },
    async updateBooking(booking) {
      try {
        const response = await fetch(
          `https://localhost:7132/updateBooking/${booking.bookingId}`,
          {
            method: "PUT",
            headers: {
              Accept: "application/json, text/plain, */*",
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`, // Retrieve token from localStorage
            },
            body: JSON.stringify(booking),
          }
        );
        if (!response.ok) {
          throw new Error("Failed to edit booking");
        }
        const updatedBooking = await response.json();
        console.log(updatedBooking); // Log updated booking details
        // mutate(this.getBookingsBySupplierId);
        return updatedBooking;
      } catch (error) {
        console.error("Error editing booking:", error);
        throw error;
      }
    },
  };
  export default bookingService;
  