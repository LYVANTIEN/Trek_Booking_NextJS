"use client";
import React, { useEffect, useState } from "react";
import "../../../../public/css/tour.css";
import { ITour } from "@/app/entities/tour";
import useSWR, { mutate } from "swr";
import tourService from "@/app/services/tourService";
import Link from "next/link";
import "../../../../public/css/styles.css";

const fetchTourImages = async (
  tourList: ITour[],
  setTourImages: (images: { [key: number]: string }) => void
) => {
  const images = await Promise.all(
    tourList.map(async (tour: ITour) => {
      const image = await tourService.getTourImageByTourId(tour.tourId);
      if(image.length > 0) {
        return { tourId: tour.tourId, imageUrl: image[0].tourImageURL };
      } else {
        return { tourId: tour.tourId, imageUrl: "/image/tour.png" };
      } // Assuming image[0] is the correct image
    })
  );

  const imageMap = images.reduce<{ [key: number]: string }>(
    (acc, { tourId, imageUrl }) => {
      acc[tourId] = imageUrl;
      return acc;
    },
    {}
  );

  setTourImages(imageMap);
};
const TourList = () => {
  const [tourImages, setTourImages] = useState<{ [key: number]: string }>({});
  const { data: tourList, error } = useSWR("tourList", tourService.getTours);

  useEffect(() => {
    if (tourList) {
      fetchTourImages(tourList, setTourImages);
    }
  }, [tourList]);

  const handleImageChange = async () => {
    if (tourList) {
      await fetchTourImages(tourList, setTourImages);
      mutate("tourList");
    }
  };
  useEffect(() => {
    const interval = setInterval(handleImageChange, 1000); //Kiểm tra thay đổi hình ảnh mỗi 1000mili giây
    return () => clearInterval(interval); // Xóa interval để tránh rò rỉ bộ nhớ
  }, [tourList]);

  if (!tourList) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading tours</div>;
  }  
  return (
    <div>
      <nav className="to-white pt-2 pb-2">
        <ul className="flex ul-menu">
          <li className="li-menu hover-bold">
            <a href="" className="font-bold text-decoration-none  color-black">
              Home
            </a>
          </li>
          <li className="li-menu hover-bold">
            <a href="" className="font-bold text-decoration-none color-black">
              Hotel
            </a>
          </li>
          <li className="li-menu hover-bold">
            <a
              href=""
              className="font-bold text-decoration-none link-style color-primary"
            >
              Attractions
            </a>
          </li>
          <li className="li-menu hover-bold none-t">
            <a href="" className="font-bold text-decoration-none color-black">
              Gift Voucher
            </a>
          </li>
        </ul>
      </nav>
      <div className="container">
        <div className="container">
          <p className="color-primary font-bold cursor-pointer">
            Home / Attractions / Phu Quoc
          </p>
        </div>
        <div className="row ">
          <div className="col-lg-3 col-md-3 col-12 ">
            <div className="border-tour">
              <p className="color-black font-bold">Price Range</p>
              <p className="color-black">0 US$ - 170 US$</p>
              <img className="mleft-8" src="/image/filtertour.png" alt="" />
            </div>
          </div>
          <div className="col-lg-9 col-md-9 col-12 fix-768-tour">
            <div className="row">
              {tourList.length > 0 ? (
                tourList.map((item: ITour, index) => {
                  const tourTimeDate = new Date(item.tourTime);
                  const formattedTourTime = tourTimeDate.toLocaleDateString(
                    "en-US",
                    {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    }
                  );
                  const newPrice =
                    item.tourPrice - (item.tourPrice * item.tourDiscount) / 100;
                  return (
                    <div
                      key={index}
                      className="col-lg-4 pb-9 col-md-4 hover-tour cursor-pointer">
                        <Link href={`/trekbooking/tour/tour_detail/${item.tourId}`} className="fix-link">                        
                        <div className="block-tour">                                                                                          
                          <div className="img-tour">
                          <img
                            src={tourImages[item.tourId] || "/image/tour.png"}
                            className="w-100"
                            alt="Tour"
                          />
                           </div>                   
                        <div className="content-tour">
                          <p className="color-black font-bold pt-2">
                            {item.tourName}
                          </p>
                          <div className="flex">
                            <p className="text-gach font-bold pr-10">
                              {item.tourPrice}US$
                            </p>
                            <p>{newPrice}US$</p>
                          </div>
                          <div className="row pb-2">
                            <div className="time flex cursor-pointer col-lg-4 col-md-12 col-sm-4 col-4">
                              <img
                                className="w-5 h-5"
                                src="/image/calendartour.png"
                                alt="Calendar"
                              />
                              <p className="color-black ml-1 font-bold">
                                {formattedTourTime}
                              </p>
                            </div>
                            <div className="vitri flex cursor-pointer col-lg-4 col-md-12 col-sm-4 col-4">
                              <img
                                className="w-5 h-5"
                                src="/image/uptour.png"
                                alt="Location"
                              />
                              <p className="color-black ml-1 font-bold">
                                {item.tourAddress}
                              </p>
                            </div>
                            <div className="vitri flex cursor-pointer col-lg-4 col-md-12 col-sm-4 col-4">
                              <img
                                className="w-5 h-5"
                                src="/image/user.png"
                                alt="Capacity"
                              />
                              <p className="color-black ml-1 font-bold">
                                {item.tourCapacity}
                              </p>
                            </div>
                          </div>
                        </div>                        
                        </div>
                        </Link>
                    </div>
                  );
                })
              ) : (
                <div>No tours found</div>
              )}
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <p className="font-bold mr-4 text-xl cursor-pointer">1</p>
          <p className="font-bold mr-4 text-xl cursor-pointer">2</p>
          <p className="font-bold mr-4 text-xl cursor-pointer">3</p>
          <img
            className="w-3 h-4 mg-t-6 cursor-pointer"
            src="/image/righttour.png"
            alt="Next"
          />
        </div>
      </div>
    </div>
  );
};

export default TourList;
