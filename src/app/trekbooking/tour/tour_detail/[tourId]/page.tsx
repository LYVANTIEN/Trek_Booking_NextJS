"use client";
import { useEffect, useState } from "react";
import tourService from "@/app/services/tourService";
import { ITour } from "@/app/entities/tour";
import useSWR, { mutate } from "swr";

const fetchTourImages = async (
  tourId: number,
  setTourImages: (images: string[]) => void
) => {
  const images = await tourService.getTourImageByTourId(tourId);
  const imageUrls = images.map((image: ITourImage) => image.tourImageURL);
  setTourImages(imageUrls);
};

const TourDetail = ({ params }: { params: { tourId: string } }) => {
  const [tour, setTour] = useState<ITour | null>(null);
  const [tourImages, setTourImages] = useState<string[]>([]);

  const { data: tourDetail } = useSWR(`tour_detail/${params.tourId}`, () =>
    tourService.getTourById(Number(params.tourId))
  );

  useEffect(() => {
    if (tourDetail) {
      setTour(tourDetail);
      fetchTourImages(Number(params.tourId), setTourImages);
    }
  }, [tourDetail, params.tourId]);

  useEffect(() => {
    const interval = setInterval(async () => {
      if (tourDetail) {
        await fetchTourImages(Number(params.tourId), setTourImages);
        mutate(`tour_detail/${params.tourId}`);
      }
    }, 1000); // Kiểm tra thay đổi mỗi 1 giây

    return () => clearInterval(interval); // Xóa interval để tránh rò rỉ bộ nhớ
  }, [tourDetail, params.tourId]);

  if (!tour) {
    return <div>Loading...</div>;
  }
  const tourTime = new Date(tour.tourTime);
  const formattedTime = tourTime.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  const formattedDate = tourTime.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return (
    <div>
      <div className="backgr-home">
        <nav className="to-white pt-2 pb-2">
          <ul className="flex ul-menu">
            <li className="li-menu hover-bold">
              <a
                href=""
                className="font-bold text-decoration-none link-style "
                style={{ color: "#305A61" }}
              >
                Home
              </a>
            </li>
            <li className="li-menu hover-bold">
              <a
                href=""
                className="font-bold text-decoration-none"
                style={{ color: "#1F1C17" }}
              >
                Hotel
              </a>
            </li>
            <li className="li-menu hover-bold">
              <a
                href=""
                className="font-bold text-decoration-none"
                style={{ color: "#1F1C17" }}
              >
                Attractions
              </a>
            </li>
            <li className="li-menu hover-bold none-t">
              <a
                href=""
                className="font-bold text-decoration-none"
                style={{ color: "#1F1C17" }}
              >
                Gift Voucher
              </a>
            </li>
          </ul>
        </nav>
        <div className="container pb-4">
          <p className="color-primary font-semibold pb-4">
            Home / Attractions / Phu Quoc / {tour.tourName}
          </p>
          <div className="border-tour-detail">
            <h3>{tour.tourName}</h3>
            <div className="time-location flex pb-2">
              <div className="time-fe flex">
                <img className="w-5 h-5" src="/image/calendar.png" alt="" />
                <p className="ml-1">
                  {formattedTime} - {formattedDate}
                </p>
              </div>
              <div className="location-fe flex ml-4">
                <img className="w-5 h-5" src="/image/map.png" alt="" />
                <p className="ml-1">{tour.tourAddress}</p>
              </div>
            </div>
            <div className="row pb-6">
              <div className="col-lg-6 pb-3">
                <img src={tourImages[0] || "/image/tourdetail1.png"} alt="" />
              </div>
              <div className="col-lg-6">
                <div className="row">
                  <div className="col-12 pb-3">
                    <img
                      src={tourImages[1] || "/image/tourdetail2.png"}
                      alt=""
                    />
                  </div>
                  <div className="col-12 flex  pb-3">
                    <img
                      className="w-1/2"
                      src={tourImages[2] || "/image/tourdetail3.png"}
                      alt=""
                    />
                    <img
                      className="w-1/2"
                      src={tourImages[3] || "/image/tourdetail4.png"}
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default TourDetail;
