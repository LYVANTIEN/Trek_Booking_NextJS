/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState, FormEvent } from "react";
import "../../../public/css/authen.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import authenticateService from "../services/authenticateService";
import { toast } from "react-toastify";
const signUpClient = () => {
  const [isPassword, setIsPassword] = useState(true);
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [roleId, setRoleId] = useState(4);
  const [password, setPassword] = useState("");
  const togglePasswordVisibility = () => {
    setIsPassword((prevState) => !prevState);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
        await authenticateService.signUpClient({ email, password, roleId });
        toast.success("Sign up successfully!");
        setTimeout(() => {
            router.push("/login_client");
          }, 2000);
      } catch (error) {
        toast.error("Sign up unsuccessful!");
      }
    }
    return (
        <div>
          <div className="image-bk">
            <div className="login">
              <div className="text-login">
                <h3 className="text-center font-bold color-black">Sign up</h3>
              </div>
              <form onSubmit={handleSubmit}>
              <div className="text-input relative">
                <p className="color-black m-0 pt-2 pb-1">
                  Enter your email
                </p>
                <input
                  className='input-text'
                  type="email"
                  placeholder='Email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
    
                <p className="m-0 pt-4 pb-1">Enter your password</p>
                <input
                  className='input-text'
                  type={isPassword ? "password" : "text"}
                  placeholder='Password'
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
    
                <p className="m-0 pt-4 pb-1">Enter your confirm password</p>
                <input
                  className='input-text'
                  type={isPassword ? "password" : "text"}
                  placeholder='Password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <img
                  src="/image/hide.png"
                  className="input-hide cursor-pointer"
                  onClick={togglePasswordVisibility}
                  alt=""
                />
                <div className="continue text-center mt-4">
                  <button
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
                    href="login_client"
                  >
                    You have a account?
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
                <p className="mb-0 pd-or fz-14">or sign up with</p>
                <img className="h-1 w-1/3" src="/image/login-gach.png" alt="" />
              </div>
              <div className="difflogin flex justify-center pb-9">
                <div className="facebook flex items-center cursor-pointer mr-3">
                  <img className="w-3 h-3 mr-3" src="/image/facebook.png" alt="" />
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
      );
  };
export default signUpClient;
