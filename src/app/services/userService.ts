import Cookies from 'js-cookie';

interface IUserService{
    getUsers(): Promise<any[]>;
    getUserById(): Promise<IUser>;
    updateUser(user: IUser): Promise<IUser>;
}

const userService: IUserService = {
    async getUsers() {
      try {
        const response = await fetch("https://localhost:7132/getUsers", {
          headers: {
            "Content-Type": "application/json",
            // Include the token in the headers
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Retrieve token from localStorage
          },
        });
        if (!response.ok) { 
          throw new Error("Failed to fetch user list");
        }
        const data = await response.json();
        // console.log(data); // Trigger refetch after fetching
        return data;
      } catch (error) {
        console.error("Error fetching user list:", error);
        throw error;
      }
    },


    async getUserById() {
      //console.log(userId);
      try {
        const response = await fetch(
          `https://localhost:7132/getUserById`,
          {
            method: "GET",
            headers: {
              Accept: "application/json, text/plain, */*",
              "Content-Type": "application/json",
              // Include the token in the headers
              Authorization: `Bearer ${Cookies.get("token")}`, // Retrieve token from localStorage
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch user");
        }
        const data = await response.json();
        console.log(data); // Trigger refetch after fetching
        return data;
      } 
      catch (error) {
        console.error("Error fetching user:", error);
        throw error;
      }
    },

    async updateUser(user) {
      try {
        const response = await fetch(
          `https://localhost:7132/updateUser`,
          {
            method: "PUT",
            headers: {
              Accept: "application/json, text/plain, */*",
              "Content-Type": "application/json",
              // Authorization: `Bearer ${localStorage.getItem("token")}`, 
              Authorization: `Bearer ${Cookies.get("token")}`, 
            },
            body: JSON.stringify(user),
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
        console.error("Error update user:", error);
        throw error;
      }
    },
  }
  export default userService;