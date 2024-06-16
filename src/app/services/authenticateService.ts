interface ILoginRequest {
  email: string;
  password: string;
}

interface ILoginResponse {
  toKen: string;
  roleId: string;
  supplier: {
    supplierId: number;
    supplierName: string;
    email: string;
    phone: string;
    status: boolean;
    isVerify: boolean;
    roleId: number;
    role: {
      roleId: number;
      roleName: string;
      roleDescription: string;
    };
  };
  user: {
    userId: number;
    userName: string;
    email: string;
    phone: string;
    address: string;
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
  logOut(): Promise<void>;
  signUpClient(user: {
    email: string;
    password: string;
    roleId: number;
  }): Promise<void>;
  loginSupplier(email: string, password: string): Promise<ILoginResult>;
  signUpSupplier(supplier: {
    email: string;
    password: string;
    roleId: number;
  }): Promise<void>;
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
        const role = data.roleId;
        const user = data.user;
        const userId = data.user.userId;
        // Save token to local storage or cookies for future requests
        localStorage.setItem("token", token);
        localStorage.setItem("roleId", role);
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("userId", userId.toString());

        return { success: true, token, role, user };
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
        const role = data.roleId;
        const supplier = data.supplier;
        const supplierId = data.supplier.supplierId;

        // Save token to local storage or cookies for future requests
        localStorage.setItem("token", token);
        localStorage.setItem("roleId", role);
        localStorage.setItem("supplier", JSON.stringify(supplier));
        localStorage.setItem("supplierId", supplierId.toString());

        return { success: true, token, role, supplier };
      } else {
        const errorData = await response.json();
        return { success: false, errorMessage: errorData.errorMessage };
      }
    } catch (error) {
      console.error("Error:", error);
      return {
        success: false,
        errorMessage: "An error occurred while signing in.",
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

  async logOut() {
    try {
      // Clear the local storage
      localStorage.removeItem("token");
      localStorage.removeItem("roleId");
      localStorage.removeItem("supplier");
      localStorage.removeItem("supplierId");
      localStorage.removeItem("user");
      localStorage.removeItem("userId");
      console.log("User logged out successfully.");
    } catch (error) {
      console.error("Error logging out:", error);
      throw error;
    }
  },
};
export default authenticateService;