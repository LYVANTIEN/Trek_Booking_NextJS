interface IHotelImageService {
  getHotelImageByHotelId(hotelId: number): Promise<IHotelImage[]>;
    createHotelImage(hotelImage: IHotelImage): Promise<IHotelImage>;
    //updateHotel(roomImage: Partial<IRoomImage>): Promise<IRoomImage>;
    deleteHotelImage(hotelImageId: number): Promise<void>;
  }
  
  const hotelImageService: IHotelImageService = {
    async getHotelImageByHotelId(hotelId) {
     // console.log(roomId);
      try {
        const response = await fetch(
          `https://localhost:7132/getHotelImagebyHotelId/${hotelId}`,
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
          throw new Error("Failed to fetch room image list");
        }
        const data = await response.json();
        return data;
      } 
      catch (error) {
        console.error("Error fetching hotel list:", error);
        throw error;
      }
    },
  
    async createHotelImage(hotelImage) {
      try {
        const response = await fetch(`https://localhost:7132/createHotelImage`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(hotelImage),
        });
        if (!response.ok) {
          throw new Error("Failed to add hotel image");
        }
        return await response.json();
      } catch (error) {
        console.error("Error add hotel image:", error);
        throw error;
      }
    },
  
    // async updateRoomImage(roomImage) {
    //   try {
    //     const response = await fetch(
    //       `https://localhost:7132/updateHotel`,
    //       {
    //         method: "PUT",
    //         headers: {
    //           Accept: "application/json, text/plain, */*",
    //           "Content-Type": "application/json",
    //           Authorization: `Bearer ${localStorage.getItem("token")}`, // Retrieve token from localStorage
    //         },
    //         body: JSON.stringify(hotel),
    //       }
    //     );
    //     if (!response.ok) {
    //       throw new Error("Failed to update hotel");
    //     }
    //     const data = await response.json();
    //     return data;
    //   } catch (error) {
    //     console.error("Error updating hotel:", error);
    //     throw error;
    //   }
    // },
    async deleteHotelImage(hotelImageId) {
      try {
        const response = await fetch(
          `https://localhost:7132/deleteHotelImage/${hotelImageId}`,
          {
            method: "DELETE",
            headers: {
              Accept: "application/json, text/plain, */*",
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`, // Retrieve token from localStorage
            },
            body: JSON.stringify({ status: false }),
          }
        );
        if (!response.ok) {
          throw new Error("Failed to update hotel image status to false");
        }
      } catch (error) {
        console.error("Error updating hotel image to false:", error);
        throw error;
      }
    },
  };
  export default hotelImageService;
  