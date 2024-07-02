"use client"
import { BookingCartItem } from "@/app/entities/bookingCartItem";
import { deleteBookingCart, getBookingCartByUserId, getHotelById, getRoomById, getRoomImagesByRoomId } from "@/app/services/bookingCartService";
import { useEffect, useState } from "react";
import Slider from "react-slick";
import Link from "../../../../node_modules/next/link";
import { useRouter } from "next/navigation";
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


const Booking_cart = () => {
  const router = useRouter();
  const [isFirstDivVisible, setIsFirstDivVisible] = useState(true);

  const handleBookingCartClick = (e:any) => {
    e.preventDefault();
    setIsFirstDivVisible(false);
  };

  const handleCartToursClick = (e:any) => {
    e.preventDefault();
    setIsFirstDivVisible(true);
  };

  // const handleAddToCart = async (room: IRoom) => {
  //     router.push(`/trekbooking/booking_infor?roomId=${room.roomId}&hotelId=${room.hotelId}`);
  // };

  const handleDeleteCart = async (cartId: number) => {
    try {
      await deleteBookingCart(cartId);
      setBookingCart((prev) => prev.filter((item) => item.bookingCartId !== cartId));
    } catch (error) {
      console.error('Error deleting cart:', error);
    }
  };

  const handleAddToCart = (roomId: number, hotelId: number) => {
    router.push(`/trekbooking/booking_infor?roomId=${roomId}&hotelId=${hotelId}`);
  };
  const [bookingCart, setBookingCart] = useState<BookingCartItem[]>([]);
  const [roomDetails, setRoomDetails] = useState<{ [key: number]: IRoom }>({});
  const [hotelDetails, setHotelDetails] = useState<{ [key: number]: IHotel }>({});
  const [roomImages, setRoomImages] = useState<{ [key: number]: IRoomImage[] }>({});
  const [isLoading, setIsLoading] = useState(true);
  const userId = localStorage.getItem("userId"); // Lấy userId từ localStorage

  useEffect(() => {
    const fetchBookingCart = async () => {
      try {
        
        const result = await getBookingCartByUserId();
        setBookingCart(result);

        // Fetch room and hotel details for each cart item
        const roomDetailPromises = result.map((item: BookingCartItem) => getRoomById(item.roomId));
        const hotelDetailPromises = result.map((item: BookingCartItem) => getHotelById(item.hotelId));
        
        const roomDetails = await Promise.all(roomDetailPromises);
        const hotelDetails = await Promise.all(hotelDetailPromises);

        const roomDetailsMap: { [key: number]: IRoom } = {};
        const hotelDetailsMap: { [key: number]: IHotel } = {};

        roomDetails.forEach((room: IRoom) => { roomDetailsMap[room.roomId] = room; });
        hotelDetails.forEach((hotel: IHotel) => { hotelDetailsMap[hotel.hotelId] = hotel; });

        setRoomDetails(roomDetailsMap);
        setHotelDetails(hotelDetailsMap);

        // Fetch room images
        const roomImagePromises = result.map((item: BookingCartItem) => getRoomImagesByRoomId(item.roomId));
        const roomImagesArray = await Promise.all(roomImagePromises);

        const roomImagesMap: { [key: number]: IRoomImage[] } = {};
        roomImagesArray.forEach((images: IRoomImage[], index: number) => {
          const roomId = result[index].roomId;
          roomImagesMap[roomId] = images;
        });

        setRoomImages(roomImagesMap);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching booking cart:', error);
        setIsLoading(false);
      }
    };

    fetchBookingCart();
  }, [userId]);

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
      <div className="container py-8">
        <div>
          <a
            className="no-underline flex items-center font-medium text-xl"
            style={{ color: "#305A61" }}
            href="#"
          >
            <img src="/image/chevron-down.png" alt="" /> Back
          </a>
        </div>
        <div className="flex my-8">
          <div className="pr-5">
            <a
              className="no-underline px-4 py-2 border text-sm font-medium listA"
              href="#"
              style={{ borderRadius: "10px" }}
              onClick={handleCartToursClick}
            >
              Cart Tours
            </a>
          </div>
          <div >
            <a
              className="no-underline px-4 py-2 border text-sm font-medium listA"
              href="#"
              style={{ borderRadius: "10px" }}
              onClick={handleBookingCartClick}
            >
              Booking Cart
            </a>
          </div>
        </div>
        {isFirstDivVisible ? (
        <div className="row ">
          <div className="col-lg-8 col-md-12">
            <div
              className="border "
              style={{ borderRadius: "10px", boxShadow: "0 6px 4px 0 #7F7F7F" }}
            >
              <div className="px-10 pt-7 pb-12">
                <div className="row border-solid border-b-2 border-black pb-3">
                  <div className="col-md-7">
                    <span
                      className="font-bold text-lg"
                      style={{ color: "#305A61" }}
                    >
                      Tours
                    </span>
                  </div>
                  <div className="col-md-5 row">
                    <div className="col-md-4 text-center">
                      <span
                        className="font-bold text-lg"
                        style={{ color: "#305A61" }}
                      >
                        Quantity
                      </span>
                    </div>
                    <div className="col-md-4 text-center">
                      <span
                        className="font-bold text-lg"
                        style={{ color: "#305A61" }}
                      >
                        Total
                      </span>
                    </div>
                    <div className="col-md-4"></div>
                  </div>
                </div>
                <div className="row pt-10">
                  <div className="col-md-7 flex justify-evenly items-center">
                    <div className="">
                      <img
                        className="border"
                        style={{ borderRadius: "10px" }}
                        src="/image/tour1.png"
                        alt=""
                      />
                    </div>
                    <div className="w-2/5">
                      <span className="font-semibold text-base">
                        Phu Quoc coral diving tour Explore colorful islands
                      </span>
                    </div>
                  </div>
                  <div className="col-md-5 row ">
                    <div className="col-md-4 flex items-center content-center justify-evenly">
                      <button>+</button>
                      <div>
                        <span>01</span>
                      </div>
                      <button>-</button>
                    </div>
                    <div className="col-md-4 flex items-center content-center justify-evenly">
                      <span className="font-bold text-xl">15US$</span>
                    </div>
                    <div className="col-md-4 flex items-center content-center justify-evenly">
                      <a href="#">
                        <img src="/image/trash.png" alt="" />
                      </a>
                    </div>
                  </div>
                </div>
                <div className="row pt-10">
                  <div className="col-md-7 flex justify-evenly items-center">
                    <div className="">
                      <img
                        className="border"
                        style={{ borderRadius: "10px" }}
                        src="/image/tour1.png"
                        alt=""
                      />
                    </div>
                    <div className="w-2/5">
                      <span className="font-semibold text-base">
                        Phu Quoc coral diving tour Explore colorful islands
                      </span>
                    </div>
                  </div>
                  <div className="col-md-5 row ">
                    <div className="col-md-4 flex items-center content-center justify-evenly">
                      <button>+</button>
                      <div>
                        <span>01</span>
                      </div>
                      <button>-</button>
                    </div>
                    <div className="col-md-4 flex items-center content-center justify-evenly">
                      <span className="font-bold text-xl">15US$</span>
                    </div>
                    <div className="col-md-4 flex items-center content-center justify-evenly">
                      <a href="#">
                        <img src="/image/trash.png" alt="" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-12">
            <div
              className="border"
              style={{ borderRadius: "10px", boxShadow: "0 6px 4px 0 #7F7F7F" }}
            >
              <div className="w-3/5 m-auto">
                <div className="text-center pt-3">
                  <span
                    className=" text-xl font-semibold"
                    style={{ color: "#305A61" }}
                  >
                    Price Details
                  </span>
                </div>
                <div className="pt-4 pb-8">
                  <div className="flex justify-between">
                    <p className="font-semibold text-lg">Sub - total: </p>
                    <p className="text-2xl">15US$</p>
                  </div>
                  <div className="flex justify-between border-solid border-b-2 border-black">
                    <p className="font-semibold text-lg">Discount:</p>
                    <p className="text-2xl">
                      <span className="text-2xl">-</span> 5US$
                    </p>
                  </div>
                  <div className="flex justify-between pt-2">
                    <p className="font-semibold text-lg">Total</p>
                    <p className="text-2xl font-semibold">10US$</p>
                  </div>
                  <div className="flex justify-end">
                    <button
                      className=" text-white font-medium py-1 px-3 text-lg border"
                      style={{ backgroundColor: "#305A61", borderRadius: "20px" }}
                    >
                      Continue
                    </button>
                  </div>
                </div>
              </div>
            </div>
  
            <div
              className="border mt-3"
              style={{ borderRadius: "10px", boxShadow: "0 6px 4px 0 #7F7F7F" }}
            >
              <div className="row justify-evenly items-center px-2 py-2">
                <div className="col-lg-8">
                  <input
                    className="pl-3 border"
                    style={{ borderRadius: "10px" }}
                    type="text"
                    placeholder="Discount vouchers"
                  />
                </div>
                <div className="col-lg-4">
                  <button
                    className="text-white font-medium py-1 px-3 text-base border"
                    style={{ backgroundColor: "#305A61", borderRadius: "20px" }}
                  >
                    Applied
                  </button>
                </div>
                
              </div>
            </div>
          </div>
        </div>
         ) : (
          <div className="block">
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
          {bookingCart.length > 0 ? (
            bookingCart.map((item, index) => {
              const room = roomDetails[item.roomId] || {} as IRoom;
              const hotel = hotelDetails[item.hotelId] || {} as IHotel;
              const images = roomImages[item.roomId] || [];
              const totalPrice = item.totalPrice; // Tính tổng giá cho 3 ngày

              return (
                <div key={index} className="border rounded-xl mt-3 pb-6" style={{ boxShadow: "0 4px 4px 0 #7F7F7F" }}>
                  <div className="close flex justify-end">
                    <img className="w-10 h-10 mr-3 mt-2 cursor-pointer" src="/image/close.jpg"  onClick={() => handleDeleteCart(item.bookingCartId)} alt="" />
                  </div>
                  <div className="mx-5  mb-2 ">
                    <div className="flex justify-between">
                      <span className="font-semibold text-xl">
                        {room.roomName}
                      </span>
                   
                      <Link className="mr-8" href={`/trekbooking/image360/${room.roomId}`}>
                        <img src="/image/view3D.png" className="w-10 h-10" alt="view 3D" />
                      </Link>
                    </div>

                    <div className="row">
                      <div className="col-lg-4 col-md-12 ">
                        {images.length >= 2 ? (
                          <Slider {...settings}>
                            {images.map((image) => (
                              <div key={image.roomImageId} className=''>
                                <img className="w-3/4 h-60 border rounded-lg mx-auto" src={image.roomImageURL} alt="room thumbnail" />
                              </div>
                            ))}
                          </Slider>
                        ) : (
                          <img className="w-full h-60 border rounded-lg" src={images[0]?.roomImageURL} alt="room thumbnail" />
                        )}
                      </div>

                      <div className="col-lg-8 col-md-12 border" style={{ borderRadius: "10px" }}>
                        <div className="row">
                          <div className="col-4 border-r border-gray" >
                            <p className="text-center text-sm font-semibold pt-3" style={{ color: "#305A61" }}>
                              Room information
                            </p>
                            <div className="w-3/4 m-auto">
                              {formatRoomDescription(room.roomDescription)}
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
                                  {Array.from({ length: room.roomCapacity }).map((_, i) => (
                                    <img key={i} className="w-4 h-4 m-1" src="/image/user.png" alt="guest" />
                                  ))}
                                </div>
                              </div>
                              <div className="col-lg-6" style={{
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
                                    {totalPrice}$
                                  </span>
                                  <span className="text-center text-xs font-light pb-3 md:mr-3" style={{ color: "#8E8D8A" }}>
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
                                        onClick={(e) => {
                                          e.preventDefault();
                                          handleAddToCart(item.roomId, item.hotelId);
                                        }}
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
              );
            })
          ) : (
            <div className="col-12">
              <p className="text-center py-4 text-red-600 font-bold">
                No items in cart
              </p>
            </div>
          )}
        </div>
      </div>
    </>

          </div>
            )}
      </div>
    );
  };
  export default Booking_cart;
  