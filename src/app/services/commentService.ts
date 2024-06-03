interface ICommentService {
    getCommentsByHotelId(hotelId: number): Promise<IComment[]>;
}

const commentService: ICommentService = {
    async getCommentsByHotelId(hotelId) {
        console.log(hotelId);
        try {
          const response = await fetch(
            `https://localhost:7132/getCommentByHotelId/${hotelId}`,
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
            throw new Error("Failed to fetch comment list");
          }
          const data = await response.json();
          // console.log(data); // Trigger refetch after fetching
          return data;
        } 
        catch (error) {
          console.error("Error fetching comment list:", error);
          throw error;
        }
      },
}
export default commentService;