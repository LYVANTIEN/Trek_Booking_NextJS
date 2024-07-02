/* eslint-disable @next/next/no-img-element */
"use client";
import hotelService from "@/app/services/hotelService";
import roomService from "@/app/services/roomService";
import commentService from "@/app/services/commentService";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useMemo, useCallback } from "react";
import { Oval } from 'react-loader-spinner'; // Import spinner
import { useRouter } from "next/router";


const ListHotels = () => {
  const [hotelList, setHotelList] = useState<IHotel[]>([]);
  const [roomList, setRoomList] = useState<IRoom[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [commentsCount, setCommentsCount] = useState<{ [key: number]: number }>(
    {}
  );

  //filter city
  const [selectedCity, setSelectedCity] = useState<string>("");

  ///search
  const [city, setCity] = useState<string | null>(null);


  useEffect(() => {
    // This effect will run only once when the component mounts
    const searchParams = new URLSearchParams(window.location.search);
    const cityParam = searchParams.get("city");
    setCity(cityParam);

  }, []);

  useEffect(() => {
    if (city) {
      searchHotels(city);
    } else {
      //fetchHotelsAndRooms();
    }
  }, [city]);

  const searchHotels = async (city: string) => {
    try {
      setLoading(true);
      const hotelSchedule = await hotelService.searchHotelByCity(city);
      setHotelList(hotelSchedule);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error searching hotels:", error);
      setError(error instanceof Error ? error : new Error("An unexpected error occurred"));
    }
  };

  //
  // useEffect(() => {
  //   const fetchHotelsAndRooms = async () => {
  //     setLoading(true);
  //     try {
  //       const [hotels, rooms] = await Promise.all([
  //         hotelService.getHotels(),
  //         roomService.getRooms(),
  //       ]);
  //       setHotelList(hotels);
  //       setRoomList(rooms);
  //       setLoading(false);
  //     } catch (error) {
  //       if (error instanceof Error) {
  //         console.error("Error fetching hotel or room list:", error);
  //         setError(error);
  //       } else {
  //         console.error("Unexpected error:", error);
  //         setError(new Error("An unexpected error occurred"));
  //       }
  //       setLoading(false);
  //     }
  //   };

  //   fetchHotelsAndRooms();
  // }, []);

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
  //if (error) return <p>Error loading data.</p>;

  return (
    <>
      <div className="container mb-20">
        <div className="text-center">
          <p className="font-bold text-4xl">The Best Place For Vacation </p>
        </div>
        <div
          className="border mb-10 pt-6"
          style={{ borderRadius: "20px", boxShadow: "0 6px 6px #0000004d" }}
        >
          <div className="row mx-3">
            <div className="col-2">
              <Link
                href="#"
                className="text-white no-underline zoom-effect-container"
              >
                <div className="relative image-card">
                  <img
                    className="border w-full"
                    style={{ borderRadius: "20px", height: "231px" }}
                    src="/image/cantho.webp"
                    alt="Can Tho"
                  />
                  <div
                    className="absolute z-10 w-full bottom-0 flex justify-center"
                    style={{
                      backgroundColor: "rgb(31,28,23,0.3)",
                      border: "0 0 1px 1px",
                      borderBottomLeftRadius: "20px",
                      borderBottomRightRadius: "20px",
                    }}
                  >
                    <span className="text-white font-semibold text-base">
                      Can Tho
                    </span>
                  </div>
                </div>
              </Link>
              <div className="flex justify-center my-3">
                <a
                  className="no-underline text-white border px-3 font-medium text-sm"
                  style={{ backgroundColor: "#305A61", borderRadius: "10px" }}
                  //filter city can tho
                  href={`/trekbooking/hotel_city?city=Cần Thơ`}
                >
                  Find hotel
                </a>
              </div>
            </div>
            <div className="col-2">
              <Link
                href="#"
                className="text-white no-underline zoom-effect-container"
              >
                <div className="relative image-card">
                  <img
                    className="border w-full"
                    style={{ borderRadius: "20px", height: "231px" }}
                    src="/image/vungtau.jpg"
                    alt="Vung Tau"
                  />
                  <div
                    className="absolute z-10 w-full bottom-0 flex justify-center"
                    style={{
                      backgroundColor: "rgb(31,28,23,0.3)",
                      border: "0 0 1px 1px",
                      borderBottomLeftRadius: "20px",
                      borderBottomRightRadius: "20px",
                    }}
                  >
                    <span className="text-white font-semibold text-base">
                      Vung Tau
                    </span>
                  </div>
                </div>
              </Link>
              <div className="flex justify-center my-3">
                <a
                  className="no-underline text-white border px-3 font-medium text-sm"
                  style={{ backgroundColor: "#305A61", borderRadius: "10px" }}
                  href={`/trekbooking/hotel_city?city=Vũng Tàu`}
                >
                  Find hotel
                </a>
              </div>
            </div>
            <div className="col-2">
              <Link
                href="#"
                className="text-white no-underline zoom-effect-container"
              >
                <div className="relative image-card">
                  <img
                    className="border w-full"
                    style={{ borderRadius: "20px", height: "231px" }}
                    src="/image/ninhbinh.jpg"
                    alt="ninh binh"
                  />
                  <div
                    className="absolute z-10 w-full bottom-0 flex justify-center"
                    style={{
                      backgroundColor: "rgb(31,28,23,0.3)",
                      border: "0 0 1px 1px",
                      borderBottomLeftRadius: "20px",
                      borderBottomRightRadius: "20px",
                    }}
                  >
                    <span className="text-white font-semibold text-base">
                      Ninh Binh
                    </span>
                  </div>
                </div>
              </Link>
              <div className="flex justify-center my-3">
                <a
                  className="no-underline text-white border px-3 font-medium text-sm"
                  style={{ backgroundColor: "#305A61", borderRadius: "10px" }}
                  href={`/trekbooking/hotel_city?city=Ninh Bình`}
                >
                  Find hotel
                </a>
              </div>
            </div>
            <div className="col-2">
              <Link
                href="#"
                className="text-white no-underline zoom-effect-container"
              >
                <div className="relative image-card">
                  <img
                    className="border w-full"
                    style={{ borderRadius: "20px", height: "231px" }}
                    src="/image/hcm.png"
                    alt="da lat"
                  />
                  <div
                    className="absolute z-10 w-full bottom-0 flex justify-center"
                    style={{
                      backgroundColor: "rgb(31,28,23,0.3)",
                      border: "0 0 1px 1px",
                      borderBottomLeftRadius: "20px",
                      borderBottomRightRadius: "20px",
                    }}
                  >
                    <span className="text-white font-semibold text-base">
                      Ho Chi Minh
                    </span>
                  </div>
                </div>
              </Link>
              <div className="flex justify-center my-3">
                <a
                  className="no-underline text-white border px-3 font-medium text-sm"
                  style={{ backgroundColor: "#305A61", borderRadius: "10px" }}
                  href={`/trekbooking/hotel_city?city=Ho Chi Minh`}
                >
                  Find hotel
                </a>
              </div>
            </div>
            <div className="col-2">
              <Link
                href="#"
                className="text-white no-underline zoom-effect-container"
              >
                <div className="relative image-card">
                  <img
                    className="border w-full"
                    style={{ borderRadius: "20px", height: "231px" }}
                    src="/image/hanoi.png"
                    alt="da lat"
                  />
                  <div
                    className="absolute z-10 w-full bottom-0 flex justify-center"
                    style={{
                      backgroundColor: "rgb(31,28,23,0.3)",
                      border: "0 0 1px 1px",
                      borderBottomLeftRadius: "20px",
                      borderBottomRightRadius: "20px",
                    }}
                  >
                    <span className="text-white font-semibold text-base">
                      Ha Noi
                    </span>
                  </div>
                </div>
              </Link>
              <div className="flex justify-center my-3">
                <a
                  className="no-underline text-white border px-3 font-medium text-sm"
                  style={{ backgroundColor: "#305A61", borderRadius: "10px" }}
                  href={`/trekbooking/hotel_city?city=Hanoi`}
                >
                  Find hotel
                </a>
              </div>
            </div>
            <div className="col-2">
              <Link
                href="#"
                className="text-white no-underline zoom-effect-container"
              >
                <div className="relative image-card">
                  <img
                    className="border w-full"
                    style={{ borderRadius: "20px", height: "231px" }}
                    src="/image/phanthiet.jpg"
                    alt="phan thiet"
                  />
                  <div
                    className="absolute z-10 w-full bottom-0 flex justify-center"
                    style={{
                      backgroundColor: "rgb(31,28,23,0.3)",
                      border: "0 0 1px 1px",
                      borderBottomLeftRadius: "20px",
                      borderBottomRightRadius: "20px",
                    }}
                  >
                    <span className="text-white font-semibold text-base">
                     Phan Thiết
                    </span>
                  </div>
                </div>
              </Link>
              <div className="flex justify-center my-3">
                <a
                  className="no-underline text-white border px-3 font-medium text-sm"
                  style={{ backgroundColor: "#305A61", borderRadius: "10px" }}
                  href={`/trekbooking/hotel_city?city=Phan Thiết`}
                >
                  Find hotel
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="text-center">
          <p className="font-bold text-4xl">Hotels near home</p>
        </div>
        <div className="row">
          {/* Links to locations */}
          {[
            "Ho Chi Minh",
            "Ha Noi",
            "Ha Long",
            "Da Lat",
            "Phu Quoc",
            "Da Nang",
          ].map((city) => (
            <div key={city} className="col-lg-2 col-sm-4 col-6 col-md-4 pb-2">
              <a
                className="no-underline px-4 py-1 border text-sm font-semibold listA"
                href="#"
                style={{ borderRadius: "10px" }}
              >
                {city}
              </a>
            </div>
          ))}
        </div>
        <div className="mt-16">
          <div className="row">
            {hotelList.length > 0 ? (
              hotelList.map((item: IHotel) => (
                <div key={item.hotelId} className="col-md-4 col-lg-3 mb-4">
                  <div
                    className="border grid justify-items-center pb-3 card1"
                    style={{
                      borderRadius: "20px",
                      boxShadow: "0 4px 4px rgba(0, 0, 0, 0.25)",
                    }}
                  >
                    <img
                      src={item.hotelAvatar}
                      alt="hotel"
                      className="p-3 h-285"
                      style={{ border: "1px", borderRadius: "36px" }}
                    />
                    <p className="text-base font-semibold">{item.hotelName}</p>
                    <p className="text-sm font-semibold">
                      9.0 Excellent _{" "}
                      <span style={{ color: "#2cc92c" }}>
                        {" "}
                        {commentsCount[item.hotelId] || 0} reviews
                      </span>
                    </p>
                    <p className="text-base font-semibold">
                      From ${getLowestPrice(item.hotelId) || "N/A"}
                    </p>
                    <Link
                      href={`/trekbooking/list_hotel/${item.hotelId}`}
                      className="text-white font-medium py-2 px-6 text-lg border no-underline"
                      style={{
                        backgroundColor: "#305A61",
                        borderRadius: "20px",
                      }}
                    >
                      Book now
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
            <div key={idx} className="col-md-3 card1">
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
                  <p className="font-bold text-xl pb-4">{feature.text}</p>
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
