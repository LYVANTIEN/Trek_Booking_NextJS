interface IRoomImageService {
    getRoomImageByRoomId(roomId: number): Promise<IRoom[]>;
    createRoomImage(roomImage: IRoomImage): Promise<IRoomImage>;
    //updateHotel(roomImage: Partial<IRoomImage>): Promise<IRoomImage>;
    deleteHotel(roomImageId: number): Promise<void>;
  }
  
  const roomImageService: IRoomImageService = {
    async getRoomImageByRoomId(roomId) {
      console.log(roomId);
      try {
        const response = await fetch(
          `https://localhost:7132/getRoomImagebyRoomId/${roomId}`,
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
        console.log(data); // Trigger refetch after fetching
        return data;
      } 
      catch (error) {
        console.error("Error fetching hotel list:", error);
        throw error;
      }
    },
  
    async createRoomImage(roomImage) {
      try {
        const response = await fetch(`https://localhost:7132/createRoomImage`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(roomImage),
        });
        if (!response.ok) {
          throw new Error("Failed to add room image");
        }
        return await response.json();
      } catch (error) {
        console.error("Error add room image:", error);
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
    async deleteHotel(hotelId) {
      try {
        const response = await fetch(
          `https://localhost:7132/deleteRoomImage/${hotelId}`,
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
          throw new Error("Failed to update hotel status to false");
        }
      } catch (error) {
        console.error("Error updating hotel status to false:", error);
        throw error;
      }
    },
  };
  export default roomImageService;
  