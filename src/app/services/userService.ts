interface IUserService{
    getUsers(): Promise<any[]>;
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
  }
  export default userService;