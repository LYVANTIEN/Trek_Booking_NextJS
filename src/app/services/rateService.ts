import Cookies from 'js-cookie';
interface IRateService {
    getRatesByHotelId(hotelId: number): Promise<IRate[]>;
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
                Authorization: `Bearer ${Cookies.get("tokenUser")}`, // Retrieve token from localStorage
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
}
export default rateService;