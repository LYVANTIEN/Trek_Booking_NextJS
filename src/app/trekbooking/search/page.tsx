'use client'
import React from 'react'
import Searchcart from '../../components/searchcart'
import "../../../../public/css/search.css";

const page = () => {
  return (
 <div className="">
     <nav className="to-white pt-2 pb-2">
          <ul className="flex ul-menu">
            <li className="li-menu hover-bold">
              <a
                href=""
                className="font-bold text-decoration-none  "
                style={{ color: "#1F1C17" }}
              >
                Home
              </a>
            </li>
            <li className="li-menu hover-bold">
              <a href="" className="font-bold text-decoration-none link-style" style={{ color: "" }}>
                Hotel
              </a>
            </li>
            <li className="li-menu hover-bold">
              <a href="" className="font-bold text-decoration-none" style={{ color: "#1F1C17" }}>
                Attractions
              </a>
            </li>
            <li className="li-menu hover-bold none-t">
              <a href="" className="font-bold text-decoration-none" style={{ color: "#1F1C17" }}>
                Gift Voucher
              </a>
            </li>
          </ul>
        </nav>
      <div className="img-bk-search">
       
        <Searchcart />
       
      </div>
        <div className="content-search backgr-home pb-12 pt-20">
          <div className="container">
            <div className="row pb-10">
              <div className="col-3">

              </div>
              <div className="col-9">
                <button className='villa-button padding ml-3' >Villas</button>
                <button className='apartment-button ml-3 padding' >Apartments</button>
                <button className='xtra-button ml-3 padding  dis0none'>Xtra Deals</button>
    
                </div>
            </div>
            <div className="row ">
              <div className="col-lg-3  col-md-4 col-12  border-filter">
                <p className='text-center text-2xl  pb-8 font-bold color-black' >Filters</p>
                <div className="range">
                  <p className='font-bold color-black'  >Price Range</p>
                  <p  className='color-black'>0 US$ - 170 US$</p>
                  <div className="search-filter  pb-4">
                    <img src="/image/searchfilter.png" alt="" />
                  </div>
                  <div className="start flex justify-between ">
                    <p className='font-bold '>Star Rating</p>
                    <img className='h-5 w-5 cursor-pointer'  src="/image/down.png " alt="" />
                  </div>
                  <div className="input-star flex pb-8">
                    <input type="checkbox" className='h-5'/>
                    <img  className=' input-star' src="/image/star.png" alt="" />
                  </div>
                  <div className="input-star flex  pb-8">
                    <input type="checkbox" className='h-5' />
                    <img  className=' input-star' src="/image/star.png" alt="" />
                    <img  className=' input-star' src="/image/star.png" alt="" />
                  </div>
                  <div className="input-star flex pb-8">
                    <input type="checkbox" className='h-5' />
                    <img  className=' input-star' src="/image/star.png" alt="" />
                    <img  className=' input-star' src="/image/star.png" alt="" />
                    <img  className=' input-star' src="/image/star.png" alt="" />
                  </div>
                  <div className="input-star flex pb-8">
                    <input type="checkbox" className='h-5' />
                    <img  className=' input-star' src="/image/star.png" alt="" />
                    <img  className=' input-star' src="/image/star.png" alt="" />
                    <img  className=' input-star' src="/image/star.png" alt="" />
                    <img  className=' input-star' src="/image/star.png" alt="" />
                  </div>
                  <div className="input-star flex pb-8">
                    <input type="checkbox"  className='h-5' />
                    <img  className=' input-star' src="/image/star.png" alt="" />
                    <img  className=' input-star' src="/image/star.png" alt="" />
                    <img  className=' input-star' src="/image/star.png" alt="" />
                    <img  className=' input-star' src="/image/star.png" alt="" />
                    <img  className=' input-star' src="/image/star.png" alt="" />

                  </div>
                </div>
                <div className="pb-4">
                <div className="start flex justify-between ">
                    <p className='font-bold '>Facilities</p>
                    <img className='h-5 w-5 cursor-pointer'  src="/image/down.png " alt="" />
                  </div>
                  <div className="input-star flex pb-8">
                    <input type="checkbox" className='h-5'/>
                   <p className='text-faci'>Parking</p>
                  </div>
                  <div className="input-star flex pb-8">
                    <input type="checkbox" className='h-5'/>
                   <p className='text-faci'>Elevator</p>
                  </div>
                  <div className="input-star flex pb-8">
                    <input type="checkbox" className='h-5'/>
                   <p className='text-faci'>Restaurant</p>
                  </div>
                  <div className="input-star flex pb-8">
                    <input type="checkbox" className='h-5'/>
                   <p className='text-faci'>Fitness</p>
                  </div>
                  <div className="input-star flex pb-8">
                    <input type="checkbox"  className='h-5'/>
                   <p className='text-faci'>Wifi</p>
                  </div>
                </div>
                <div className="pb-4">
                <div className="start flex justify-between ">
                    <p className='font-bold '>Facilities</p>
                    <img className='h-5 w-5 cursor-pointer'  src="/image/down.png " alt="" />
                  </div>
                  <div className="input-star flex pb-8">
                    <input type="checkbox" className='h-5'/>
                   <p className='text-faci'>Parking</p>
                  </div>
                  <div className="input-star flex pb-8">
                    <input type="checkbox" className='h-5'/>
                   <p className='text-faci'>Elevator</p>
                  </div>
                  <div className="input-star flex pb-8">
                    <input type="checkbox" className='h-5'/>
                   <p className='text-faci'>Restaurant</p>
                  </div>
                  <div className="input-star flex pb-8">
                    <input type="checkbox" className='h-5'/>
                   <p className='text-faci'>Fitness</p>
                  </div>
                  <div className="input-star flex pb-8">
                    <input type="checkbox"  className='h-5'/>
                   <p className='text-faci'>Wifi</p>
                  </div>
                </div>
                <div className="pb-4">
                <div className="start flex justify-between ">
                    <p className='font-bold '>Facilities</p>
                    <img className='h-5 w-5 cursor-pointer'  src="/image/down.png " alt="" />
                  </div>
                  <div className="input-star flex pb-8">
                    <input type="checkbox" className='h-5'/>
                   <p className='text-faci'>Parking</p>
                  </div>
                  <div className="input-star flex pb-8">
                    <input type="checkbox" className='h-5'/>
                   <p className='text-faci'>Elevator</p>
                  </div>
                  <div className="input-star flex pb-8">
                    <input type="checkbox" className='h-5'/>
                   <p className='text-faci'>Restaurant</p>
                  </div>
                  <div className="input-star flex pb-8">
                    <input type="checkbox" className='h-5'/>
                   <p className='text-faci'>Fitness</p>
                  </div>
                  <div className="input-star flex pb-8">
                    <input type="checkbox"  className='h-5'/>
                   <p className='text-faci'>Wifi</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-9 col-md-8 col-12  pl-32px">
                <div className="row  pb-8">
                  <div className="col-4 bk-white">
                  <div className="img-big pb-2">
            <img src="/image/imgcart1.png" alt="" />
          </div>
          <div className="img-small flex">
          <img className='w-100-768' src="/image/imgcart2.png" alt="" />
          <img className='ml-2  none-768' src="/image/imgcart3.png" alt="" />
          <img className='ml-2 w992-none' src="/image/imagecart4.png" alt="" />
          </div>
                  </div>
                  <div className="col-5 bk-white">
                    <p className='font-bold pt-6 color-black'>Cereja Hotel & Resort Dalat</p>
                    <div className="review flex">
                      <p className=' color-primary disnone'>Hotels</p>
                      <img  className=' star' src="/image/star.png" alt="" />
                      <img  className=' star' src="/image/star.png" alt="" />
                      <img  className=' star' src="/image/star.png" alt="" />
                      <img  className=' star' src="/image/star.png" alt="" />
                      <img  className=' star' src="/image/star.png" alt="" />
                      <p style={{color:"#8E8D8A"}} className='ml-3 disnone'>1k reviews</p>
                    </div>
                    <div className="flex">
                      <img className='w-5 h-5' src="/image/map.png" alt="" />
                      <p className='ml-3 color-black'>Ward 3, Da Lat</p>
                    </div>
                    <p className='font-bold color-primary' >Economy Double Room</p>
                    <div className="flex">
                      <img className='w-3 h-3 mt-2' src="/image/check1.png" alt="" />
                      <p className='ml-2 color-black'>Lorem ipsum dolor sit</p>
                    </div>
                    <div className="flex">
                      <img className='w-3 h-3 mt-2' src="/image/check1.png" alt="" />
                      <p className='ml-2 color-black'>Lorem ipsum dolor sit</p>
                    </div>
                    <div className="flex">
                      <img className='w-3 h-3 mt-2' src="/image/check1.png" alt="" />
                      <p className='ml-2 color-black'>Lorem ipsum dolor sit</p>
                    </div>
                    <div className="flex">
                      <img className='w-3 h-3 mt-2' src="/image/check1.png" alt="" />
                      <p className='ml-2 color-black'>Lorem ipsum dolor sit</p>
                    </div>
                    </div> 
                    <div className="col-3 bk-white bk-en">
                     <div className="text-center pt-8">
                       <p className='text-xl color-primary font-bold '>Holiday sale</p>
                        <p style={{color:"#8E8D8A"}}>1 night, 2 adults</p>
                        <p className='font-bold decor text-2xl' style={{color: "#8E8D8A"}}>45US$</p>
                        <p className='color-black font-bold text-2xl'>35US$</p>
                        <p style={{color:"#8E8D8A"}}>Exclude taxes & fees</p>
                        <button className='button-success'>Select room</button>
                     </div>
                    </div>
                </div>
                 

                 {/* --text--- */}
                 <div className="row  pb-8">
                  <div className="col-4 bk-white">
                  <div className="img-big pb-2">
            <img src="/image/imgcart1.png" alt="" />
          </div>
          <div className="img-small flex">
          <img className='w-100-768' src="/image/imgcart2.png" alt="" />
          <img className='ml-2  none-768' src="/image/imgcart3.png" alt="" />
          <img className='ml-2 w992-none' src="/image/imagecart4.png" alt="" />
          </div>
                  </div>
                  <div className="col-5 bk-white">
                    <p className='font-bold pt-6 color-black'>Cereja Hotel & Resort Dalat</p>
                    <div className="review flex">
                      <p className=' color-primary disnone'>Hotels</p>
                      <img  className=' star' src="/image/star.png" alt="" />
                      <img  className=' star' src="/image/star.png" alt="" />
                      <img  className=' star' src="/image/star.png" alt="" />
                      <img  className=' star' src="/image/star.png" alt="" />
                      <img  className=' star' src="/image/star.png" alt="" />
                      <p style={{color:"#8E8D8A"}} className='ml-3 disnone'>1k reviews</p>
                    </div>
                    <div className="flex">
                      <img className='w-5 h-5' src="/image/map.png" alt="" />
                      <p className='ml-3 color-black'>Ward 3, Da Lat</p>
                    </div>
                    <p className='font-bold color-primary' >Economy Double Room</p>
                    <div className="flex">
                      <img className='w-3 h-3 mt-2' src="/image/check1.png" alt="" />
                      <p className='ml-2 color-black'>Lorem ipsum dolor sit</p>
                    </div>
                    <div className="flex">
                      <img className='w-3 h-3 mt-2' src="/image/check1.png" alt="" />
                      <p className='ml-2 color-black'>Lorem ipsum dolor sit</p>
                    </div>
                    <div className="flex">
                      <img className='w-3 h-3 mt-2' src="/image/check1.png" alt="" />
                      <p className='ml-2 color-black'>Lorem ipsum dolor sit</p>
                    </div>
                    <div className="flex">
                      <img className='w-3 h-3 mt-2' src="/image/check1.png" alt="" />
                      <p className='ml-2 color-black'>Lorem ipsum dolor sit</p>
                    </div>
                    </div> 
                    <div className="col-3 bk-white bk-en">
                     <div className="text-center pt-8">
                       <p className='text-xl color-primary font-bold '>Holiday sale</p>
                        <p style={{color:"#8E8D8A"}}>1 night, 2 adults</p>
                        <p className='font-bold decor text-2xl' style={{color: "#8E8D8A"}}>45US$</p>
                        <p className='color-black font-bold text-2xl'>35US$</p>
                        <p style={{color:"#8E8D8A"}}>Exclude taxes & fees</p>
                        <button className='button-success'>Select room</button>
                     </div>
                    </div>
                </div>

   {/* --text--- */}
   <div className="row  pb-8">
                  <div className="col-4 bk-white">
                  <div className="img-big pb-2">
            <img src="/image/imgcart1.png" alt="" />
          </div>
          <div className="img-small flex">
          <img className='w-100-768' src="/image/imgcart2.png" alt="" />
          <img className='ml-2  none-768' src="/image/imgcart3.png" alt="" />
          <img className='ml-2 w992-none' src="/image/imagecart4.png" alt="" />
          </div>
                  </div>
                  <div className="col-5 bk-white">
                    <p className='font-bold pt-6 color-black'>Cereja Hotel & Resort Dalat</p>
                    <div className="review flex">
                      <p className=' color-primary disnone'>Hotels</p>
                      <img  className=' star' src="/image/star.png" alt="" />
                      <img  className=' star' src="/image/star.png" alt="" />
                      <img  className=' star' src="/image/star.png" alt="" />
                      <img  className=' star' src="/image/star.png" alt="" />
                      <img  className=' star' src="/image/star.png" alt="" />
                      <p style={{color:"#8E8D8A"}} className='ml-3 disnone'>1k reviews</p>
                    </div>
                    <div className="flex">
                      <img className='w-5 h-5' src="/image/map.png" alt="" />
                      <p className='ml-3 color-black'>Ward 3, Da Lat</p>
                    </div>
                    <p className='font-bold color-primary' >Economy Double Room</p>
                    <div className="flex">
                      <img className='w-3 h-3 mt-2' src="/image/check1.png" alt="" />
                      <p className='ml-2 color-black'>Lorem ipsum dolor sit</p>
                    </div>
                    <div className="flex">
                      <img className='w-3 h-3 mt-2' src="/image/check1.png" alt="" />
                      <p className='ml-2 color-black'>Lorem ipsum dolor sit</p>
                    </div>
                    <div className="flex">
                      <img className='w-3 h-3 mt-2' src="/image/check1.png" alt="" />
                      <p className='ml-2 color-black'>Lorem ipsum dolor sit</p>
                    </div>
                    <div className="flex">
                      <img className='w-3 h-3 mt-2' src="/image/check1.png" alt="" />
                      <p className='ml-2 color-black'>Lorem ipsum dolor sit</p>
                    </div>
                    </div> 
                    <div className="col-3 bk-white bk-en">
                     <div className="text-center pt-8">
                       <p className='text-xl color-primary font-bold '>Holiday sale</p>
                        <p style={{color:"#8E8D8A"}}>1 night, 2 adults</p>
                        <p className='font-bold decor text-2xl' style={{color: "#8E8D8A"}}>45US$</p>
                        <p className='color-black font-bold text-2xl'>35US$</p>
                        <p style={{color:"#8E8D8A"}}>Exclude taxes & fees</p>
                        <button className='button-success'>Select room</button>
                     </div>
                    </div>
                </div>



    <div className="row  pb-8">
                  <div className="col-4 bk-white">
                  <div className="img-big pb-2">
            <img src="/image/imgcart1.png" alt="" />
          </div>
          <div className="img-small flex">
          <img className='w-100-768' src="/image/imgcart2.png" alt="" />
          <img className='ml-2  none-768' src="/image/imgcart3.png" alt="" />
          <img className='ml-2 w992-none' src="/image/imagecart4.png" alt="" />
          </div>
                  </div>
                  <div className="col-5 bk-white">
                    <p className='font-bold pt-6 color-black'>Cereja Hotel & Resort Dalat</p>
                    <div className="review flex">
                      <p className=' color-primary disnone'>Hotels</p>
                      <img  className=' star' src="/image/star.png" alt="" />
                      <img  className=' star' src="/image/star.png" alt="" />
                      <img  className=' star' src="/image/star.png" alt="" />
                      <img  className=' star' src="/image/star.png" alt="" />
                      <img  className=' star' src="/image/star.png" alt="" />
                      <p style={{color:"#8E8D8A"}} className='ml-3 disnone'>1k reviews</p>
                    </div>
                    <div className="flex">
                      <img className='w-5 h-5' src="/image/map.png" alt="" />
                      <p className='ml-3 color-black'>Ward 3, Da Lat</p>
                    </div>
                    <p className='font-bold color-primary' >Economy Double Room</p>
                    <div className="flex">
                      <img className='w-3 h-3 mt-2' src="/image/check1.png" alt="" />
                      <p className='ml-2 color-black'>Lorem ipsum dolor sit</p>
                    </div>
                    <div className="flex">
                      <img className='w-3 h-3 mt-2' src="/image/check1.png" alt="" />
                      <p className='ml-2 color-black'>Lorem ipsum dolor sit</p>
                    </div>
                    <div className="flex">
                      <img className='w-3 h-3 mt-2' src="/image/check1.png" alt="" />
                      <p className='ml-2 color-black'>Lorem ipsum dolor sit</p>
                    </div>
                    <div className="flex">
                      <img className='w-3 h-3 mt-2' src="/image/check1.png" alt="" />
                      <p className='ml-2 color-black'>Lorem ipsum dolor sit</p>
                    </div>
                    </div> 
                    <div className="col-3 bk-white bk-en">
                     <div className="text-center pt-8">
                       <p className='text-xl color-primary font-bold '>Holiday sale</p>
                        <p style={{color:"#8E8D8A"}}>1 night, 2 adults</p>
                        <p className='font-bold decor text-2xl' style={{color: "#8E8D8A"}}>45US$</p>
                        <p className='color-black font-bold text-2xl'>35US$</p>
                        <p style={{color:"#8E8D8A"}}>Exclude taxes & fees</p>
                        <button className='button-success'>Select room</button>
                     </div>
                    </div>
                </div>


                </div>


                
            </div>
          </div>
        </div>
 </div>
  )
}

export default page