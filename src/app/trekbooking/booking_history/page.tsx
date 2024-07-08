/* eslint-disable @next/next/no-img-element */
"use client";
import { useEffect, useState } from "react";
import Slider from "react-slick";
import Link from "../../../../node_modules/next/link";
import { useRouter } from "next/navigation";
import { Oval } from "react-loader-spinner";
import "../../../../public/css/voucher.css";
import orderTourHeaderService from "@/app/services/orderTourHeaderService";
import orderTourDetailService from "@/app/services/orderTourDetailService";
import tourImageService from "@/app/services/tourImageService";
import orderHotelHeaderService from "@/app/services/orderHotelHeaderService";
import orderHotelDetailService from "@/app/services/orderHotelDetailService";
import roomImageService from "@/app/services/roomImageService";


const formatRoomDescription = (description: string) => {
  return description.split(".").map((sentence, index) => {
    if (sentence.trim() === "") return null;
    return (
      <div key={index} className="flex items-baseline pb-2">
        <img className="w-2 h-2 mr-2" src="/image/tick.png" alt="tick" />
        <span className="font-medium text-xs">{sentence.trim()}.</span>
      </div>
    );
  });
};

const Booking_History = () => {
  const router = useRouter();
  const [isFirstDivVisible, setIsFirstDivVisible] = useState(true);

  const handleBookingCartClick = (e: any) => {
    e.preventDefault();
    setIsFirstDivVisible(false);
  };

  const handleCartToursClick = (e: any) => {
    e.preventDefault();
    setIsFirstDivVisible(true);
  };

  const [orderTourHeader, setOrderTourHeader] = useState<IOrderTourHeader[]>(
    []
  );
  const [orderHotelHeader, setOrderHotelHeader] = useState<IOrderHotelHeader[]>(
    []
  );
  const [tourDetails, setTourDetails] = useState<{
    [key: number]: IOrderTourDetail[];
  }>({});

  const [hotelDetails, setHotelDetails] = useState<{
    [key: number]: IOrderHotelDetail[];
  }>({});

  const [roomImages, setRoomImages] = useState<IRoomImage[]>([]);
  const [tourImages, setTourImages] = useState<ITourImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTour = async () => {
      try {
        const headers =
          await orderTourHeaderService.getOrderTourHeaderByUserId();
        setOrderTourHeader(headers);

        const detailPromises = headers.map((header) =>
          orderTourDetailService.getOrderTourDetailByOrderTourHeaderId(
            header.id
          )
        );
        const detailsArray = (await Promise.all(detailPromises))
          .filter(Boolean)
          .flat();
        const detailsMap: { [key: number]: IOrderTourDetail[] } = {};

        detailsArray.forEach((detail) => {
          if (!detailsMap[detail.orderTourHeaderlId]) {
            detailsMap[detail.orderTourHeaderlId] = [];
          }
          detailsMap[detail.orderTourHeaderlId].push(detail);
        });
        setTourDetails(detailsMap);

        // Fetch tour images
        const tourIds = new Set(
detailsArray
            .filter(
              (detail): detail is IOrderTourDetail =>
                detail !== null && detail.tourId !== undefined
            )
            .map((detail) => detail.tourId)
        );

        const imagePromises = Array.from(tourIds).map((tourId) =>
          tourImageService.getTourImageByTourId(tourId)
        );
        const imagesArray = await Promise.all(imagePromises);
        const allTourImages = imagesArray.flat();
        setTourImages(allTourImages);

        console.log("Order Tour Headers:", headers);
        console.log("Tour Details Map:", detailsMap);

        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching tour:", error);
        setIsLoading(false);
      }
    };

    fetchTour();
  }, []);

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const headers =
          await orderHotelHeaderService.getOrderHotelHeaderByUserId();
        setOrderHotelHeader(headers);

        const detailPromises = headers.map((header) =>
          orderHotelDetailService.getOrderHotelDetailByOrderHotelHeaderId(
            header.id
          )
        );
        const detailsArray = (await Promise.all(detailPromises))
          .filter(Boolean)
          .flat();
        const detailsMap: { [key: number]: IOrderHotelDetail[] } = {};

        detailsArray.forEach((detail) => {
          if (!detailsMap[detail.orderHotelHeaderlId]) {
            detailsMap[detail.orderHotelHeaderlId] = [];
          }
          detailsMap[detail.orderHotelHeaderlId].push(detail);
        });
        setHotelDetails(detailsMap);

        // Fetch tour images
        const roomIds = new Set(
          detailsArray
            .filter(
              (detail): detail is IOrderHotelDetail =>
                detail !== null && detail.roomId !== undefined
            )
            .map((detail) => detail.roomId)
        );

        const imagePromises = Array.from(roomIds).map((roomId) =>
          roomImageService.getRoomImageByRoomId(roomId)
        );
        const imagesArray = await Promise.all(imagePromises);
        const allTourImages = imagesArray.flat();
        setRoomImages(allTourImages);

        console.log("Order Tour Headers:", headers);
        console.log("Tour Details Map:", detailsMap);

        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching tour:", error);
        setIsLoading(false);
      }
    };

    fetchRoom();
  }, []);

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
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
draggable: false,
autoplay: false,
    autoplaySpeed: 1000,
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
      <div>
        <div className="payment-wallet">
          <h3>History</h3>
        </div>
        <div className="container py-8">
          <div className="flex my-8">
            <div className="pr-5">
              <a
                className="no-underline px-4 py-2 border text-sm font-medium listA"
                href="#"
                style={{ borderRadius: "10px" }}
                onClick={handleCartToursClick}
              >
                Tours
              </a>
            </div>
            <div>
              <a
                className="no-underline px-4 py-2 border text-sm font-medium listA"
                href="#"
                style={{ borderRadius: "10px" }}
                onClick={handleBookingCartClick}
              >
                Rooms
              </a>
            </div>
          </div>
          {isFirstDivVisible ? (
            <div className="row ">
              <div className="">
                <div
                  className="border "
                  style={{
                    borderRadius: "10px",
                    boxShadow: "0 6px 4px 0 #7F7F7F",
                  }}
                >
                  <div className="px-10 pt-7 pb-12">
                    <div className="row border-solid border-b-2 border-black pb-3">
                      <div className="col-lg-6 col-md-4 max-[768px]:hidden">
                        <span
                          className="font-bold text-lg max-[555px]:text-xs"
                          style={{ color: "#305A61" }}
                        >
                          Tours
                        </span>
                      </div>
                      <div className="col-lg-6 col-md-8 col-12 row">
                        <div className="col-lg-4 col-md-3 col-3 max-[400px]:col-3 text-center max-[400px]:hidden">
                          <span
                            className="font-bold text-lg max-[555px]:text-xs"
                            style={{ color: "#305A61" }}
                          >
                            OrderDate
                          </span>
                        </div>
                        <div className="col-lg-2 col-md-3 col-2 max-[400px]:col-4 text-center ">
                          <span
                            className="font-bold text-lg max-[555px]:text-xs"
                            style={{ color: "#305A61" }}
                          >
                            Quantity
                          </span>
                        </div>
<div className="col-lg-2 col-md-2 col-2 max-[400px]:col-2 max-[400px]:ml-6 text-center ">
                          <span
                            className="font-bold text-lg max-[555px]:text-xs  max-[370px]:ml-2"
                            style={{ color: "#305A61" }}
                          >
                             Total
                          </span>
                        </div>
                        <div className="col-lg-2 col-md-2 col-2 max-[400px]:col-3 max-[400px]:ml-2 text-center ">
                          <span
                            className="font-bold text-lg max-[555px]:text-xs  max-[370px]:ml-3"
                            style={{ color: "#305A61" }}
                          >
                            Status
                          </span>
                        </div>
                        <div className="col-lg-2 col-md-2 col-3 max-[400px]:col-2 text-center max-[400px]:ml-4">
                          <span
                            className="font-bold text-lg max-[555px]:text-xs max-[370px]:ml-6"
                            style={{ color: "#305A61" }}
                          >
                            Action
                          </span>
                        </div>
                      </div>
                    </div>
                    {orderTourHeader.length > 0 ? (
                      orderTourHeader.map((header, index) => (
                        <div className="row pt-10" key={index}>
                          <div className="col-lg-6 col-md-4 col-0 flex items-center">
                            <div className="col-lg-2 col-md-6 col-12 max-[768px]:hidden">
                              {tourImages.length >= 0 ? (
                                <Slider {...settings}>
                                  {tourImages
                                    .filter((image) =>
                                      tourDetails[header.id]?.some(
                                        (detail) =>
                                          detail.tourId === image.tourId
                                      )
                                    )
                                    .map((image) => (
                                      <div key={image.tourImageId} className="">
                                        <img
                                          style={{ borderRadius: "10px" }}
                                          className="w-3/4 h-12 border rounded-lg mx-auto"
                                          src={image.tourImageURL}
                                          alt="tour thumbnail"
                                        />
                                      </div>
                                    ))}
                                </Slider>
                              ) : (
                                <img
                                  style={{ borderRadius: "10px" }}
className="w-full h-12 border rounded-lg"
                                  src="/path/to/default/image.jpg"
                                  alt="default thumbnail"
                                />
                              )}
                            </div>
                            <div className="w-2/5 ml-4 max-[992px]:text-xs max-[768px]:hidden">
                              <span>
                                {tourDetails[header.id]
                                  ?.map((detail) => detail.tourName)
                                  .join(", ")}
                              </span>
</div>
                          </div>
                          <div className="col-lg-6 col-md-8 col-12 row ">
                            <div className="col-lg-4 col-md-4 col-3 flex items-center content-center justify-evenly  max-[400px]:hidden">
                              <div>
                                <span className="max-[500px]:text-xs ">
                                  {new Date(
                                    header.tourOrderDate
                                  ).toLocaleDateString()}
                                </span>
                              </div>
                            </div>
                            <div className="col-lg-2 col-md-2 col-2 max-[400px]:col-4 max-[400px]:ml-2 flex items-center content-center justify-evenly ">
                              <div className="max-[500px]:text-xs">
                                {tourDetails[header.id]
                                  ?.map((detail) => detail.tourOrderQuantity)
                                  .join(", ")}
                              </div>
                            </div>
                            <div className="col-lg-2 col-md-2 col-2 max-[400px]:col-3 max-[400px]:ml-2 flex items-center content-center justify-evenly ">
                              <div className="max-[500px]:text-xs">
                                {tourDetails[header.id]
                                  ?.map((detail) => detail.tourTotalPrice)
                                  .join(", ")}
                                $
                              </div>
                            </div>
                            <div className="col-lg-2 col-md-2 col-2 max-[400px]:col-2 max-[400px]:ml-4 flex items-center content-center justify-evenly max-[500px]:text-xs ">
                              <div
                                className={`whitespace-nowrap max-[500px]:text-xs ${
                                  header.completed
                                    ? "color-active"
                                    : "color-stop"
                                }`}
                              >
                                {header.completed ? "Confirmed" : "Pending..."}
                              </div>
                            </div>
<div className="col-lg-2 col-md-2 col-3  max-[400px]:col-2    flex items-center content-center justify-evenly max-[400px]:ml-4 ">
                              <a href="#" style={{ display: "flex" }}>
                                <img src="/image/trash.png" alt="" />
                                <img src="/image/trash.png" alt="" />
                      
                              </a>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="col-12">
                        <p className="text-center py-4 text-red-600 font-bold">
                          No history
                        </p>
                      </div>
                    )}
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
                    {orderHotelHeader.length > 0 ? (
                      orderHotelHeader.map((header, index) => {
                        return (
                          <div
                            key={index}
                            className="border rounded-xl mt-3 pb-6"
                            style={{ boxShadow: "0 4px 4px 0 #7F7F7F" }}
                          >
                            <div className="close flex justify-end">
                              <img
                                className="w-10 h-10 mr-3 mt-2 cursor-pointer"
                                src="/image/close.jpg"
                                // onClick={() =>
                                //   handleDeleteCart(item.bookingCartId)
                                // }
                                alt=""
                              />
                            </div>
                            <div className="mx-5  mb-2 ">
                              <div className="flex justify-between">
                                <span className="font-semibold text-xl">
                                  {hotelDetails[header.id]
                                    ?.map((detail) => detail.roomName)
                                    .join(", ")}
                                </span>

                                {/* <Link
                                  className="mr-8"
                                  href={`/trekbooking/image360/${room.roomId}`}
                                >
                                  <img
src="/image/view3D.png"
                                    className="w-10 h-10"
                                    alt="view 3D"
                                  />
                                </Link> */}
                              </div>
                              <div className="row">
                                <div className="col-lg-4 col-md-12 ">
                                  {/* {images.length >= 2 ? (
                                    <Slider {...settings}>
                                      {images.map((image) => (
                                        <div
                                          key={image.roomImageId}
                                          className=""
                                        >
                                          <img
                                            className="w-3/4 h-60 border rounded-lg mx-auto"
                                            src={image.roomImageURL}
alt="room thumbnail"
                                          />
                                        </div>
                                      ))}
                                    </Slider>
                                  ) : (
                                    <img
                                      className="w-full h-60 border rounded-lg"
                                      src={images[0]?.roomImageURL}
                                      alt="room thumbnail"
                                    />
                                  )} */}
                                </div>

                                <div
                                  className="col-lg-8 col-md-12 border"
                                  style={{ borderRadius: "10px" }}
                                >
                                  <div className="row">
                                    <div className="col-4 border-r border-gray">
                                      <p
                                        className="text-center text-sm font-semibold pt-3"
                                        style={{ color: "#305A61" }}
                                      >
                                        Room information
                                      </p>
                                      <div className="w-3/4 m-auto">
                                        {new Date(
                                          header.checkInDate
                                        ).toLocaleDateString()}
                                      </div>
                                    </div>
                                    <div className="col-4 border-r border-gray">
                                      <p
                                        className="text-center text-sm font-semibold pt-3"
                                        style={{ color: "#305A61" }}
                                      >
                                        Room information
</p>
                                      <div className="w-3/4 m-auto">
                                        {new Date(
                                          header.checkOutDate
                                        ).toLocaleDateString()}
                                      </div>
                                    </div>
                                    <div
                                      className="col-4 border-r border-gray"
                                      style={{ height: "290px" }}
                                    >
                                      <p
                                        className="text-center text-sm font-semibold pt-3"
                                        style={{ color: "#305A61" }}
                                      >
                                        Convenient
                                      </p>
<div className="w-3/4 m-auto">
                                        <div className="flex items-center pb-1 ">
                                          <img
                                            className="w-2 h-2 mr-2"
                                            src="/image/tick.png"
                                            alt="tick"
                                          />
                                          <span className="font-medium text-xs">
                                            Lorem ipsum dolor sit
                                          </span>
                                        </div>
                                        <div className="flex items-center pb-1 ">
                                          <img
                                            className="w-2 h-2 mr-2"
                                            src="/image/tick.png"
                                            alt="tick"
                                          />
                                          <span className="font-medium text-xs">
                                            Lorem ipsum dolor sit
                                          </span>
                                        </div>
                                        <div className="flex items-center pb-1 ">
                                          <img
                                            className="w-2 h-2 mr-2"
                                            src="/image/tick.png"
                                            alt="tick"
                                          />
                                          <span className="font-medium text-xs">
                                            Lorem ipsum dolor sit
                                          </span>
                                        </div>
                                        <div className="flex items-center pb-1 ">
                                          <img
                                            className="w-2 h-2 mr-2"
src="/image/tick.png"
                                            alt="tick"
                                          />
                                          <span className="font-medium text-xs">
                                            Lorem ipsum dolor sit
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-4">
                                      <div className="row">
                                        <div className="col-6">
                                          <p
                                            className="text-center text-sm font-semibold pt-3"
                                            style={{ color: "#305A61" }}
                                          >
Guest(s)
                                          </p>
                                          {/* <div className="flex flex-wrap items-center pb-1 w-3/4 mx-auto">
                                            {Array.from({
                                              length: room.roomCapacity,
                                            }).map((_, i) => (
                                              <img
                                                key={i}
                                                className="w-4 h-4 m-1"
                                                src="/image/user.png"
                                                alt="guest"
                                              />
                                            ))}
                                          </div> */}
                                        </div>
                                        <div
                                          className="col-lg-6"
                                          style={{
                                            height: "356px",
                                            border: "1px solid #D9D9D9",
                                            borderRadius: "10px",
                                            backgroundColor: "#F5F5F5",
                                          }}
                                        >
                                          <div className="grid justify-items-center">
                                            <span
                                              className="text-center text-sm font-semibold pb-3 pt-3 "
                                              style={{ color: "#305A61" }}
                                            >
                                              Price
                                            </span>
                                            <span className="text-center text-xl font-bold pb-3 ">
                                              {/* {totalPrice}$ */}
                                            </span>
<span
                                              className="text-center text-xs font-light pb-3 md:mr-3"
                                              style={{ color: "#8E8D8A" }}
                                            >
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
                                                  // handleAddToCart(
                                                  //   item.roomId,
                                                  //   item.hotelId
                                                  // );
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
      </div>
    </>
  );
};
export default Booking_History;