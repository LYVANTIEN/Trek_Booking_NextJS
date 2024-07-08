import Cookies from 'js-cookie';
import BASE_URL from './apiService';

interface IUserService {
  getUsers(): Promise<any[]>;
  getUserById(): Promise<IUser>;
  updateUser(user: IUser): Promise<IUser>;
}

const userService: IUserService = {
  async getUsers() {
    try {
      const response = await fetch(`${BASE_URL}/getUsers`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Retrieve token from localStorage
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch user list");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching user list:", error);
      throw error;
    }
  },

  async getUserById() {
    try {
      const response = await fetch(
        `${BASE_URL}/getUserById`,
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
        throw new Error("Failed to fetch user");
      }
      const data = await response.json();
      console.log(data); // Trigger refetch after fetching
      return data;
    } catch (error) {
      console.error("Error fetching user:", error);
      throw error;
    }
  },

  async updateUser(user) {
    try {
      const response = await fetch(
        `${BASE_URL}/updateUser`,
        {
          method: "PUT",
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("tokenUser")}`,
          },
          body: JSON.stringify(user),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update user");
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
      console.error("Error updating user:", error);
      throw error;
    }
  },
};

export default userService;
