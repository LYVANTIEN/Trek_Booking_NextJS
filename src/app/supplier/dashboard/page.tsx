// my-new-page.js
"use client";
import React, { useState } from "react";
import Table from "../../../../node_modules/react-bootstrap/esm/Table";
import Head from "next/head";
import { FaArrowUp, FaChartBar } from "react-icons/fa";
import { BarChart } from "@mui/x-charts/BarChart";
import { LineChart, PieChart } from "@mui/x-charts";
import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";
const DashBoard = () => {
  return (
    <>
      <div className="relative">
        <div className="table-hotel pt-8">
          {/* <div className="card-body">
            <Head>
              <title>Traffic Card</title>
              <link
                rel="stylesheet"
                href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
                integrity="sha384-1e3cfb72d5e8c4efc6b6b1a4cbf4e4a32c37f8eaa7e78d7c2735a0c1f4d8a4a1"
                crossOrigin="anonymous"
              />
            </Head>
            <div className="row">
              <div className="col">
                <h5 className="text-uppercase text-muted mb-0 card-title">
                  Traffic
                </h5>
                <span className="h2 font-weight-bold mb-0">350,897</span>
              </div>
              <div className="col-auto col">
                <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                  <FaChartBar />
                </div>
              </div>
            </div>
            <p className="mt-3 mb-0 text-muted text-sm">
              <span className="text-success mr-2">
                <FaArrowUp /> 3.48%
              </span>{" "}
              <span className="text-nowrap">Since last month</span>
            </p>
          </div> */}
          <div style={{ display: "flex" }}>
            <BarChart
              series={[
                { data: [35, 44, 24, 34] },
                { data: [51, 6, 49, 30] },
                { data: [15, 25, 30, 50] },
                { data: [60, 50, 15, 25] },
              ]}
              height={290}
              xAxis={[{ data: ["Q1", "Q2", "Q3", "Q4"], scaleType: "band" }]}
              margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
            />
          </div>
          <div>
            <BarChart
              series={[
                { data: [3, 4, 1, 6, 5], stack: "A", label: "Series A1" },
                { data: [4, 3, 1, 5, 8], stack: "A", label: "Series A2" },
                { data: [4, 2, 5, 4, 1], stack: "B", label: "Series B1" },
                { data: [2, 8, 1, 3, 1], stack: "B", label: "Series B2" },
                { data: [10, 6, 5, 8, 9], label: "Series C1" },
              ]}
              width={600}
              height={350}
            />
          </div>
          <div>
            <PieChart
              series={[
                {
                  data: [
                    { id: 0, value: 10, label: "series A" },
                    { id: 1, value: 15, label: "series B" },
                    { id: 2, value: 20, label: "series C" },
                    { id: 3, value: 20, label: "series C" },
                    { id: 4, value: 20, label: "series C" },
                    { id: 5, value: 20, label: "series C" },
                  ],
                },
              ]}
              width={600}
              height={300}
            />
          </div>
          <div>
            <LineChart
              xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
              series={[
                {
                  data: [2, 5.5, 2, 8.5, 1.5, 5],
                },
              ]}
              width={500}
              height={300}
            />
          </div>
          {/* <div>
            <Gauge
              value={66}
              startAngle={-110}
              endAngle={110}
              sx={{
                [`& .${gaugeClasses.valueText}`]: {
                  fontSize: 40,
                  transform: "translate(0px, 0px)",
                },
              }}
              text={({ value, valueMax }) => `${value} / ${valueMax}`}
            />
          </div> */}
        </div>
      </div>
    </>
  );
};

export default DashBoard;
