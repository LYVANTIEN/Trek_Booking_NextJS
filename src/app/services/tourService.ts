
import useSWR, { mutate } from 'swr';
import { ITour } from '../entities/tour';
interface ITourService {
    getToursBySuppierId(supplierId: number): Promise<ITour[]>;
    getTourImageByTourId(tourId: number): Promise<ITourImage[]>;
    getTours(): Promise<any[]>;
  }



export const tourService: ITourService = {

    async getTours() {
      try {
        const response = await fetch("https://localhost:7132/getTours", {
          headers: {
            "Content-Type": "application/json",
            // Include the token in the headers
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Retrieve token from localStorage
          },
        });
        if (!response.ok) { 
          throw new Error("Failed to fetch tour list");
        }
        const data = await response.json();
        // console.log(data); // Trigger refetch after fetching
        return data;
      } catch (error) {
        console.error("Error fetching user list:", error);
        throw error;
      }
    },

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

  async getToursBySuppierId(supplierId: number) {
    try {
      const response = await fetch(
        `https://localhost:7132/getTourBySupplierId/${supplierId}`,
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
        throw new Error("Failed to fetch tour list");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching tour list:", error);
      throw error;
    }
  },
};

export const revalidateTours = () => mutate(tourService.getToursBySuppierId);
  
  export const createTour = async (tourName: string, tourDescription: string,tourPrice:number,tourAddress:string,tourTime:string,tourTransportation:string,tourCapacity:number,tourDiscount:number,status:boolean,supplierId:number) => {
    const response = await fetch('https://localhost:7132/createTour', {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ tourName, tourDescription, tourPrice,tourAddress,tourTime,tourTransportation,tourCapacity,status,supplierId,tourDiscount})
    });
  
    if (!response.ok) {
      throw new Error('Failed to create tour');
    }

    const contentType = response.headers.get('Content-Type');
    if (contentType && contentType.includes('application/json')) {
      return response.json();
    } else {
      return response.text(); // Handle non-JSON response
    }
  };
  export const updateTour = async (tourId:number,tourName: string, tourDescription: string,tourPrice:number,tourAddress:string,tourTime:string,tourTransportation:string,tourCapacity:number,tourDiscount:number,status:boolean,supplierId:number) => {
    const response = await fetch('https://localhost:7132/updateTour', {
      method: 'PUT',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({tourId, tourName, tourDescription, tourPrice,tourAddress,tourTime,tourTransportation,tourCapacity,tourDiscount,status,supplierId})
    });
  
    if (!response.ok) {
      throw new Error('Failed to update tour');
    }


    // mutate("tourList")
    const contentType = response.headers.get('Content-Type');
    if (contentType && contentType.includes('application/json')) {
      return response.json();
    } else {
      return response.text(); // Handle non-JSON response
    }
  };

    
  export const toggleTourStatus = async (tourId: number): Promise<void> => {
    try {
      const response = await fetch('https://localhost:7132/api/TourAPI/ToggleTour', {
        method: 'PUT',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ tourId })
      });
  
      if (!response.ok) {
        throw new Error('Failed to toggle tour status');
      }
    } catch (error:any) {
      throw new Error('Failed to toggle tour status: ' + error.message);
    }
  };
  export default tourService;
  