interface ILoginRequest {
  email: string;
  password: string;
}

interface ILoginResponse {
  toKen: string;
  roleId: string;
}

interface ILoginResult {
  success: boolean;
  token?: string;
  role?: string;
  errorMessage?: string;
}
interface IAuthenticateService {
  loginClient(email: string, password: string): Promise<ILoginResult>;
  signUpClient(user: {
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

        // Save token to local storage or cookies for future requests
        localStorage.setItem("token", token);
        localStorage.setItem("roleId", role);

        return { success: true, token, role };
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
  }
};
export default authenticateService;
