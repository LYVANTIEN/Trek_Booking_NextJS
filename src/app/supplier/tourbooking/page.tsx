/* eslint-disable @next/next/no-img-element */
"use client";
import useSWR from "swr";
import { useState } from "react";
import tourOrderService from "@/app/services/tourOrderService";
import UpdateTourOrder from "./update_tour_order";
import TourOrderDetail from "./tour_order_detail";

const TourOrderListOfSupplier = () => {
  const supplierId = localStorage.getItem("supplierId");
  const { data: tourOrderList, error } = useSWR("tourOrderList", () =>
    tourOrderService.getTourOrderBySupplierId(Number(supplierId))
  );
  const [showModalEdit, setShowModalEdit] = useState<boolean>(false);
  const [showModalTourOrderDetail, setShowModalTourOrderDetail] = useState<boolean>(false);
  const [tourOrder, setTourOrder] = useState<ITourOrder | null>(null);
  if (!tourOrderList) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading tour orders</div>;
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
                        TourOrderId
                      </th>
                      <th scope="col" className="px-6 py-4 text-center">
                        User Name
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Tour Name
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
                    {tourOrderList.length > 0 ? (
                      tourOrderList.map((item: ITourOrder, index) => {
                        // Parse the tourTime to a Date object if it's a string
                        // const checkInDate = new Date(item.checkInDate);
                        // const checkOutDate = new Date(item.checkOutDate);
                        // const formattedCheckInTime =
                        //   checkInDate.toLocaleDateString(undefined, {
                        //     year: "numeric",
                        //     month: "numeric",
                        //     day: "numeric",
                        //   });
                        // const formattedCheckOutTime =
                        //   checkOutDate.toLocaleDateString(undefined, {
                        //     year: "numeric",
                        //     month: "numeric",
                        //     day: "numeric",
                        //   });
                        return (
                          <tr
                            key={index}
                            className="border-b border-neutral-200 dark:border-white/10 text-center"
                          >
                            <td className="whitespace-nowrap px-6 py-4 font-semibold">
                              {item.tourOrderId}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4 font-semibold">
                              {item.user?.email}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4 font-semibold">
                              {item.tour?.tourName}
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
                                    setTourOrder(item);
                                    setShowModalTourOrderDetail(true);
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
                                  setTourOrder(item);
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
                          No tour orders found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
                <UpdateTourOrder
                  showModalEditTourOrder={showModalEdit}
                  setShowModalEditTourOrder={setShowModalEdit}
                  tourOrder={tourOrder}
                  setTourOrder={setTourOrder}
                />
                <TourOrderDetail
                  showModalTourOrderDetail={showModalTourOrderDetail}
                  setShowModalTourOrderDetail={setShowModalTourOrderDetail}
                  tourOrder={tourOrder}
                  setTourOrder={setTourOrder}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourOrderListOfSupplier;
