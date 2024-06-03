"use client";
import React from "react";
import Link from "../../../node_modules/next/link";
import { usePathname, useRouter } from "next/navigation";
import authenticateService from "../services/authenticateService";
import { toast } from "react-toastify";
const NavSupplier = () => {
  const router = useRouter();
  const pathname = usePathname();
  const handleLogout = async () => {
    try {
      await authenticateService.logOut();
      toast.success("Logout Successful!..");
      setTimeout(() => {
        router.push("/login_supplier");
      }, 1000);
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };
  return (
    <div>
      <header className="nav-supllier">
        <div className="logo">
          <p className="text-white text-center font-bold text-2xl pt-4">
            Trek Booking
          </p>
        </div>
        <div className="list-choose pt-10 px-4 pb-6">
          <ul className="pl-0">
            <div className="py-2">
              <li className="flex items-center pb-10 pl-3">
                <img className="w-7 h-7 " src="/image/darhboard.png" alt="" />
                <span className="text-white ml-2 text-xl font-semibold">
                  Dashboard
                </span>
              </li>
            </div>

            <div className="menu-container">
              <li className="flex items-center pb-10 hotel-room">
                <Link
                  className={`flex no-underline  nav-i-hover py-2 pl-3 pr-40 ${
                    pathname === "/supplier/hotel" ? "active-link" : ""
                  } `}
                  href="/supplier/hotel"
                >
                  <img className="w-7 h-7 " src="/image/home.png" alt="" />
                  <span className="text-white ml-2 text-xl font-semibold">
                    Hotel
                  </span>
                </Link>
              </li>
            </div>
            <li className="flex items-center pb-10">
  <Link
    className={`flex no-underline nav-i-hover py-2 pl-3 pr-40 ${
      pathname.startsWith("/supplier/tour") ? "active-link" : ""
    }`}
    href="/supplier/tour"
  >
    <img className="w-7 h-7" src="/image/suitcase.png" alt="" />
    <span className="text-white ml-2 text-xl font-semibold">Tour</span>
  </Link>
</li>
            <li className="flex items-center pb-10 ">
              <Link
                className={`flex no-underline  nav-i-hover py-2 pl-3 pr-40 ${
                  pathname === "/supplier/staff" ? "active-link" : ""
                } `}
                href="/supplier/staff"
              >
                <img className="w-7 h-7 " src="/image/staff.png" alt="" />
                <span className="text-white ml-2 text-xl font-semibold">
                  Staff
                </span>
              </Link>
            </li>

            
            <li className="flex items-center pb-10 ">
              <Link
                className={`flex no-underline  nav-i-hover py-2 pl-3 pr-40 ${
                  pathname === "/supplier/roombooking" ? "active-link" : ""
                } `}
                href="/supplier/roombooking"
              >
                <img className="w-7 h-7 " src="/image/chart.png" alt="" />
                <span className="text-white ml-2 text-xl font-semibold">
                  Room booking
                </span>
              </Link>
            </li>

            <li className="flex items-center pb-10 ">
              <Link
                className={`flex no-underline  nav-i-hover py-2 pl-3 pr-40 ${
                  pathname === "/supplier/tourbooking" ? "active-link" : ""
                } `}
                href="/supplier/tourbooking"
              >
                <img className="w-7 h-7 " src="/image/dock.png" alt="" />
                <span className="text-white ml-2 text-xl font-semibold">
                  Tour booking
                </span>
              </Link>
            </li>
          </ul>
        </div>
        <div className="border-solid border-t-2 border-white pt-3">
          <button
            onClick={handleLogout}
            className="bottom-logout flex justify-center items-center no-underline text-white bg-transparent border-none cursor-pointer"
          >
            <img className="w-7 h-7" src="/image/out.png" alt="" />
            <p className="color-white mb-0 ml-1 font-semibold text-xl">
              Log out
            </p>
          </button>
        </div>
      </header>
    </div>
  );
};

export default NavSupplier;
