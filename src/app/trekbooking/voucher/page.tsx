import React from 'react'
import '../../../../public/css/voucher.css'
const page = () => {
  return (
    
    <div>
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
              <a href="" className="font-bold text-decoration-none" style={{ color: "#1F1C17" }}>
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
      <div className="payment-wallet">
        <h3>Payment wallet</h3>
      </div>
      <div className="backgr-home ">
        <div className="voucher p-6">
            <div className="flex justify-center pb-4">
                <div className="border-wallet flex justify-between font-semibold">
                <div >
               <p className=''>voucher code:<br/> MuongThanhLuxury</p>
               <p className='mb-0'>Discount: 30%</p>

                </div>
                <div>
                    <p className='pb-repon'>Used date: 01/05/2024  10:12</p>
                    <p className='mb-0 '>Hotel: Muong Thanh Can Tho</p>
                    </div>
                </div>

                
            </div>
            <div className="flex justify-center">
                <div className="border-wallet flex justify-between font-semibold">
                <div >
               <p className=''>voucher code:<br/> MuongThanhLuxury</p>
               <p className='mb-0'>Discount: 30%</p>

                </div>
                <div>
                    <p className='pb-repon'>Used date: 01/05/2024  10:12</p>
                    <p className='mb-0 '>Hotel: Muong Thanh Can Tho</p>
                    </div>
                </div>

                
            </div>
            
        </div>
      </div>
    </div>
  )
}

export default page