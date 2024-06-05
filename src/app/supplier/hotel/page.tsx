/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useState } from "react";
import hotelService from "@/app/services/hotelService";
import Link from "next/link";
import CreateHotel from "@/app/components/Hotel/CreateHotel";
import { Button } from "react-bootstrap";
import UpdateHotel from "@/app/components/Hotel/UpdateHotel";
import DetailHotel from "@/app/components/Hotel/DetailHotel";

const HotelListOfSupplier = () => {
  const [hotelList, setHotelList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showHotelCreate, setShowHotelCreate] = useState<boolean>(false);
  const [showHotelUpdate, setShowHotelUpdate] = useState<boolean>(false);
  const [showHotelDetail, setShowHotelDetail] = useState<boolean>(false);
  const [showNoti, setShowNoti] = useState<boolean>(false);
  const [HotelId, setHotelId] = useState(0);
  const [Hotel, setHotel] = useState<IHotel | null>(null);

  useEffect(() => {
    const supplierId = localStorage.getItem("supplierId");
    if (supplierId) {
      hotelService
        .getHotelsBySuppierId(Number(supplierId))
        .then((data: any) => {
          setHotelList(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching hotel list:", error);
          setError(error);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  //reload sau khi add
  const handleCreateHotel = async () => {
    setShowHotelCreate(false);
    const supplierId = localStorage.getItem("supplierId");
    if (supplierId) {
      hotelService
        .getHotelsBySuppierId(Number(supplierId))
        .then((data: any) => {
          setHotelList(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching hotel list:", error);
          setError(error);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  };
  const handleUpdateHotel = async () => {
    setShowHotelUpdate(false);
    const supplierId = localStorage.getItem("supplierId");
    if (supplierId) {
      hotelService
        .getHotelsBySuppierId(Number(supplierId))
        .then((data: any) => {
          setHotelList(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching hotel list:", error);
          setError(error);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  };

  //Update

  //Delete
  const handleDeleteHotel = async (hotelId: number) => {
    try {
      await hotelService.deleteHotel(hotelId);
      // Load lại dữ liệu từ API
      const supplierId = localStorage.getItem("supplierId");
      if (supplierId) {
        hotelService
          .getHotelsBySuppierId(Number(supplierId))
          .then((data: any) => {
            setHotelList(data);
            setLoading(false);
          })
          .catch((error) => {
            console.error("Error fetching hotel list:", error);
            setError(error);
            setLoading(false);
          });
      } else {
        setLoading(false);
      }
      alert("Hotel deleted successfully");
    } catch (error) {
      console.error("Error deleting hotel:", error);
      alert("Failed to delete hotel");
    }
  };
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading hotels</div>;
  }
  console.log(hotelList);
  return (
    <div className="relative">
      <div className="search-add ">
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
          onClick={() => setShowHotelCreate(true)}
        >
          + Add hotel
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
                        HotelId
                      </th>
                      <th scope="col" className="px-6 py-4 text-center">
                        Name
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Avatar
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Isverify
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Manage Voucher
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Manage Room
                      </th>
                      <th scope="col" className="px-6 py-4">
                        View Detail
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {hotelList.length > 0 ? (
                      hotelList.map((item: IHotel, index) => (
                        <tr
                          key={index}
                          className="border-b border-neutral-200 dark:border-white/10"
                        >
                          <td className="whitespace-nowrap px-6 py-4 font-medium text-black">
                            {item.hotelId}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 font-semibold text-black">
                            {item.hotelName}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            <Link href="#">
                              <img src="/image/avatar.png" alt="Avatar" />
                            </Link>
                          </td>
                          <td
                            className={`whitespace-nowrap px-6 py-4 ${
                              item.isVerify ? "color-active" : "color-stop"
                            }`}
                          >
                            {item.isVerify ? "Active" : "Stopped"}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            <Link
                              href={`/supplier/hotel/voucher/${item.hotelId}`}
                            >
                              <img
                                src="/image/managevoucher.png"
                                alt="Manage Voucher"
                              />
                            </Link>
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            <Link href={`/supplier/hotel/room/${item.hotelId}`}>
                              <img
                                src="/image/managevoucher.png"
                                alt="Manage Room"
                              />
                            </Link>
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            <Link href="#">
                              <img
                                src="/image/viewdetail.png"
                                alt="View Detail"
                                onClick={() => {
                                  setHotel(item);
                                  setShowHotelDetail(true);
                                  console.log("HotelID: " + item.hotelId, item);
                                }}
                              />
                            </Link>
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 flex">
                            <Link href="#">
                              <img
                                className="w-5 h-5 cursor-pointer"
                                src="/image/pen.png"
                                alt="Edit"
                                onClick={() => {
                                  setHotelId(item.hotelId);
                                  setHotel(item);
                                  setShowHotelUpdate(true);
                                  console.log("HotelID: " + item.hotelId, item);
                                }}
                              />
                            </Link>
                            <img
                              className="w-5 h-5 cursor-pointer ml-3"
                              src="/image/lock.png"
                              alt="Delete"
                              onClick={() => handleDeleteHotel(item.hotelId)}
                            />
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan={8}
                          className="text-center py-4 text-red-600 font-bold"
                        >
                          No hotels found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <CreateHotel
        showHotelCreate={showHotelCreate}
        setShowHotelCreate={setShowHotelCreate}
        onCreate={handleCreateHotel} // Thêm callback để xử lý sau khi tạo
      />
      <UpdateHotel
        showHotelUpdate={showHotelUpdate}
        setShowHotelUpdate={setShowHotelUpdate}
        onUpdate={handleUpdateHotel} // Thêm callback để xử lý sau khi tạo
        ThishotelId={HotelId}
        hotel={Hotel}
        setHotel={setHotel}
      />
      <DetailHotel
        showHotelDetail={showHotelDetail}
        setShowHotelDetail={setShowHotelDetail}
        hotel={Hotel}
        setHotel={setHotel}
      />
    </div>
  );
};

export default HotelListOfSupplier;
