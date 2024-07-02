/* eslint-disable @next/next/no-img-element */
"use client";
import Link from "next/link";
import useSWR from "swr";
import bookingService from "@/app/services/bookingService";
import { Button } from "react-bootstrap";
import { useState } from "react";
import UpdateBooking from "./update_booking";
import BookingDetail from "./booking_detail";

const BookingListOfSupplier = () => {
  const { data: bookingList, error } = useSWR("bookingList", () =>
    bookingService.getBookingsBySupplierId()
  );
  const [showModalEdit, setShowModalEdit] = useState<boolean>(false);
  const [showModalBookingDetail, setShowModalBookingDetail] = useState<boolean>(false);
  const [booking, setBooking] = useState<IBooking | null>(null);
  if (!bookingList) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading bookings</div>;
  }
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
      </div>
      <div className="table-hotel pt-8">
        <div className="flex flex-col overflow-x-auto">
          <div className="sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
              <div className="overflow-x-auto">
                <table className="min-w-full text-start text-sm font-light text-surface dark:text-white border-solid">
                  <thead className="border-b border-neutral-200 font-medium dark:border-white/10 bk-top-table">
                    <tr className="text-center">
                      <th scope="col" className="px-6 py-4">
                        BookingId
                      </th>
                      <th scope="col" className="px-6 py-4 text-center">
                        User Name
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Hotel Name
                      </th>
                      <th scope="col" className="px-6 py-4">
                        IsConfirmed
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
                    {bookingList.length > 0 ? (
                      bookingList.map((item: IBooking, index) => {
                        // Parse the tourTime to a Date object if it's a string
                        const checkInDate = new Date(item.checkInDate);
                        const checkOutDate = new Date(item.checkOutDate);
                        const formattedCheckInTime =
                          checkInDate.toLocaleDateString(undefined, {
                            year: "numeric",
                            month: "numeric",
                            day: "numeric",
                          });
                        const formattedCheckOutTime =
                          checkOutDate.toLocaleDateString(undefined, {
                            year: "numeric",
                            month: "numeric",
                            day: "numeric",
                          });
                        return (
                          <tr
                            key={index}
                            className="border-b border-neutral-200 dark:border-white/10 text-center"
                          >
                            <td className="whitespace-nowrap px-6 py-4 font-semibold">
                              {item.bookingId}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4 font-semibold">
                              {item.user?.email}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4 font-semibold">
                              {item.hotel?.hotelName}
                            </td>

                           

                            <td
                              className={`whitespace-nowrap px-6 py-4 ${
                                item.isConfirmed ? "color-active" : "color-stop"
                              }`}
                            >
                              {item.isConfirmed ? "Confirmed" : "Pending..."}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                                <div className="flex justify-center">
                                  <img className="w-5 h-5 cursor-pointer"
                                  src="/image/viewdetail.png"
                                  alt="View Detail"
                                  onClick={() => {
                                    setBooking(item);
                                    setShowModalBookingDetail(true);
                                  }}
                                />
                                </div>
                                
                            </td>
                            <td className="whitespace-nowrap px-6 py-4 flex justify-center">
                              <img
                                className="w-5 h-5 cursor-pointer"
                                src="/image/pen.png"
                                alt="Edit"
                                onClick={() => {
                                  setBooking(item);
                                  setShowModalEdit(true);
                                }}
                              />
                              
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td
                          colSpan={9}
                          className="text-center py-4 text-red-600 font-bold"
                        >
                          No bookings found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
                <UpdateBooking
                  showModalEditBooking={showModalEdit}
                  setShowModalEditBooking={setShowModalEdit}
                  booking={booking}
                  setBooking={setBooking}
                />
                <BookingDetail
                  showModalBookingDetail={showModalBookingDetail}
                  setShowModalBookingDetail={setShowModalBookingDetail}
                  booking={booking}
                  setBooking={setBooking}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingListOfSupplier;
