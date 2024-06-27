"use client"

import { useEffect, useState } from 'react';
import tourService from "@/app/services/tourService"; // Đảm bảo import đúng
import { ITour } from '@/app/entities/tour';
import { useRouter, useSearchParams } from "next/navigation";
import { Oval } from 'react-loader-spinner'; 
import userService from '@/app/services/userService';

const TourOrder = () => {

  const searchParams = useSearchParams();
  const tourId = Number(searchParams.get('tourId'));
  const quantity = Number(searchParams.get('quantity'));

  const [tour, setTour]  = useState<ITour | null>(null);
  const [loading, setLoading] = useState(true);


  const [user, setUser] = useState<IUser | null>(null);

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  useEffect(() => {
    if (!tourId || !quantity) {
      setLoading(false);
      return;
    }

    const fetchTour = async () => {
      try {
        const fetchedTour = await tourService.getTourById(tourId);
        setTour(fetchedTour);

        const userData = await userService.getUserById();
        setUser(userData);
        setFullName(userData.userName || '');
        setEmail(userData.email || '');
        setPhone(userData.phone || '');
      } catch (error) {
        console.error('Failed to fetch tour:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTour();
  }, [tourId, quantity]);

  if (loading) {
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

  if (!tour) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Tour not found or invalid parameters.</p>
      </div>
    );
  }

  const totalPrice = tour.tourPrice * quantity;
  const discountAmount = (totalPrice * tour.tourDiscount) / 100;
  const finalPrice = totalPrice - discountAmount;

  return (
    <>
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
        <div className="row pt-8">
          <div className="col-md-6">
            <div
              className="border"
              style={{ borderRadius: "10px", boxShadow: "0 6px 4px 0 #7F7F7F" }}
            >
              <div className="w-4/5 m-auto">
                <div className="text-center pt-5">
                  <span
                    className=" text-xl font-semibold"
                    style={{ color: "#305A61" }}
                  >
                    Guest Information
                  </span>
                </div>
                <div className="pt-3">
                  <p className="font-semibold">Full name</p>
                  <input
                   value={fullName} // Cập nhật giá trị từ trạng thái
                   onChange={(e) => setFullName(e.target.value)} // Theo dõi sự thay đổi
                 type='text'
              className='border w-full py-2 px-2'
             style={{ borderRadius: '10px', borderColor: '#D2D2D2' }}
                                        />
                </div>
                <div className="pt-3">
                  <p className="font-semibold">Email</p>
                  <input
                                            value={email} // Cập nhật giá trị từ trạng thái
                                            onChange={(e) => setEmail(e.target.value)} // Theo dõi sự thay đổi
                                            type='text'
                                            className='border w-full py-2 px-1'
                                            style={{ borderRadius: '10px', borderColor: '#D2D2D2' }}
                                        />
                </div>
                <div className="pt-3">
                  <p className="font-semibold">Phone number</p>
                  <input
                                            value={phone} // Cập nhật giá trị từ trạng thái
                                            onChange={(e) => setPhone(e.target.value)} // Theo dõi sự thay đổi
                                            type='text'
                                            className='border w-full py-2 px-1'
                                            style={{ borderRadius: '10px', borderColor: '#D2D2D2' }}
                                        />
                </div>
                
                <div className="flex justify-end pt-3 pb-4">
                  <button
                    className=" text-white font-medium py-2 px-6 text-lg border"
                    style={{ backgroundColor: "#305A61", borderRadius: "20px" }}
                  >
                    Continue
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div
              className="border"
              style={{ borderRadius: "10px", boxShadow: "0 6px 4px 0 #7F7F7F" }}
            >
              <div className="w-3/5 m-auto">
                <div className="text-center pt-5">
                  <span
                    className=" text-xl font-semibold"
                    style={{ color: "#305A61" }}
                  >
                    Price Details
                  </span>
                </div>
                <div className="pt-4">
                  <div className="flex justify-between">
                    <p className="font-semibold text-lg">{tour.tourPrice} US$ x {quantity} Member:</p>
                    <p className="text-2xl">{totalPrice} US$</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="font-semibold text-lg">VAT:</p>
                    <p className="text-2xl">
                      <span className="text-2xl"></span> 0US$
                    </p>
                  </div>
                  <div className="flex justify-between border-solid border-b-2 border-black">
                    <p className="font-semibold text-lg">Discount</p>
                    <p className="text-2xl">
                      <span className="text-2xl">-</span> {discountAmount} US$
                    </p>
                  </div>
                  <div className="flex justify-between pt-2">
                    <p className="font-semibold text-lg">Total</p>
                    <p className="text-2xl font-semibold">{finalPrice} US$</p>
                  </div>
                </div>
              </div>
            </div>
           
          </div>
        </div>
      </div>
    </>
  );
};

export default TourOrder;
