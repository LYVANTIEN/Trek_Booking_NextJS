/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @next/next/no-img-element */
"use client";
import { useState, FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import authenticateService from "../services/authenticateService"; // Adjust the path as needed
import "../../../public/css/authen.css"; // Adjust the path as needed
import { useSearchParams } from "next/navigation";

export default function LoginClient() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const searchParams = useSearchParams(); 
  const [password, setPassword] = useState("");
  const [isPassword, setIsPassword] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const togglePasswordVisibility = () => {
    setIsPassword((prevState) => !prevState);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const result = await authenticateService.loginClient(email, password);

    if (result.success) {
      toast.success("Login Successful!..");
      const redirectUrl = searchParams.get("redirect") || "/trekbooking";
      setTimeout(() => {
        router.push(decodeURIComponent(redirectUrl)); // Chuyển hướng đến URL đã lưu trữ hoặc trang chủ nếu không có URL
      }, 2000);
    } else {
      setErrorMessage(result.errorMessage || "An unknown error occurred.");
    }
  };

  return (
    <>
      <div>
        <div className="image-bk">
          <div className="login">
            <div className="text-login">
              
              <h3 className="text-center font-bold color-black">Log In</h3>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="text-input relative">
                <p className="color-black m-0 pt-2 pb-1">
                  Enter your email
                </p>
                <input
                  className="input-text"
                  type="text"
                  placeholder="Email/ Phone number"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />

                <p className="m-0 pt-4 pb-1">Enter your password</p>
                <input
                  className="input-text"
                  type={isPassword ? "password" : "text"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <img
                  src="/image/hide.png"
                  className="inout-hide cursor-pointer"
                  onClick={togglePasswordVisibility}
                  alt=""
                />
                {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
                <div className="continue text-center mt-4">
                  <button
                    type="submit"
                    className="text-xl button-text"
                    style={{ color: "#CED1D2" }}
                  >
                    Continue
                  </button>
                </div>
                <div className="nav-sign flex justify-between">
                  <Link
                    className="pt-2 text-right text-base cursor-pointer text-decoration"
                    style={{ color: "#CED1D2" }}
                    href="signup_client"
                  >
                    You dont have a account?
                  </Link>
                  <p
                    className="pt-2 text-right text-base cursor-pointer"
                    style={{ color: "#CED1D2" }}
                  >
                    Forget your password
                  </p>
                </div>
              </div>
            </form>
            <div className="policy">
              <div className="input flex">
                <input className="input-check" type="checkbox" />
                <p className="text-center mb-0">
                  I have read and accept the Terms of Service & Privacy Policy
                </p>
              </div>
            </div>
            <div className="login-with flex justify-center items-center mt-2 pb-2">
              <img className="h-1 w-1/3" src="/image/login-gach.png" alt="" />
              <p className="mb-0 pd-or">or log in with</p>
              <img className="h-1 w-1/3" src="/image/login-gach.png" alt="" />
            </div>
            <div className="difflogin flex justify-center pb-9">
              <div className="facebook flex items-center cursor-pointer mr-3">
                <img
                  className="w-3 h-3 mr-3"
                  src="/image/facebook.png"
                  alt=""
                />
                <p className="mb-0">Facebook</p>
              </div>
              <div className="google flex items-center cursor-pointer ml-3">
                <img className="w-3 h-3 mr-3" src="/image/google.png" alt="" />
                <p className="mb-0 ">Google</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
