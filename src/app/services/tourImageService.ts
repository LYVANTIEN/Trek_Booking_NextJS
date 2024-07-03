import { ITour } from "../entities/tour";
import Cookies from "js-cookie";
interface ITourImageService {
    
    getTourImageByTourId(tourId: number): Promise<ITourImage[]>;
    createTourImage(tourImage: ITourImage): Promise<ITourImage>;
    deleteTourImage(tourImageId: number): Promise<void>;
  }
  
  const tourImageService: ITourImageService = {
    async getTourImageByTourId(tourId) {
        console.log(tourId);
        try {
          const response = await fetch(
            `https://localhost:7132/getTourImageByTourId/${tourId}`,
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
  
    async createTourImage(tourImage) {
      try {
        const response = await fetch(`https://localhost:7132/createTourImage`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(tourImage),
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
  
    
    async deleteTourImage(tourImageId) {
      try {
        const response = await fetch(
          `https://localhost:7132/deleteTourImage/${tourImageId}`,
          {
            method: "DELETE",
            headers: {
              Accept: "application/json, text/plain, */*",
              "Content-Type": "application/json",
              Authorization: `Bearer ${Cookies.get("tokenSupplier")}`, // Retrieve token from localStorage
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
  export default tourImageService;
  