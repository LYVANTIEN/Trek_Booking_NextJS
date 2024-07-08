"use client";
import React, { useEffect, useState } from "react";
import "../../../../public/css/dashboard.css";
import PieChartGG from "../../components/Dashboard/PieChartGG";
import DonutChart from "../../components/Dashboard/DonutChart";
import LineChartGG from "../../components/Dashboard/LineChartGG";
import LineChartGGTour from "../../components/Dashboard/LineChartGGTour";
import orderHotelHeaderService from "@/app/services/orderHotelHeaderService";
import orderTourHeaderService from "@/app/services/orderTourHeaderService";

const DashBoard = () => {
  const [count, setCount] = useState<number | null>(null);
  const [countTour, setCountTour] = useState<number | null>(null);
  const [percent, setPercent] = useState<number | null>(null);
  const [percentTour, setPercentTour] = useState<number | null>(null);
  const [totalRevenueHotel, setTotalRevenueHotel] = useState<number | null>(
    null
  );
  const [totalRevenueTour, setTotalRevenueTour] = useState<number | null>(null);
  const [percentRevenueHotel, setPercentRevenueHotel] = useState<number | null>(
    null
  );
  const [percentRevenueTour, setPercentRevenueTour] = useState<number | null>(
    null
  );

  useEffect(() => {
    const fetchCount = async () => {
      try {
        const data =
          await orderHotelHeaderService.countTotalOrderHotelBySupplierId();
        setCount(data);
        const percentChange =
          await orderHotelHeaderService.getPercentChangeFromLastWeek();
        setPercent(percentChange);
        const totalRevenueHotel =
          await orderHotelHeaderService.getTotalRevenueHotelBySupplierId();
        setTotalRevenueHotel(totalRevenueHotel);
        const percentRevenueHotel =
          await orderHotelHeaderService.getPercentChangeRevenueFromLastWeek();
        setPercentRevenueHotel(percentRevenueHotel);
        const count =
          await orderTourHeaderService.countTotalOrderTourBySupplierId();
        setCountTour(count);
        const percentTourChange =
          await orderTourHeaderService.getPercentChangeTourFromLastWeek();
        setPercentTour(percentTourChange);
        const totalRevenueTour =
          await orderTourHeaderService.getTotalRevenueTourBySupplierId();
        setTotalRevenueTour(totalRevenueTour);
        const percentRevenueTour =
          await orderTourHeaderService.getPercentChangeRevenueTourFromLastWeek();
        setPercentRevenueTour(percentRevenueTour);
      } catch (error) {
        console.error("Failed to fetch revenue data", error);
      }
    };

    fetchCount();
  }, []);
  return (
    <>
      <link
        href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
        rel="stylesheet"
      />
      <div className="relative">
        <div className="table-hotel1 max-[768px]:w-100 pt-8">
          <div className="row pb-4">
            <div className="col-lg-3 col-6 max-[992px]:mb-4">
<div className="card radius-10 border-start border-0 border-3 border-info">
                <div className="card-body">
                  <div className="d-flex align-items-center">
                    <div>
                      <p className="mb-0 text-secondary">Total Hotel Orders</p>
                      <h4 className="my-1 text-info">
                        {count !== null ? count : "No order yet..."}
                      </h4>
                      {percent !== null ? (
                        <p className="mb-0 font-13">
                          {`${percent > 0 ? "+" : ""}${
                            Number.isInteger(percent)
                              ? percent
                              : percent.toFixed(1).replace(".", ",")
                          }% from last week`}
                        </p>
                      ) : (
                        <p className="mb-0 font-13">Loading...</p>
                      )}
                    </div>
                    <div className="widgets-icons-2 rounded-circle bg-gradient-scooter text-white ms-auto">
                      <i className="fa fa-shopping-cart"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-6">
              <div className="card radius-10 border-start border-0 border-3 border-danger">
                <div className="card-body">
                  <div className="d-flex align-items-center">
                    <div>
                      <p className="mb-0 text-secondary">Total Hotel Revenue</p>
                      <h4 className="my-1 text-danger">
                        $
                        {totalRevenueHotel !== null
                          ? totalRevenueHotel
                          : "No revenue yet..."}
                      </h4>

                      {percentRevenueHotel !== null ? (
                        <p className="mb-0 font-13">
                          {`${percentRevenueHotel > 0 ? "+" : ""}${
                            Number.isInteger(percentRevenueHotel)
                              ? percentRevenueHotel
                              : percentRevenueHotel.toFixed(1).replace(".", ",")
                          }% from last week`}
                        </p>
                      ) : (
                        <p className="mb-0 font-13">Loading...</p>
                      )}
                    </div>
                    <div className="widgets-icons-2 rounded-circle bg-gradient-bloody text-white ms-auto">
                      <i className="fa fa-dollar"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-6">
              <div className="card radius-10 border-start border-0 border-3 border-success">
                <div className="card-body">
                  <div className="d-flex align-items-center">
                    <div>
<p className="mb-0 text-secondary">Total Tour Orders</p>
                      <h4 className="my-1 text-success">
                        {countTour !== null ? countTour : "No order yet..."}
                      </h4>

                      {percentTour !== null ? (
                        <p className="mb-0 font-13">
                          {`${percentTour > 0 ? "+" : ""}${
                            Number.isInteger(percentTour)
                              ? percentTour
                              : percentTour.toFixed(1).replace(".", ",")
                          }% from last week`}
                        </p>
                      ) : (
                        <p className="mb-0 font-13">Loading...</p>
                      )}
                    </div>
                    <div className="widgets-icons-2 rounded-circle bg-gradient-ohhappiness text-white ms-auto">
                      <i className="fa fa-shopping-cart"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-6">
              <div className="card radius-10 border-start border-0 border-3 border-warning">
                <div className="card-body">
                  <div className="d-flex align-items-center">
                    <div>
                      <p className="mb-0 text-secondary">Total Tour Revenue</p>
                      <h4 className="my-1 text-warning">
                        $
                        {totalRevenueTour !== null
                          ? totalRevenueTour
                          : "No revenue yet..."}
                      </h4>
                      {percentRevenueTour !== null ? (
                        <p className="mb-0 font-13">
                          {`${percentRevenueTour > 0 ? "+" : ""}${
                            Number.isInteger(percentRevenueTour)
                              ? percentRevenueTour
                              : percentRevenueTour.toFixed(1).replace(".", ",")
                          }% from last week`}
                        </p>
                      ) : (
                        <p className="mb-0 font-13">Loading...</p>
                      )}
                    </div>
                    <div className="widgets-icons-2 rounded-circle bg-gradient-blooker text-white ms-auto">
                      <i className="fa fa-dollar"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row  pb-4 ml-1 max-[768px]:ml-0">
            <div className="col-lg-6 col-md-6 col-12 max-[768px]:mb-4">
              <LineChartGG  />
            </div>
            <div className=" col-lg-5 col-md-6 col-12 ml-4 max-[768px]:ml-0  ">
              <DonutChart />
            </div>
          </div>
          <div className="row  ml-1 max-[768px]:ml-0">
            <div className=" col-lg-6 col-md-6  col-12 max-[768px]:mb-4">
              <LineChartGGTour />
            </div>
            <div className="col-lg-5 col-md-6 col-12  ml-4 max-[768px]:ml-0 ">
          <PieChartGG />
            </div>
          </div>
          <div className="row chart-row">
            <div className="card chart-card">
              {/* <LineChart
                xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
                series={[
                  {
                    data: [2, 5.5, 2, 8.5, 1.5, 5],
                  },
                ]}
                width={500}
                height={450}
              /> */}
            </div>
            <div className="card chart-card">{/* <PieChartGG /> */}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashBoard;