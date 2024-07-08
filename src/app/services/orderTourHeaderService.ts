import Cookies from "js-cookie";
import BASE_URL from "./apiService";

interface IOrderTourHeaderService {
  getOrderTourHeaderByUserId(): Promise<IOrderTourHeader[]>;
  getOrderTourHeaderBySupplierId(): Promise<IOrderTourHeader[]>;
}

const orderTourHeaderService: IOrderTourHeaderService = {
  async getOrderTourHeaderByUserId() {
    try {
      const response = await fetch(
        `https://localhost:7132/getOrderTourHeaderByUserId`,
        {
          method: "GET",
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("token")}`, // Retrieve token from localStorage
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
  async getOrderTourHeaderBySupplierId() {
    try {
      const response = await fetch(
        `https://localhost:7132/getOrderTourHeaderBySupplierId`,
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
};

export default orderTourHeaderService;
