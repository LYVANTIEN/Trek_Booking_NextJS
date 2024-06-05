interface IHotelService {
  getHotelsBySuppierId(supplierId: number): Promise<IHotel[]>;
  getHotelById(hotelId: number): Promise<IHotel>;
  createHotel(hotel: IHotel): Promise<IHotel>;
  updateHotel(hotel: Partial<IHotel>): Promise<IHotel>;
  deleteHotel(hotelId: number): Promise<void>;
  getHotels(): Promise<any[]>;
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

  async getHotelsBySuppierId(supplierId) {
    console.log(supplierId);
    try {
      const response = await fetch(
        `https://localhost:7132/getHotelsBySupplierId/${supplierId}`,
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
    console.log(hotelId);
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
      console.log(data); // Trigger refetch after fetching
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
  async deleteHotel(hotelId) {
    try {
      const response = await fetch(
        `https://localhost:7132/deleteHotel/${hotelId}`,
        {
          method: "PUT",
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Retrieve token from localStorage
          },
          body: JSON.stringify({ status: false }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update hotel status to false");
      }
    } catch (error) {
      console.error("Error updating hotel status to false:", error);
      throw error;
    }
  },
};
export default hotelService;
