/* eslint-disable @next/next/no-img-element */
"use client";
import UpdateProfileSupplier from "@/app/components/Supplier/UpdateProfileSupplier";
import supplierService from "@/app/services/supplierService";
import { useEffect, useState } from "react";
import useSWR from "swr";

const Profile = () => {
  const [supplierName, setSupplierName] = useState<string>("");
  const [avatar, setAvatar] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [address, setAddress] = useState<string>("");

  const [showSupplierUpdate, setShowSupplierUpdate] = useState<boolean>(false);
  const [Supplier, setSupplier] = useState<ISupplier | null>(null);

  const { data: supplier, error } = useSWR("profile", () =>
    supplierService.getSupplierById()
  );

  useEffect(() => {
    if (supplier) {
      setSupplierName(supplier.supplierName);
      setAvatar(supplier.avatar);
      setEmail(supplier.email);
      setPhone(supplier.phone);
      setAddress(supplier.address);
      setSupplier(supplier);
    } else if (error) {
      console.error("Failed to fetch supplier:", error);
    }
  }, [supplier, error]);

  if (!supplier) {
    return <div>Supplier ID not found</div>;
  }

  return (
    <>
      <div className="container mt-10">
        <p className="text-center font-bold text-4xl">Manage Profile</p>
        <div
          className="flex w-3/4 m-auto pt-10"
          style={{ borderBottom: "2px solid #D2D2D2" }}
        >
          <div className="flex items-start pr-10">
            <img src="/image/user.png" alt="User" />
            <a
              href="#"
              className="text-hv font-semibold no-underline text-xl pl-2"
              style={{ color: "#305A61" }}
            >
              Account information
            </a>
          </div>
          <div className="flex items-start">
            <img src="/image/lock.png" alt="Lock" />
            <a
              href="#"
              className="text-hv no-underline font-semibold text-black text-xl pl-2"
            >
              Change password
            </a>
          </div>
        </div>

        <div className="my-10">
          <div
            className="w-3/4 border m-auto pt-9"
            style={{
              borderRadius: "20px",
              boxShadow: "1px 1px 8px 4px rgba(0, 0, 0, 0.25)",
            }}
          >
            <div className="w-4/5 m-auto">
              <span className="text-xl font-semibold">Account information</span>
              <div style={{ borderBottom: "1px solid #D2D2D2" }}></div>
              <div style={{ marginTop: "20px", marginBottom: "20px" }}>
                <div className="flex justify-center flex-wrap">
                  <img
                    className="w-[150px] h-[150px] cursor-pointer m-2 rounded-full object-cover"
                    src={avatar ? avatar : "/image/usersupplier.png"}
                    alt="Avatar"
onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.onerror = null;
                      target.src = "/image/usersupplier.png";
                    }}
                  />
                </div>
              </div>
              <div style={{ borderBottom: "1px solid #D2D2D2" }}></div>

              <div
                className="mb-3 col-6"
                style={{
                  display: "flex",
                  marginTop: "20px",
                }}
              >
                <div className="col-md-5">
                  <label className="font-bold text-xl">Supplier Name</label>
                </div>
                <div className="flex-1">
                  <label className="font-bold text-xl text-gray-400">
                    {supplierName}
                  </label>
                </div>
              </div>
              <div style={{ borderBottom: "1px solid #D2D2D2" }}></div>

              <div
                className="mb-3 col-6"
                style={{ display: "flex", marginTop: "20px" }}
              >
                <div className="col-md-5">
                  <label className="font-bold text-xl">Phone</label>
                </div>
                <div className="flex-1">
                  <label className="font-bold text-xl text-gray-400">
                    {phone}
                  </label>
                </div>
              </div>
              <div style={{ borderBottom: "1px solid #D2D2D2" }}></div>

              <div
                className="mb-3 col-6"
                style={{ display: "flex", marginTop: "20px" }}
              >
                <div className="col-md-5">
                  <label className="font-bold text-xl">Email</label>
                </div>
                <div className="flex-1">
                  <label className="font-bold text-xl text-gray-400">
                    {email}
                  </label>
                </div>
              </div>
              <div style={{ borderBottom: "1px solid #D2D2D2" }}></div>

              <div
                className="mb-3 col-6"
                style={{ display: "flex", marginTop: "20px" }}
              >
                <div className="col-md-5">
                  <label className="font-bold text-xl">Address</label>
                </div>
                <div className="flex-1">
                  <label className="font-bold text-xl text-gray-400">
                    {address}
                  </label>
                </div>
              </div>
              <div style={{ borderBottom: "1px solid #D2D2D2" }}></div>

              <div
                className="flex justify-end pt-5 pb-4"
                style={{ marginTop: "-20px" }}
              >
                <button
                  className="text-white font-medium py-2 px-6 text-lg border"
                  style={{ backgroundColor: "#305A61", borderRadius: "20px" }}
                  onClick={() => {
setShowSupplierUpdate(true);
                  }}
                >
                  Update
                </button>
              </div>
            </div>
            <UpdateProfileSupplier
              showSupplierUpdate={showSupplierUpdate}
              setShowSupplierUpdate={setShowSupplierUpdate}
              supplier={Supplier}
              supplierId={Number(supplier.supplierId)}
              setSupplier={setSupplier}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;