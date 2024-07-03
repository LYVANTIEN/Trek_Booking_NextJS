import Cookies from "js-cookie";

interface ISupplierService {
  getSupplierById(): Promise<ISupplier>;
  updateSupplier(supplier:ISupplier): Promise<ISupplier>;
}

const supplierService: ISupplierService = {
  async getSupplierById() {
    // console.log(supplierId);
    try {
      const response = await fetch(
        `https://localhost:7132/getSupplierbyId`,
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
        throw new Error("Failed to fetch supplier staff list");
      }
      const data = await response.json();
      console.log(data); // Trigger refetch after fetching
      return data;
    } catch (error) {
      console.error("Error fetching supplier staff list:", error);
      throw error;
    }
  },
  async updateSupplier(supplier) {
    try {
      const response = await fetch(
        `https://localhost:7132/updateSupplier`,
        {
          method: "PUT",
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
            // Authorization: `Bearer ${localStorage.getItem("token")}`, 
            Authorization: `Bearer ${Cookies.get("tokenSupplier")}`, 
          },
          body: JSON.stringify(supplier),
        }
      );
  
      if (!response.ok) {
        throw new Error("Failed to update supplier");
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
      console.error("Error update supplier:", error);
      throw error;
    }
  },

};


export default supplierService;
