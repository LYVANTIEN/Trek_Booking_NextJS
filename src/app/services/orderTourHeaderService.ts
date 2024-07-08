import Cookies from 'js-cookie';
import BASE_URL from './apiService';

interface IOrderTourHeaderService {
  getOrderTourHeaderByUserId(): Promise<IOrderTourHeader[]>;
  getRevenueTourBySupplierId(): Promise<IOrderTourHeader[]>;
  countTotalOrderTourBySupplierId(): Promise<number>;
  getPercentChangeTourFromLastWeek():Promise<number>;
  getTotalRevenueTourBySupplierId(): Promise<number>;
  getPercentChangeRevenueTourFromLastWeek(): Promise<number>;
}

const orderTourHeaderService: IOrderTourHeaderService = {
  async getOrderTourHeaderByUserId() {
    try {
      const response = await fetch(
        `${BASE_URL}/getOrderTourHeaderByUserId`,
        {
          method: "GET",
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("tokenUser")}`, // Retrieve token from localStorage
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch order tour headers");
      }
      const data = await response.json();
      console.log(data); // Trigger refetch after fetching
      return data;
    } catch (error) {
      console.error("Error fetching order tour headers:", error);
      throw error;
    }
  },
  async getRevenueTourBySupplierId() {
    try {
      const response = await fetch(
        `https://localhost:7132/getRevenueTourBySupplierId`,
        {
          method: "GET",
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("tokenSupplier")}`, // Retrieve token from localStorage
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch order hotel headers");
      }
      const data = await response.json();
      console.log(data); // Trigger refetch after fetching
      return data;
    } catch (error) {
      console.error("Error fetching order hotel headers:", error);
      throw error;
    }
  },
  
  async countTotalOrderTourBySupplierId() {
    try {
      const response = await fetch(
        `https://localhost:7132/countTotalOrderTourBySupplierId`,
        {
          method: "GET",
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("tokenSupplier")}`, // Retrieve token from localStorage
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch order hotel headers");
      }
      const data = await response.json();
      console.log(data); // Trigger refetch after fetching
      return data;
    } catch (error) {
      console.error("Error fetching order hotel headers:", error);
      throw error;
    }
  },

  async getPercentChangeTourFromLastWeek() {
    try {
      const response = await fetch(
        `https://localhost:7132/getPercentChangeTourFromLastWeek`,
        {
          method: "GET",
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("tokenSupplier")}`, // Retrieve token from localStorage
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch order hotel headers");
      }
      const data = await response.json();
      console.log(data); // Trigger refetch after fetching
      return data;
    } catch (error) {
      console.error("Error fetching order hotel headers:", error);
      throw error;
    }
  },
  

  async getTotalRevenueTourBySupplierId() {
    try {
      const response = await fetch(
        `https://localhost:7132/getTotalRevenueTourBySupplierId`,
        {
          method: "GET",
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("tokenSupplier")}`, // Retrieve token from localStorage
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch order hotel headers");
      }
      const data = await response.json();
      console.log(data); // Trigger refetch after fetching
      return data;
    } catch (error) {
      console.error("Error fetching order hotel headers:", error);
      throw error;
    }
  },
  
  async getPercentChangeRevenueTourFromLastWeek() {
    try {
      const response = await fetch(
        `https://localhost:7132/getPercentChangeRevenueTourFromLastWeek`,
        {
          method: "GET",
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("tokenSupplier")}`, // Retrieve token from localStorage
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch order hotel headers");
      }
      const data = await response.json();
      console.log(data); // Trigger refetch after fetching
      return data;
    } catch (error) {
      console.error("Error fetching order hotel headers:", error);
      throw error;
    }
  },

};

export default orderTourHeaderService;
