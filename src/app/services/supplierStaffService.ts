import { mutate } from "swr";
interface ISupplierStaffService {
  getStaffsBySuppierId(supplierId: number): Promise<ISupplierStaff[]>;
  createStaff(supplierStaff: ISupplierStaff): Promise<ISupplierStaff>;
  updateStaff(supplierStaff: ISupplierStaff): Promise<ISupplierStaff>;
  deleteStaff(staffId: number): Promise<void>;
  }
  
  const supplierStaffService: ISupplierStaffService = {
    async getStaffsBySuppierId(supplierId) {
      console.log(supplierId);
      try {
        const response = await fetch(
          `https://localhost:7132/getSupplierStaffBySupplierId/${supplierId}`,
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
          throw new Error("Failed to fetch supplier staff list");
        }
        const data = await response.json();
        console.log(data); // Trigger refetch after fetching
        return data;
      } 
      catch (error) {
        console.error("Error fetching supplier staff list:", error);
        throw error;
      }
    },
    async createStaff(supplierStaff) {
      try {
        const response = await fetch(`https://localhost:7132/createSupplierStaff`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(supplierStaff),
        });
        if (!response.ok) {
          throw new Error("Failed to create supplier staff");
        }
        return await response.json();
      } catch (error) {
        console.error("Error creating supplier staff:", error);
        throw error;
      }
    },
  
    async updateStaff(supplierStaff) {
      try {
        const response = await fetch(
          `https://localhost:7132/updateSupplierStaff`,
          {
            method: "PUT",
            headers: {
              Accept: "application/json, text/plain, */*",
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`, // Retrieve token from localStorage
            },
            body: JSON.stringify(supplierStaff),
          }
        );
        if (!response.ok) {
          throw new Error("Failed to update supplier staff");
        }
        const data = await response.json();
        return data;
      } catch (error) {
        console.error("Error updating supplier staff:", error);
        throw error;
      }
    },
    async deleteStaff(staffId) {
      try {
        const response = await fetch(
          `https://localhost:7132/deleteSupplierStaff/${staffId}`,
          {
            method: "PUT",headers: {
              Accept: "application/json, text/plain, */*",
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`, // Retrieve token from localStorage
            },
            body: JSON.stringify({ status: false }),
          }
        );
        if (!response.ok) {
          throw new Error("Failed to delete supplier staff status to false");
        }
      } catch (error) {
        console.error("Error updating supplier staff status to false:", error);
        throw error;
      }
    },
  };
  export const revalidateSupplierStaffs = () => mutate(supplierStaffService.getStaffsBySuppierId);
  export const toggleSupplierStaffStatus = async (staffId: number): Promise<void> => {
    try {
      const response = await fetch('https://localhost:7132/api/SupplierStaffAPI/ToggleSupplierStaff', {
        method: 'PUT',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ staffId })
      });
  
      if (!response.ok) {
        throw new Error('Failed to toggle supplier staff status');
      }
    } catch (error:any) {
      throw new Error('Failed to toggle supplier staff status: ' + error.message);
    }
  };
  export default supplierStaffService;