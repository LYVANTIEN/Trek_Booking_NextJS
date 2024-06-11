/* eslint-disable @next/next/no-img-element */
"use client";
import hotelService from "@/app/services/hotelService";
import roomImageService from "@/app/services/roomImageService";
import roomService from "@/app/services/roomService";
import Link from "next/link";
import { useEffect, useState } from "react";
import useSWR from "swr";
import React from "react";
import Slider from "react-slick";
import { addToBookingCart, getBookingCartByUserId } from "@/app/services/bookingCartService";

import { useRouter } from "next/navigation";
import { toast } from "react-toastify";


const formatRoomDescription = (description: string) => {

  return description.split(".").map((sentence, index) => {
    if (sentence.trim() === "") return null; // Skip empty strings resulting from splitting
    return (
      <div key={index} className="flex items-baseline pb-2">
        <img className="w-2 h-2 mr-2" src="/image/tick.png" alt="tick" />
        <span className="font-medium text-xs">{sentence.trim()}.</span>
      </div>
    );
  });
};

const DetailHotel = ({ params }: { params: { hotelId: string } }) => {
  const userId = localStorage.getItem("userId");
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [roomList, setRoomList] = useState<IRoom[]>([]);
  const [roomImages, setRoomImages] = useState<{ [key: number]: IRoomImage[] }>(
    {}
  );
  const { data: hotel, error } = useSWR("detailHotel", () =>
    hotelService.getHotelById(Number(params.hotelId))
  );
  const { data: listRoom, isLoading } = useSWR("listRoom", () =>
    roomService.getRoomsByHotelId(Number(params.hotelId))
  );
  const router = useRouter();
  useEffect(() => {
    if (listRoom) {
      setRoomList(listRoom);
      fetchRoomImages(listRoom);
    }
  }, [listRoom]);

  const fetchRoomImages = async (rooms: IRoom[]) => {
    const imagesMap: { [key: number]: IRoomImage[] } = {};
    for (const room of rooms) {
      const images: IRoomImage[] = await roomImageService.getRoomImageByRoomId(
        room.roomId
      );
      if (images.length > 0) {
        imagesMap[room.roomId] = images;
      }
    }
    setRoomImages(imagesMap);
  };
  //console.log(roomImages);
  const getLowestPrice = (hotelId: number) => {
    const rooms = roomList.filter((room) => room.hotelId === hotelId);
    if (rooms.length > 0) {
      return Math.min(...rooms.map((room) => room.roomPrice));
    }
    return null;
  };

  const renderGuests = (guestValue: number) => {
    const guests = [];
    for (let i = 0; i < guestValue; i++) {
      guests.push(
        <img key={i} className="w-4 h-4" src="/image/user.png" alt="guest" />
      );
    }
    return guests;
  };

  const handleAddToCart = async (room: IRoom) => {
    if (!checkInDate || !checkOutDate) {
      toast.error("Please select both check-in and check-out dates");
      return;
    }
    const currentDate = new Date();
    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);

    // Kiểm tra ngày nhận phòng và trả phòng
    if (checkIn < currentDate) {
      toast.error("Check-in date cannot be in the past and must be more than 1 day later");
      return;
    }
    if (checkOut <= checkIn) {
      toast.error("Check-out date must be after check-in date");
      return;
    }
    const stayDuration = (checkOut.getTime() - checkIn.getTime()) / (1000 * 3600 * 24);
    if (stayDuration > 30) {
      toast.error("Stay cannot be longer than 30 days");
      return;
    }
    if (stayDuration < 1) {
      toast.error("Stay duration must be at least 1 day");
      return;
    }
    try {


      const existingCart = await getBookingCartByUserId(Number(userId));
      const roomExists = existingCart.some((item: any) => item.roomId === room.roomId);
      if (roomExists) {
        toast.error('Room is already in the cart');
        return;
      }
  
      if(!userId){
        toast.error('You must login to book the room!');
       setTimeout(()=> {
        router.push(`/login_client?redirect=/trekbooking/list_hotel/${params.hotelId}`); 
       },2000)

        return;
      }
    const bookingData = {
      bookingCartId: 0,
      userId: userId, // Thay bằng giá trị thực tế
      hotelId: room.hotelId,
      roomId: room.roomId,
      checkInDate: new Date(checkInDate).toISOString(),
      checkOutDate: new Date(checkOutDate).toISOString(),
      totalPrice: room.roomPrice,
      roomQuantity: 1, // Thay bằng giá trị thực tế
      voucherCode: "not have", // Thay bằng giá trị thực tế
      userNote: "not have" // Thay bằng giá trị thực tế
    };
  
   
      const result = await addToBookingCart(bookingData);
      toast.success()
     // router.push('/trekbooking/booking_infor');
      router.push(`/trekbooking/booking_infor?roomId=${room.roomId}&hotelId=${room.hotelId}`);
      console.log('Booking cart added:', result);
    } catch (error) {
      console.error('Error adding to booking cart:', error);
    }
  
  };
  
  if (!listRoom) {
    return <div>Loading...</div>;
  }
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    draggable: false,
    autoplay: false,
    autoplaySpeed: 4000,
  };
  return (
    <>
      <link
        rel="stylesheet"
        type="text/css"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
      />
      <link
        rel="stylesheet"
        type="text/css"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
      />
      <div className="container">
        <div className="font-semibold text-xl" style={{ color: "#305A61" }}>
          <Link
            className="no-underline underline_hv"
            style={{ color: "#305A61" }}
            href="/"
          >
            Home
          </Link>{" "}
          <span>/</span>{" "}
          <Link
            className="no-underline underline_hv"
            style={{ color: "#305A61" }}
            href="/trekbooking/list_hotel"
          >
            Hotels
          </Link>{" "}
          <span>/</span> <span>{hotel?.hotelName}</span>
        </div>
      </div>
      <div className="container my-20">
        <div className="py-8 px-3">
          <div className="row">
            <div className="col-md-8">
              <p className="font-semibold text-3xl">{hotel?.hotelName}</p>
              <div className="flex items-center justify-between w-2/5 pb-3">
                <div>
                  <span
                    className="p-0 text-base font-normal"
                    style={{ color: "#305A61" }}
                  >
                    Hotels
                  </span>
                </div>
                <div className="flex h-3">
                  <img className="pr-1" src="/image/start.png" alt="" />
                  <img className="pr-1" src="/image/start.png" alt="" />
                  <img className="pr-1" src="/image/start.png" alt="" />
                  <img className="pr-1" src="/image/start.png" alt="" />
                  <img className="pr-1" src="/image/start.png" alt="" />
                </div>
                <div>
                  <img src="/image/map-pin.png" alt="" />
                </div>
                <div>
                  <span className="text-base font-normal">
                    {hotel?.hotelCity}
                  </span>
                </div>
              </div>
              <span className="text-base font-normal">
                {hotel?.hotelDistrict}
              </span>
            </div>
  
            <div className="col-md-4">
              <div
                className="grid justify-items-center content-center py-4 mb-4 border rounded-xl"
                style={{ backgroundColor: "#F5F5F5" }}
              >
                <div>
                  <span className="font-semibold">
                    Price/room/night starts from
                  </span>
                </div>
                <span className="font-bold text-2xl">
                  ${getLowestPrice(Number(params.hotelId)) || "N/A"}
                </span>
                <a
                  className="no-underline px-4 py-1 border text-base font-medium text-white"
                  style={{ borderRadius: "12px", backgroundColor: "#305A61" }}
                  href=""
                >
                  Select room
                </a>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12 max-[767px]:mb-8">
              <img
                className="w-full border rounded-xl"
                src={hotel?.hotelAvatar}
                alt=""
              />
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-md-8">
              <a
                className="no-underline px-4 py-1 border text-base font-medium text-white"
                style={{ borderRadius: "10px", backgroundColor: "#305A61" }}
                href="#"
              >
                Overview
              </a>
              <p className="font-bold pt-3">About Accommodation</p>
              <p> {hotel?.hotelFulDescription}</p>
            </div>
  
            <div className="col-md-4">
              <div
                className="grid justify-items-center content-center py-32 border"
                style={{ backgroundColor: "#F5F5F5", borderRadius: "10px" }}
              >
                <div>
                  <span className="font-bold text-xl">Reviews and ratings</span>
                </div>
                <div className="flex items-center">
                  <span className="font-bold text-xl pr-2">4.9</span>
                  <div className="flex h-3">
                    <img className="pr-1" src="/image/start.png" alt="" />
                    <img className="pr-1" src="/image/start.png" alt="" />
                    <img className="pr-1" src="/image/start.png" alt="" />
                    <img className="pr-1" src="/image/start.png" alt="" />
                    <img className="pr-1" src="/image/start.png" alt="" />
                  </div>
                </div>
                <span>Based on 1k reviews</span>
              </div>
            </div>
          </div>
        </div>
        <div>
          <span className="font-semibold text-3xl ">
            Rooms available at <span>{hotel?.hotelName}</span>
          </span>
          <div className="row pt-4 ">
                                      <div className="col-lg-2">
                                        <label className="font-bold pb-2 " style={{"color": "#ac7171"}}  htmlFor="checkInDate">Check-in Date:</label>
                                        <br></br>
                                        <input 
                                          type="datetime-local" 
                                          id="checkInDate" 
                                          value={checkInDate} 
                                          onChange={(e) => setCheckInDate(e.target.value)} 
                                          required 
                                           className="hotel-date-input outline-none "
                                        />
                                      </div>
                                      <div className="col-lg-2 ml-4">
                                        <label className="font-bold pb-2" style={{"color": "#ac7171"}} htmlFor="checkOutDate">Check-out Date:</label>
                                        <br></br>
                                        <input 
                                          type="datetime-local" 
                                          id="checkOutDate" 
                                          value={checkOutDate} 
                                          onChange={(e) => setCheckOutDate(e.target.value)} 
                                          required 
                                          className="hotel-date-input outline-none "
                                        />
                                      </div>
                                    </div>
          {listRoom.length > 0 ? (
            listRoom.map((item: IRoom, index) => (
              <>
                <div
                  className="border rounded-xl mt-3"
                  style={{ boxShadow: "0 4px 4px 0 #7F7F7F" }}
                >
                  <div className="mx-5 mt-4 mb-2">
                    <div className="flex justify-between">
                      <span className="font-semibold text-xl">
                        {item.roomName}
                      </span>
                      <Link className="mr-8" href={`/trekbooking/image360/${item.roomId}`}>
                        <img
                          src="/image/view3D.png"
                          className="w-10 h-10"
                          alt="view 3D"
                        />
                      </Link>
                    </div>
  
                    <div className="row">
                      <div className="col-lg-4 col-md-12">
                        {roomImages[item.roomId]?.length >= 2 ? (
                          <Slider {...settings}>
                            {roomImages[item.roomId]?.map((image) => (
                              <div key={image.roomImageId}>
                                <img
                                  className="w-full h-60 border rounded-lg"
                                  src={image.roomImageURL}
                                  alt="room thumbnail"
                                />
                              </div>
                            ))}
                          </Slider>
                        ) : (
                          <img
                            className="w-full h-60 border rounded-lg"
                            src={roomImages[item.roomId]?.[0].roomImageURL}
                            alt="room thumbnail"
                          />
                        )}
                      </div>
  
                      <div className="col-lg-8 col-md-12 border " style={{ borderRadius: "10px" }}>
                        <div className="row">
                          <div className="col-4 border-r border-gray" >
                            <p className="text-center text-sm font-semibold pt-3" style={{ color: "#305A61" }}>
                              Room information
                            </p>
                            <div className="w-3/4 m-auto">
                              {formatRoomDescription(item.roomDescription)}
                            </div>
                          </div>
                          <div className="col-4 border-r border-gray" style={{ height: "290px" }}>
                            <p className="text-center text-sm font-semibold pt-3" style={{ color: "#305A61" }}>
                              Convenient
                            </p>
                            <div className="w-3/4 m-auto">
                              <div className="flex items-center pb-1 ">
                                <img className="w-2 h-2 mr-2" src="/image/tick.png" alt="tick" />
                                <span className="font-medium text-xs">
                                  Lorem ipsum dolor sit
                                </span>
                              </div>
                              <div className="flex items-center pb-1 ">
                                <img className="w-2 h-2 mr-2" src="/image/tick.png" alt="tick" />
                                <span className="font-medium text-xs">
                                  Lorem ipsum dolor sit
                                </span>
                              </div>
                              <div className="flex items-center pb-1 ">
                                <img className="w-2 h-2 mr-2" src="/image/tick.png" alt="tick" />
                                <span className="font-medium text-xs">
                                  Lorem ipsum dolor sit
                                </span>
                              </div>
                              <div className="flex items-center pb-1 ">
                                <img className="w-2 h-2 mr-2" src="/image/tick.png" alt="tick" />
                                <span className="font-medium text-xs">
                                  Lorem ipsum dolor sit
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="col-4">
                            <div className="row">
                            <div className="col-6">
                            <p className="text-center text-sm font-semibold pt-3" style={{ color: "#305A61" }}>
                              Guest(s)
                            </p>
                            <div className="flex flex-wrap items-center pb-1 w-3/4 mx-auto">
                              {/* Hiển thị số lượng khách */}
                              {Array.from({ length: item.roomCapacity }).map((_, i) => (
                                <img key={i} className="w-4 h-4 m-1" src="/image/user.png" alt="guest" />
                              ))}
                            </div>
                          </div>
                              <div className="col-lg-6 col-md-6" style={{
                                height: "356px",
                                border: "1px solid #D9D9D9",
                                borderRadius: "10px",
                                backgroundColor: "#F5F5F5",
                              }}>
                                <div className="grid justify-items-center">
                                  <span className="text-center text-sm font-semibold pb-3 pt-3" style={{ color: "#305A61" }}>
                                    Price
                                  </span>
                                  <span className="text-center text-xl font-bold pb-3 line-through" style={{ color: "#8E8D8A" }}>
                                    45US$
                                  </span>
                                  <span className="text-center text-xl font-bold pb-3">
                                    {item.roomPrice}$
                                  </span>
                                  <span className="text-center text-xs font-light pb-3" style={{ color: "#8E8D8A" }}>
                                    Exclude taxes & fees
                                  </span>
                                
                                   
                                    <div className="pb-1">
                                      <Link
                                        href=""
                                        className="px-2 py-1 border text-white no-underline font-medium text-xs "
                                        style={{
                                          backgroundColor: "#305A61",
                                          borderRadius: "10px",
                                        }}
                                        onClick={() => handleAddToCart(item)}
                                      >
                                        Choose
                                      </Link>
                                    </div>
                             
                                  <div className="pt-3">
                                    <Link
                                      href=""
                                      className="px-1 py-1 border text-white no-underline font-medium text-xs"
                                      style={{
                                        backgroundColor: "#305A61",
                                        borderRadius: "10px",
                                      }}
                                    >
                                      View Detail
                                    </Link>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ))
          ) : (
            <div className="col-12">
              <p className="text-center py-4 text-red-600 font-bold">
                No rooms found
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
  };
  export default DetailHotel;