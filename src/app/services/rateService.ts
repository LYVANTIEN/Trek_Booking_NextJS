import { Hotel } from '@mui/icons-material';

interface IRateFeedback {
  rateValue: number;
  bookingId: number;
  userId: number;
  hotelId: number;
}
interface IRateService {
    getRatesByHotelId(hotelId: number): Promise<IRate[]>;
    rateBooking(rateData: IRateFeedback): Promise<IRateFeedback>;
}

const rateService: IRateService = {
    async getRatesByHotelId(hotelId) {
        console.log(hotelId);
        try {
          const response = await fetch(
            `https://localhost:7132/getRateByHotelId/${hotelId}`,
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
            throw new Error("Failed to fetch rate list");
          }
          const data = await response.json();
          // console.log(data); // Trigger refetch after fetching
          return data;
        } 
        catch (error) {
          console.error("Error fetching rate list:", error);
          throw error;
        }
      },
      
      async rateBooking(rateData) {        
        try {
          const response = await fetch(
            `https://localhost:7132/rateHotel`,
            {
              method: "POST",
              headers: {
                Accept: "application/json, text/plain, */*",
                "Content-Type": "application/json",
                // Include the token in the headers
                Authorization: `Bearer ${localStorage.getItem("token")}`, // Retrieve token from localStorage
              },
              body: JSON.stringify(rateData)
            }
          );
          if (!response.ok) {
            throw new Error("Failed to fetch rate");
          }
          const data = await response.json();
          // console.log(data); // Trigger refetch after fetching
          return data;
        } 
        catch (error) {
          console.error("Error fetching rate", error);
          throw error;
        }
      },
}
export default rateService;