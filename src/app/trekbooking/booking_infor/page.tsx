'use client';
import Link from "next/link";
import Slider from "react-slick";
import { useEffect, useState } from 'react';
import { getBookingCartByUserId, getHotelById, getRoomById, getRoomImagesByRoomId } from "@/app/services/bookingCartService";
import { BookingCartItem } from "@/app/entities/bookingCartItem";
import { useSearchParams } from 'next/navigation';
import { Oval } from 'react-loader-spinner'; 

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

const BookingInfo = () => {
  const [bookingCart, setBookingCart] = useState<BookingCartItem[]>([]);
  const [roomDetails, setRoomDetails] = useState<IRoom | null>(null);
  const [hotelDetails, setHotelDetails] = useState<IHotel | null>(null);
  const [roomImages, setRoomImages] = useState<IRoomImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const searchParams = useSearchParams();
  const roomId = Number(searchParams.get("roomId"));
  const hotelId = Number(searchParams.get("hotelId"));
  const userId = localStorage.getItem("userId"); // Lấy userId từ localStorage

  useEffect(() => {
    const fetchBookingInfo = async () => {
      try {
        // Fetch room and hotel details
        const room = await getRoomById(roomId);
        console.log("Room Details:", room);
        const hotel = await getHotelById(hotelId);
        console.log("Hotel Details:", hotel);

        setRoomDetails(room);
        setHotelDetails(hotel);

        // Fetch room images
        const images = await getRoomImagesByRoomId(roomId);
        console.log("Room Images:", images);
        setRoomImages(images);

        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching booking info:', error);
        setIsLoading(false);
      }
    };

    fetchBookingInfo();
  }, [roomId, hotelId]);

  if (isLoading) {
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

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    draggable: false,
    autoplay: true,
    autoplaySpeed: 1000,
  };

  const calculateTotalPrice = (pricePerNight: number, numberOfNights: number) => {
    return pricePerNight * numberOfNights;
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
      <div className="container py-8">
        <div>
          <span className="font-semibold text-3xl">
            Thông tin giỏ hàng
          </span>
          {roomDetails && hotelDetails ? (
            <div className="border rounded-xl mt-3 pb-6" style={{ boxShadow: "0 4px 4px 0 #7F7F7F" }}>
              <div className="mx-5 mt-4 mb-2 ">
                <div className="flex justify-between">
                  <span className="font-semibold text-xl">
                    {roomDetails.roomName}
                  </span>
                  <Link className="mr-8" href={`/trekbooking/image360/${roomDetails.roomId}`}>
                    <img src="/image/view3D.png" className="w-10 h-10" alt="view 3D" />
                  </Link>
                </div>

                <div className="row">
                  <div className="col-lg-4 col-md-12 ">
                    {roomImages.length >= 2 ? (
                      <Slider {...settings}>
                        {roomImages.map((image) => (
                          <div key={image.roomImageId} className=''>
                            <img className="w-3/4 h-60 border rounded-lg mx-auto" src={image.roomImageURL} alt="room thumbnail" />
                          </div>
                        ))}
                      </Slider>
                    ) : (
                      <img className="w-full h-60 border rounded-lg" src={roomImages[0]?.roomImageURL} alt="room thumbnail" />
                    )}
                  </div>

                  <div className="col-lg-8 col-md-12 border" style={{ borderRadius: "10px" }}>
                    <div className="row">
                      <div className="col-4 border-r border-gray" >
                        <p className="text-center text-sm font-semibold pt-3" style={{ color: "#305A61" }}>
                          Room information
                        </p>
                        <div className="w-3/4 m-auto">
                          {formatRoomDescription(roomDetails.roomDescription)}
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
                              {Array.from({ length: roomDetails.roomCapacity }).map((_, i) => (
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
                              <span className="text-center text-sm font-semibold pb-3 pt-3 " style={{ color: "#305A61" }}>
                                Price
                              </span>
                              <span className="text-center text-xl font-bold pb-3 ">
                                {calculateTotalPrice(roomDetails.roomPrice, 3)}$
                              </span>
                              <span className="text-center text-xs font-light pb-3 md:mr-3" style={{ color: "#8E8D8A" }}>
                                Exclude taxes & fees
                              </span>
                              
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="col-12">
              <p className="text-center py-4 text-red-600 font-bold">
                No items in cart
              </p>
            </div>
          )}
        </div>

        <div className="pt-4">
          <a className="no-underline flex items-center font-medium text-xl" style={{ color: "#305A61" }} href="#">
            <img src="/image/chevron-down.png" alt="" /> Back
          </a>
        </div>
        <div className="row pt-8">
          <div className="col-md-6">
            <div className="border" style={{ borderRadius: "10px", boxShadow: "0 6px 4px 0 #7F7F7F" }}>
              <div className="w-4/5 m-auto">
                <div className="text-center pt-5">
                  <span className=" text-xl font-semibold" style={{ color: "#305A61" }}>
                    Guest Information
                  </span>
                </div>
                <div className="pt-3">
                  <p className="font-semibold">Full name</p>
                  <input type="text" className="border w-full py-2" style={{ borderRadius: "10px", borderColor: "#D2D2D2" }} />
                </div>
                <div className="pt-3">
                  <p className="font-semibold">Email</p>
                  <input type="text" className="border w-full py-2" style={{ borderRadius: "10px", borderColor: "#D2D2D2" }} />
                </div>
                <div className="pt-3">
                  <p className="font-semibold">Phone number</p>
                  <input type="text" className="border w-full py-2" style={{ borderRadius: "10px", borderColor: "#D2D2D2" }} />
                </div>
                <div className="pt-3">
                  <p className="font-semibold">
                    Special requirements <span className="font-medium" style={{ color: "#8E8D8A" }}>(optional)</span>
                  </p>
                  <input type="text" className="border w-full py-2" style={{ borderRadius: "10px", borderColor: "#D2D2D2" }} />
                </div>
                <div className="flex justify-end pt-3 pb-4">
                  <button className=" text-white font-medium py-2 px-6 text-lg border" style={{ backgroundColor: "#305A61", borderRadius: "20px" }}>
                    Continue
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="border" style={{ borderRadius: "10px", boxShadow: "0 6px 4px 0 #7F7F7F" }}>
              <div className="w-3/5 m-auto">
                <div className="text-center pt-5">
                  <span className=" text-xl font-semibold" style={{ color: "#305A61" }}>
                    Price Details
                  </span>
                </div>
                <div className="pt-4">
                  <div className="flex justify-between">
                    <p className="font-semibold text-lg">1 Room x 3 Nights:</p> {/* Cập nhật số ngày ở */}
                    <p className="text-2xl">105US$</p> {/* Hiển thị tổng giá cho 3 đêm */}
                  </div>
                  <div className="flex justify-between">
                    <p className="font-semibold text-lg">VAT:</p>
                    <p className="text-2xl"><span className="text-2xl">-</span> 2US$</p>
                  </div>
                  <div className="flex justify-between border-solid border-b-2 border-black">
                    <p className="font-semibold text-lg">Discount</p>
                    <p className="text-2xl"><span className="text-2xl">-</span> 5US$</p>
                  </div>
                  <div className="flex justify-between pt-2">
                    <p className="font-semibold text-lg">Total</p>
                    <p className="text-2xl font-semibold">98US$</p> {/* Hiển thị tổng giá cuối cùng */}
                  </div>
                </div>
              </div>
            </div>
            <div className="border mt-7" style={{ borderRadius: "10px", boxShadow: "0 6px 4px 0 #7F7F7F" }}>
              <div className="w-11/12 m-auto">
                <div className="pt-5">
                  <span className=" text-xl font-semibold" style={{ color: "#305A61" }}>
                    Discount vouchers:
                  </span>
                </div>
                <div className="pt-4">
                  <span className="text-lg"><span className="text-lg font-semibold">[SPDHIS]</span> Lorem ipsum dolor sit amet consectetur. Diam aliquam massa hendrerit consectetur volutpat. Sem quam sed elementum ut.</span>
                </div>
                <div className="flex justify-end pt-3 pb-2">
                  <button className=" text-white font-medium py-1 px-4 text-lg border" style={{ backgroundColor: "#305A61", borderRadius: "20px" }}>
                    Applied
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookingInfo;
