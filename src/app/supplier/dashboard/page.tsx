// my-new-page.js
"use client";
import React, { useState } from "react";
import Table from "../../../../node_modules/react-bootstrap/esm/Table";
import Head from "next/head";
import { FaArrowUp, FaChartBar } from "react-icons/fa";

const DashBoard = () => {
  return (
    <div className="relative">
      <div className="table-hotel pt-8">
        <div className="card-body">
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
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
