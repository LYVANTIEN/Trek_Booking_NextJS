import Cookies from 'js-cookie';


interface IHotelService {
  getHotelsBySuppierId(): Promise<IHotel[]>;
  getHotelById(hotelId: number): Promise<IHotel>;
  createHotel(hotel: IHotel): Promise<IHotel>;
  updateHotel(hotel: Partial<IHotel>): Promise<IHotel>;
  updateHotelAvatar(hotel: Partial<IHotel>): Promise<IHotel>;
  getHotels(): Promise<any[]>;
  deleteHotel(hotelId: number): Promise<IHotel>;
  recoverHotelDeleted(hotelId: number): Promise<IHotel>;

  searchHotelByCity(city: string): Promise<IHotel[]>;
  searchHotelSchedule(checkInDate: string, checkOutDate: string, city: string): Promise<IHotel[]>;

 // convertDateFormat(dateStr: string): string;

}

const hotelService: IHotelService = {
  async getHotels() {
    try {
      const response = await fetch("https://localhost:7132/getHotels", {
        headers: {
          "Content-Type": "application/json",
          // Include the token in the headers
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Retrieve token from localStorage
        },
      });
      if (!response.ok) { 
        throw new Error("Failed to fetch booking list");
      }
      const data = await response.json();
      // console.log(data); // Trigger refetch after fetching
      return data;
    } catch (error) {
      console.error("Error fetching booking list:", error);
      throw error;
    }
  },
  /// search hotel by city


  async searchHotelByCity(city: string): Promise<IHotel[]> {
    // console.log(hotelId);
     try {
       const response = await fetch(
         `https://localhost:7132/searchHotelByCity?city=${encodeURIComponent(city)}`,
         {
           method: "GET",
           headers: {
             Accept: "application/json, text/plain, */*",
             "Content-Type": "application/json",
             Authorization: `Bearer ${localStorage.getItem("token")}`, // Retrieve token from localStorage
           },
         }
       );
       if (!response.ok) {
         throw new Error("Failed to fetch hotel details");
       }
       const data: IHotel[] = await response.json();
    return data;
     } 
     catch (error) {
       console.error("Error fetching hotel details:", error);
       throw error;
     }
   },

   ///search hotel by schedule

  //   convertDateFormat(dateStr: string): string {
  //   const [day, month, year] = dateStr.split('/');
  //   return `${year}/${month}/${day}`;
  // },

  async searchHotelSchedule(checkInDate: string, checkOutDate: string, city: string): Promise<IHotel[]> {
    // const checkInDate = this.convertDateFormat(checkInDateStr);
    // const checkOutDate = this.convertDateFormat(checkOutDateStr);

    try {
      const response = await fetch(
        `https://localhost:7132/searchHotelSchedule?checkInDate=${checkInDate}&checkOutDate=${checkOutDate}&city=${encodeURIComponent(city)}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch hotel details");
      }
      const data: IHotel[] = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching hotel details:", error);
      throw error;
    }
  },
   
  
  async getHotelsBySuppierId() {
    try {
      const response = await fetch(
        `https://localhost:7132/getHotelsBySupplierId`,
        {
          method: "GET",
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
            // Include the token in the headers
            Authorization: `Bearer ${Cookies.get("tokenSupplier")}`, // Retrieve token from localStorage
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch hotel list");
      }
      const data = await response.json();
      console.log(data); // Trigger refetch after fetching
      return data;
    } 
    catch (error) {
      console.error("Error fetching hotel list:", error);
      throw error;
    }
  },

  async getHotelById(hotelId) {
   // console.log(hotelId);
    try {
      const response = await fetch(
        `https://localhost:7132/getHotelById/${hotelId}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Retrieve token from localStorage
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch hotel details");
      }
      const data: IHotel = await response.json(); // Ensure the returned data is a single hotel object
      //console.log(data); // Trigger refetch after fetching
      return data;
    } 
    catch (error) {
      console.error("Error fetching hotel details:", error);
      throw error;
    }
  },

  async createHotel(hotel) {
    try {
      const response = await fetch(`https://localhost:7132/createHotel`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(hotel),
      });
      if (!response.ok) {
        throw new Error("Failed to create hotel");
      }
      return await response.json();
    } catch (error) {
      console.error("Error creating hotel:", error);
      throw error;
    }
  },

  async updateHotel(hotel) {
    try {
      const response = await fetch(
        `https://localhost:7132/updateHotel`,
        {
          method: "PUT",
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Retrieve token from localStorage
          },
          body: JSON.stringify(hotel),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update hotel");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error updating hotel:", error);
      throw error;
    }
  },

  async updateHotelAvatar(hotel) {
    try {
      const response = await fetch(
        `https://localhost:7132/updateHotelAvatar`,
        {
          method: "PUT",
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Retrieve token from localStorage
          },
          body: JSON.stringify(hotel),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update hotel");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error updating hotel:", error);
      throw error;
    }
  },

  async deleteHotel(hotelId) {
    console.log(hotelId);
    try {
      const response = await fetch(
        `https://localhost:7132/deleteHotel/${hotelId}`,
        {
          method: "PUT",
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch hotel");
      }
  
      const contentType = response.headers.get("content-type");
      let data;
      if (contentType && contentType.includes("application/json")) {
        data = await response.json();
      } else {
        data = await response.text(); // Handle plain text response
      }
  
      console.log(data);
      return data;
    } catch (error) {
      console.error("Error fetching hotel:", error);
      throw error;
    }
  },

  async recoverHotelDeleted(hotelId) {
    console.log(hotelId);
    try {
      const response = await fetch(
        `https://localhost:7132/recoverHotelDeleted/${hotelId}`,
        {
          method: "PUT",
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch hotel");
      }
  
      const contentType = response.headers.get("content-type");
      let data;
      if (contentType && contentType.includes("application/json")) {
        data = await response.json();
      } else {
        data = await response.text(); // Handle plain text response
      }
  
      console.log(data);
      return data;
    } catch (error) {
      console.error("Error fetching hotel:", error);
      throw error;
    }
  },
};
export default hotelService;