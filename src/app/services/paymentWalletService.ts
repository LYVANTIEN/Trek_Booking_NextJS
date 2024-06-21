interface IPaymentWalletService{
    getPaymentInforByUserId(userId: number): Promise<IPaymentWallet[]>;
}

const paymentWalletService: IPaymentWalletService = {
    async getPaymentInforByUserId(userId) {
      try {
        const response = await fetch(
          `https://localhost:7132/getPaymentInforByUserId/${userId}`,
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
          throw new Error("Failed to fetch booking list");
        }
        const data = await response.json();
        console.log("API RESPONSE DATA",data); // Trigger refetch after fetching
        return data;
      } 
      catch (error) {
        console.error("Error fetching booking list:", error);
        throw error;
      }
    },
  };
  export default paymentWalletService;