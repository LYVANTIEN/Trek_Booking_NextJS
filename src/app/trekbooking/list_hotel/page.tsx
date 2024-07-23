/* eslint-disable @next/next/no-img-element */
"use client";
import hotelService from "@/app/services/hotelService";
import roomService from "@/app/services/roomService";
import commentService from "@/app/services/commentService";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useMemo, useCallback } from "react";
import { Oval } from "react-loader-spinner"; // Import spinner
import rateService from "@/app/services/rateService";

const ListHotels = () => {
  const [hotelList, setHotelList] = useState<IHotel[]>([]);
  const [roomList, setRoomList] = useState<IRoom[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [commentsCount, setCommentsCount] = useState<{ [key: number]: number }>(
    {}
  );
  const [averageRatings, setAverageRatings] = useState<{
    [key: number]: number;
  }>({});
  
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    const fetchRates = async () => {
      const averages: { [key: number]: number } = {};
      for (const hotel of hotelList) {
        try {
          const rates = await rateService.getRatesByHotelId(hotel.hotelId);
          const averageRate =
            rates.reduce((sum, rate) => sum + rate.rateValue, 0) / rates.length;
          averages[hotel.hotelId] = Math.round(averageRate); // Round to the nearest whole number
        } catch (error) {
          console.error(
            `Error fetching rates for hotel ${hotel.hotelId}:`,
            error
          );
          averages[hotel.hotelId] = 0;
        }
      }
      setAverageRatings(averages);
    };
    if (hotelList.length > 0) {
      fetchRates();
    }
  }, [hotelList]);

  useEffect(() => {
    const fetchHotelsAndRooms = async () => {
      setLoading(true);
      try {
        const [hotels, rooms] = await Promise.all([
          hotelService.getHotels(),
          roomService.getRooms(),
        ]);
        setHotelList(hotels);
        setRoomList(rooms);
        setLoading(false);
      } catch (error) {
        if (error instanceof Error) {
          console.error("Error fetching hotel or room list:", error);
          setError(error);
        } else {
          console.error("Unexpected error:", error);
          setError(new Error("An unexpected error occurred"));
        }
        setLoading(false);
      }
    };

    fetchHotelsAndRooms();
  }, []);

  const fetchCommentsCount = useCallback(async () => {
    const counts: { [key: number]: number } = {};
    for (const hotel of hotelList) {
      try {
        const comments = await commentService.getCommentsByHotelId(
          hotel.hotelId
        );
        counts[hotel.hotelId] = comments.length;
      } catch (error) {
        console.error(
          `Error fetching comments for hotel ${hotel.hotelId}:`,
          error
        );
        counts[hotel.hotelId] = 0;
      }
    }
    setCommentsCount(counts);
  }, [hotelList]);

  useEffect(() => {
    if (hotelList.length > 0) {
      fetchCommentsCount();
    }
  }, [hotelList, fetchCommentsCount]);

  const getLowestPrice = useCallback(
    (hotelId: number) => {
      const rooms = roomList.filter((room) => room.hotelId === hotelId);
      if (rooms.length > 0) {
        return Math.min(...rooms.map((room) => room.roomPrice));
      }
      return null;
    },
    [roomList]
  );

  const totalPages = Math.ceil(hotelList.length / itemsPerPage);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const currentHotels = hotelList.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Oval
          height={80}
          width={80}
          color="#305A61"
          visible={true}
          ariaLabel="oval-loading"
          secondaryColor="#4f9a94"
          strokeWidth={2}
          strokeWidthSecondary={2}
        />
      </div>
    );
  }
  if (error) return <p>Error loading data.</p>;

  return (
    <>
      <div className="container mb-20">
        <div className="text-center pt-3">
          <p className="font-bold text-4xl">The Best Place For Vacation </p>
        </div>
        <div
          className="border mb-10 pt-6"
          style={{ borderRadius: "20px", boxShadow: "0 6px 6px #0000004d" }}
        >
          <div className="row mx-3">
            {/* Các thành phố */}
            {/* ... */}
          </div>
        </div>

        <div className="mt-16">
          <div className="row">
            {currentHotels.length > 0 ? (
              currentHotels
                .filter((item: IHotel) => item.isVerify === true)
                .map((item: IHotel) => (
                  <div key={item.hotelId} className="col-md-4 col-lg-3 mb-2">
                    <div
                      className="border grid justify-items-center pb-3 card1 "
                      style={{
                        borderRadius: "20px",
                        boxShadow: "0 4px 4px rgba(0, 0, 0, 0.25)",
                        height: "460px",
                      }}
                    >
                      <img
                        src={item.hotelAvatar}
                        alt="hotel"
                        className="p-3 w-100 h-64"
                        style={{ border: "1px", borderRadius: "36px" }}
                      />
                      <span className="text-lg font-semibold text-center">
                        {item.hotelName}
                      </span>
                      <div className="flex justify-between items-center text-sm font-medium">
                        <div className="flex mr-2">
                          {averageRatings[item.hotelId] > 0 ? (
                            [...Array(averageRatings[item.hotelId])].map(
                              (_, index) => (
                                <img
                                  key={index}
                                  className="inline w-3 h-3 ml-1"
                                  src="/image/star.png"
                                  alt=""
                                />
                              )
                            )
                          ) : (
                            <span className="">No rating</span>
                          )}
                        </div>
                        <span className="" style={{ color: "#2cc92c" }}>
                          {commentsCount[item.hotelId] || 0} reviews
                        </span>
                      </div>
                      <p className="text-base font-semibold">
                        From ${getLowestPrice(item.hotelId) || "N/A"}
                      </p>
                      <Link
                        href={`/trekbooking/list_hotel/${item.hotelId}`}
                        className="text-white font-medium flex items-center  px-6 text-lg no-underline"
                        style={{
                          backgroundColor: "#305A61",
                          borderRadius: "20px",
                        }}
                      >
                        View Hotel
                      </Link>
                    </div>
                  </div>
                ))
            ) : (
              <div className="col-12">
                <p className="text-center py-4 text-red-600 font-bold">
                  No hotels found
                </p>
              </div>
            )}
          </div>
          <div className="pagination mt-4 flex justify-between items-center font-semibold">
            <div>
              <span className="ml-8">{currentPage} of {totalPages}</span>
            </div>
            <div className="flex items-center mr-8">
              <img className="w-3 h-3 cursor-pointer" src="/image/left.png" alt="Previous" onClick={handlePrevPage} />
              {Array.from({ length: totalPages }, (_, index) => (
                <p
                  key={index}
                  onClick={() => paginate(index + 1)}
                  className={`mb-0 mx-2 cursor-pointer ${currentPage === index + 1 ? 'active' : ''}`}
                >
                  {index + 1}
                </p>
              ))}
              <img className="w-3 h-3 cursor-pointer" src="/image/right2.png" alt="Next" onClick={handleNextPage} />
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <p className="font-bold text-4xl">Multiple convenient features</p>
        <div className="row py-10">
          {[
            { img: "/image/phone.png", text: "CUSTOMER SUPPORT 24/7" },
            { img: "/image/review.png", text: "HONEST REVIEWS" },
            { img: "/image/schedule.png", text: "EASY RESCHEDULE" },
            { img: "/image/payment.png", text: "PAY UPON CHECK-IN" },
          ].map((feature, idx) => (
            <div key={idx} className="col-lg-3 col-6 card1 pb-3">
              <a href="#" className="no-underline text-black">
                <div
                  className="border grid justify-items-center"
                  style={{
                    borderRadius: "20px",
                    boxShadow: "0 4px 4px rgba(0, 0, 0, 0.25)",
                  }}
                >
                  <img
                    className="mt-5 mb-4"
                    src={feature.img}
                    style={{ width: "67px", height: "67px" }}
                    alt=""
                  />
                  <p className="font-bold pb-4">{feature.text}</p>
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ListHotels;
