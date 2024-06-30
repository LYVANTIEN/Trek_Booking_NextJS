import Cookies from 'js-cookie';
interface IPaymentWalletService{
    getPaymentInforByUserId(): Promise<IPaymentWallet[]>;
}

const paymentWalletService: IPaymentWalletService = {
    async getPaymentInforByUserId() {
      try {
        const response = await fetch(
          `https://localhost:7132/getPaymentInforByUserId`,
          {
            method: "GET",
            headers: {
              Accept: "application/json, text/plain, */*",
              "Content-Type": "application/json",
              // Include the token in the headers
              Authorization: `Bearer ${Cookies.get("tokenUser")}`, // Retrieve token from localStorage

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