'use client'
import Rates from '@/app/components/Rates'
import React, { useState } from 'react'
import Slider from 'react-slick'
import Link from '../../../../node_modules/next/link'
import "../../../../public/css/styles.css"
const page = () => {
    const [showPopup, setShowPopup] = useState(false); 
    const [showRate, setShowRate] = useState<boolean>(false);

    const handleClosePopup = () => {
        setShowPopup(false);
      };
  return (
    <div>
        <div className="history-title">
        <div className="container ">
            <h3 className='text-fuchsia-50 pb-3 pt-3'>History</h3>
        </div>
        </div>
       <div className="backgr-home">
         <div className="container pt-3">
            <h4 className='color-primary font-bold'>Can Tho</h4>
            <p className='color-black'>August 26, 2023 – August 27, 2023</p>

            <div
                  className="border rounded-xl mt-3 backgr-fffff"
                  style={{ boxShadow: "0 4px 4px 0 #7F7F7F" }}
                >
                  <div className="mx-5 mt-4 mb-2">
                    <div className="flex justify-between">
                      <span className="font-semibold text-xl">
                       khach san
                      </span>
                      <Link className="mr-8" href="#">
                        <img
                          src="/image/view3D.png"
                          className="w-10 h-10"
                          alt="view 3D"
                        />
                      </Link>
                    </div>
  
                    <div className="row">
                      <div className="col-lg-4 col-md-12">
                              <div>
                                <img
                                  className="w-full h-60 border rounded-lg"
                                  src="/image/home1.png"
                                  alt="room thumbnail"
                                />
                              </div>
                     
                      </div>
  
                      <div className="col-lg-8 col-md-12 border " style={{ borderRadius: "10px" }}>
                        <div className="row">
                          <div className="col-4 border-r border-gray" >
                            <p className="text-center text-sm font-semibold pt-3" style={{ color: "#305A61" }}>
                              Room information
                            </p>
                            <div className="w-3/4 m-auto">
                              hay
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
                      
                                <img  className="w-4 h-4 m-1" src="/image/user.png" alt="guest" />
                       
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
                                   3000$
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

                  <div className="border">
                    <div className="row py-8 text-center">
                        <div className="col-4 border-r-2">
                     
                       <p className='font-bold'>Guest information</p>
                       <p>David</p>
                   
                        </div>
                       
                        <div className="col-4 border-r-2">
                        <p className='font-bold'>Check-in & check-out</p>
                       <p>August 26, 2023 – August 27, 2023</p>
                            </div>
                            <div className="col-4">
                            <p className='font-bold'>Payment</p>
                       <p>Pay by credit card</p>
                            </div>
                    </div>
                  </div>
                  
                </div>

                <div className="row pt-6 pb-6">
                    <div className="button-rate flex justify-end pr-16">
                        <button className='rated'     onClick={() => setShowRate(true)}>Rated</button>
                        <button className='buyagain'>Buy again</button>
                    </div>
                  </div>
         </div>
       </div>
       <Rates
        showRate={showRate}
        setShowRate={setShowRate}
      />
    </div>
  )
}

export default page