/* eslint-disable @next/next/no-img-element */
// pages/voucher/[hotelId].tsx
"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import useSWR, { mutate } from "swr";
import hotelService from "@/app/services/hotelService";
import voucherService from "@/app/services/voucherService";
import CreateVoucher from "@/app/components/Voucher/CreateVoucher";
import UpdateVoucher from "@/app/components/Voucher/UpdateVoucher";

const ListVoucher = ({ params }: { params: { hotelId: string } }) => {
  const [showVoucherCreate, setShowVoucherCreate] = useState<boolean>(false);
  const [showVoucherUpdate, setShowVoucherUpdate] = useState<boolean>(false);
  const [VoucherId, setVoucherId] = useState(0);

  const [Voucher, setVoucher] = useState<IVoucher | null>(null);
  const [hotel, setHotel] = useState<IHotel | null>(null);

  const { data: listVoucher, error } = useSWR("listVoucher", () =>
    voucherService.getVouchersByHotelId(Number(params.hotelId))
  );

  useEffect(() => {
    const fetchHotel = async () => {
      try {
        const hotelData = await hotelService.getHotelById(
          Number(params.hotelId)
        );
        setHotel(hotelData);
      } catch (error) {
        console.error("Error fetching hotel details:", error);
      }
    };

    fetchHotel();
  }, [params.hotelId]);

  const checkAndUpdateVoucherStatus = async () => {
    const currentDate = new Date();

    if (listVoucher) {
      for (let voucher of listVoucher) {
        const expireDateObj = new Date(voucher.expireDate);

        if (expireDateObj < currentDate && voucher.voucherStatus) {
          voucher.voucherStatus = false;
          await voucherService.updateVoucher(voucher);
          mutate("listVoucher");
        }
      }
    }
  };

  useEffect(() => {
    if (listVoucher && listVoucher.length > 0) {
      checkAndUpdateVoucherStatus();
    }
  }, [listVoucher]);

  if (!listVoucher) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading vouchers</div>;
  }

  return (
    <div className="relative">
      <div className="search-add">
        {hotel && (
          <div className="breadcrumb">
            <a
              href="/supplier/hotel"
              style={{ color: "black", fontSize: "18px" }}
            >
              Hotel
            </a>

            <span
              style={{
                color: "black",
                fontSize: "18px",
                marginLeft: "5px",
                marginRight: "5px",
              }}
            >
              {" > "}
            </span>

            <span style={{ color: "blue", fontSize: "18px" }}>
              {hotel.hotelName}
            </span>
          </div>
        )}
        <div className="search-hotel flex">
          <input
            type="text"
            placeholder="Search........."
            className="input-hotel pl-3"
          />
          <img src="/image/search.png" alt="" />
        </div>
        <button
          className="ml-8 button-add ml-4rem"
          onClick={() => setShowVoucherCreate(true)}
        >
          + Add voucher
        </button>
      </div>

      <div className="table-hotel pt-8">
        <div className="flex flex-col overflow-x-auto">
          <div className="sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
              <div className="overflow-x-auto">
                <table className="min-w-full text-start text-sm font-light text-surface dark:text-white border-solid">
                  <thead className="border-b border-neutral-200 font-medium dark:border-white/10 bk-top-table">
                    <tr>
                      <th scope="col" className="px-6 py-4">
                        VoucherId
                      </th>
                      <th scope="col" className="px-6 py-4 text-center">
                        Voucher Code
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Available Date
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Expire Date
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Voucher Quantity
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Discount Percent
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Voucher Status
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {listVoucher.length > 0 ? (
                      listVoucher.map((item: IVoucher, index) => {
                        const availableDate = new Date(item.availableDate);
                        const formattedAvailableDate =
                          availableDate.toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          });

                        const expireDate = new Date(item.expireDate);
                        const formattedExpireDate =
                          expireDate.toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          });

                        return (
                          <tr
                            key={index}
                            className="border-b border-neutral-200 dark:border-white/10"
                          >
                            <td className="whitespace-nowrap px-6 py-4 font-medium text-black">
                              {item.voucherId}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4 font-semibold text-black">
                              {item.voucherCode}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4 font-semibold text-black">
                              {formattedAvailableDate}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4 font-semibold text-black">
                              {formattedExpireDate}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4 font-semibold text-black">
                              {item.voucherQuantity}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4 font-semibold text-black">
                              {item.discountPercent}
                            </td>
                            <td
                              className={`whitespace-nowrap px-6 py-4 ${
                                item.voucherStatus
                                  ? "color-active"
                                  : "color-stop"
                              }`}
                            >
                              {item.voucherStatus ? "Active" : "Stopped"}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4 flex">
                              <Link href="#">
                                <img
                                  className="w-5 h-5 cursor-pointer"
                                  src="/image/pen.png"
                                  alt="Edit"
                                  onClick={() => {
                                    setVoucherId(item.voucherId);
                                    setVoucher(item);
                                    setShowVoucherUpdate(true);
                                  }}
                                />
                              </Link>
                              <img
                                className="w-5 h-5 cursor-pointer ml-3"
                                src="/image/lock.png"
                                alt="Delete"
                                onClick={() =>
                                  console.log(
                                    `Delete voucher ${item.voucherId}`
                                  )
                                }
                              />
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td
                          colSpan={8}
                          className="text-center py-4 text-red-600 font-bold"
                        >
                          No vouchers found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>

                <CreateVoucher
                  showVoucherCreate={showVoucherCreate}
                  setShowVoucherCreate={setShowVoucherCreate}
                  hotelId={params.hotelId}
                />

                <UpdateVoucher
                  showVoucherUpdate={showVoucherUpdate}
                  setShowVoucherUpdate={setShowVoucherUpdate}
                  hotelId={params.hotelId}
                  voucher={Voucher}
                  setVoucher={setVoucher}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListVoucher;
