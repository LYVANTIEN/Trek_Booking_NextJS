import Cookies from "js-cookie";
interface ILoginRequest {
  email: string;
  password: string;
  staffEmail: string;
  staffPassword: string;
}

interface ILoginResponse {
  toKen: string;
  tokenSupplier: string;
  roleName: string;
  userName: string;
  supplierName: string;
  staffName: string;
  supplier: {
    supplierId: number;
    supplierName: string;
    email: string;
    phone: string;
  };
}

interface ILoginResult {
  success: boolean;
  token?: string;
  role?: string;
  errorMessage?: string;
  supplier?: {
    supplierId: number;
    supplierName: string;
    email: string;
    phone: string;
    roleId: number;
    role: {
      roleId: number;
      roleName: string;
      roleDescription: string;
    };
  };
  user?: {
    userId: number;
    userName: string;
    email: string;
    phone: string;
    address: string;
  };
}
interface IAuthenticateService {
  loginClient(email: string, password: string): Promise<ILoginResult>;
  logOutClient(): Promise<void>;
  logOutSupplier(): Promise<void>;
  logOutStaff(): Promise<void>;
  signUpClient(user: {
    email: string;
    userName: string;
    password: string;
    roleId: number;
  }): Promise<void>;
  loginSupplier(email: string, password: string): Promise<ILoginResult>;
  signUpSupplier(supplier: {
    email: string;
    supplierName: string;
    password: string;
    roleId: number;
  }): Promise<void>;
  loginSupplierStaff(
    staffEmail: string,
    staffPassword: string
  ): Promise<ILoginResult>;
  // Other methods if needed
}

const authenticateService: IAuthenticateService = {
  async loginClient(email: string, password: string): Promise<ILoginResult> {
    try {
      const response = await fetch("https://localhost:7132/loginClient", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password } as ILoginRequest),
      });

      if (response.ok) {
        const data: ILoginResponse = await response.json();
        const token = data.toKen;
        const userName = data.userName;
        const roleName = data.roleName;
        // Save token to local storage or cookies for future requests
        localStorage.setItem("token", token);
        localStorage.setItem("userName", userName);
        Cookies.set("tokenUser", token, { expires: 1 });
        Cookies.set("userName", userName, { expires: 1 });
        Cookies.set("roleName", roleName, { expires: 1 });
        return { success: true, token };
      } else {
        const errorData = await response.json();
        return { success: false, errorMessage: errorData.errorMessage };
      }
    } catch (error) {
      console.error("Error:", error);
      return {
        success: false,
        errorMessage: "The email or password is wrong!",
      };
    }
  },
  async signUpClient(user) {
    try {
      const response = await fetch("https://localhost:7132/registerClient", {
        method: "POST",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (!response.ok) {
        throw new Error("Sign Up unsuccessful!");
      }
    } catch (error) {
      console.error("Error sign up user:", error);
      throw error;
    }
  },

  async loginSupplier(email: string, password: string): Promise<ILoginResult> {
    try {
      const response = await fetch("https://localhost:7132/loginSupplier", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password } as ILoginRequest),
      });

      if (response.ok) {
        const data: ILoginResponse = await response.json();
        const token = data.toKen;
        const supplierName = data.supplierName;
        const roleName = data.roleName;
        // Save token to local storage or cookies for future requests
        // localStorage.setItem("supplierId", supplierId.toString());
        Cookies.set("tokenSupplier", token, { expires: 1 });
        Cookies.set("supplierName", supplierName, { expires: 1 });
        Cookies.set("roleName", roleName, { expires: 1 });
        return { success: true, token };
      } else {
        const errorData = await response.json();
        return { success: false, errorMessage: errorData.errorMessage };
      }
    } catch (error) {
      console.error("Error:", error);
      return {
        success: false,
        errorMessage: "The email or password is wrong!",
      };
    }
  },
  async signUpSupplier(supplier) {
    try {
      const response = await fetch("https://localhost:7132/registerSupplier", {
        method: "POST",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(supplier),
      });

      if (!response.ok) {
        throw new Error("Sign Up unsuccessful!");
      }
    } catch (error) {
      console.error("Error sign up user:", error);
      throw error;
    }
  },
  async loginSupplierStaff(
    staffEmail: string,
    staffPassword: string
  ): Promise<ILoginResult> {
    try {
      const response = await fetch(
        "https://localhost:7132/loginSupplierStaff",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ staffEmail, staffPassword } as ILoginRequest),
        }
      );

      if (response.ok) {
        const data: ILoginResponse = await response.json();
        const token = data.toKen;
        const tokenSupplier = data.tokenSupplier;
        const staffName = data.staffName;
        const roleName = data.roleName;
        // Save token to local storage or cookies for future requests
        Cookies.set("tokenSupplierStaff", token, { expires: 1 });
        Cookies.set("tokenSupplier", tokenSupplier, { expires: 1 });
        Cookies.set("staffName", staffName, { expires: 1 });
        Cookies.set("roleName", roleName, { expires: 1 });
        return { success: true, token };
      } else {
        const errorData = await response.json();
        return { success: false, errorMessage: errorData.errorMessage };
      }
    } catch (error) {
      console.error("Error:", error);
      return {
        success: false,
        errorMessage: "The email or password is wrong!",
      };
    }
  },
  async logOutClient() {
    try {
      // Clear the local storage
      Cookies.remove("tokenUser");
      Cookies.remove("roleName");
      Cookies.remove("userName");
      console.log("User logged out successfully.");
    } catch (error) {
      console.error("Error logging out:", error);
      throw error;
    }
  },
  async logOutSupplier() {
    try {
      // Clear the local storage
      // localStorage.removeItem("supplierId");
      Cookies.remove("tokenSupplier");
      Cookies.remove("roleName");
      Cookies.remove("supplierName");
      console.log("User logged out successfully.");
    } catch (error) {
      console.error("Error logging out:", error);
      throw error;
    }
  },
  async logOutStaff() {
    try {
      // Clear the local storage
      Cookies.remove("tokenSupplierStaff");
      Cookies.remove("tokenSupplier");
      Cookies.remove("roleName");
      Cookies.remove("staffName");
      console.log("User logged out successfully.");
    } catch (error) {
      console.error("Error logging out:", error);
      throw error;
    }
  },
};
export default authenticateService;