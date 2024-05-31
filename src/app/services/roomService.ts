interface IRoomService {
    getRoomsByHotelId(hotelId: number): Promise<IRoom[]>;
    createRoom(room: IRoom): Promise<IRoom>;
    deleteRoom(roomId: number): Promise<IRoom[]>;
    recoverRoomDeleted(roomId: number): Promise<IRoom[]>;
    updateRoom(room: IRoom):Promise<IRoom>;
}

const roomService: IRoomService = {
    async getRoomsByHotelId(hotelId) {
        console.log(hotelId);
        try {
          const response = await fetch(
            `https://localhost:7132/getRoombyHotelId/${hotelId}`,
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
            throw new Error("Failed to fetch room list");
          }
          const data = await response.json();
          console.log(data); // Trigger refetch after fetching
          return data;
        } 
        catch (error) {
          console.error("Error fetching room list:", error);
          throw error;
        }
      },

      async deleteRoom(roomId) {
        console.log(roomId);
        try {
          const response = await fetch(
            `https://localhost:7132/deleteRoom/${roomId}`,
            {
              method: "PUT",
              headers: {
                Accept: "application/json, text/plain, */*",
                "Content-Type": "application/json",
                // Include the token in the headers
                Authorization: `Bearer ${localStorage.getItem("token")}`, // Retrieve token from localStorage
              },
            }
          );
          if (!response.ok) {
            throw new Error("Failed to fetch room");
          }
          const data = await response.json();
          console.log(data); // Trigger refetch after fetching
          return data;
        } 
        catch (error) {
          console.error("Error fetching room:", error);
          throw error;
        }
      },

      async recoverRoomDeleted(roomId) {
        console.log(roomId);
        try {
          const response = await fetch(
            `https://localhost:7132/recoverRoomDeleted/${roomId}`,
            {
              method: "PUT",
              headers: {
                Accept: "application/json, text/plain, */*",
                "Content-Type": "application/json",
                // Include the token in the headers
                Authorization: `Bearer ${localStorage.getItem("token")}`, // Retrieve token from localStorage
              },
            }
          );
          if (!response.ok) {
            throw new Error("Failed to fetch room");
          }
          const data = await response.json();
          console.log(data); // Trigger refetch after fetching
          return data;
        } 
        catch (error) {
          console.error("Error fetching room:", error);
          throw error;
        }
      },

      async createRoom(room) {
        try {
          const response = await fetch(
            `https://localhost:7132/createRoom`,
            {
              method: "POST",
              headers: {
                Accept: "application/json, text/plain, */*",
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`, 
              },
              body: JSON.stringify(room),
            }
          );
      
          if (!response.ok) {
            throw new Error("Failed to create Room");
          }
      
          const contentType = response.headers.get("Content-Type");
          let data;
          if (contentType && contentType.includes("application/json")) {
            data = await response.json();
          } else {
            data = await response.text();
          }
      
          console.log(data);
          return data;
        } catch (error) {
          console.error("Error creating room:", error);
          throw error;
        }
      },
      async updateRoom(room) {
        try {
          const response = await fetch(
            `https://localhost:7132/updateRoom`,
            {
              method: "PUT",
              headers: {
                Accept: "application/json, text/plain, */*",
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`, 
              },
              body: JSON.stringify(room),
            }
          );
      
          if (!response.ok) {
            throw new Error("Failed to update Room");
          }
      
          const contentType = response.headers.get("Content-Type");
          let data;
          if (contentType && contentType.includes("application/json")) {
            data = await response.json();
          } else {
            data = await response.text();
          }
      
          console.log(data);
          return data;
        } catch (error) {
          console.error("Error update room:", error);
          throw error;
        }
      },
      
}
export default roomService;