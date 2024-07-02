"use client";
import hotelService from "@/app/services/hotelService";
import roomService from "@/app/services/roomService";
import userService from "@/app/services/userService";

import { useEffect, useState, useMemo } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import useSWR from "swr";

interface IProps {
  showModalBookingDetail: boolean;
  setShowModalBookingDetail: (value: boolean) => void;
  booking: IBooking | null;
  setBooking: (value: IBooking | null) => void;
}

const BookingDetail = (props: IProps) => {
  const {
    showModalBookingDetail,
    setShowModalBookingDetail,
    booking,
    setBooking,
  } = props;

  const [bookingDetails, setBookingDetails] = useState({
    bookingId: 0,
    userId: 0,
    hotelId: 0,
    roomId: 0,
    checkInDate: "",
    checkOutDate: "",
    totalPrice: 0,
    voucherCode: "",
    roomQuantity: 0,
    userNote: "",
    isConfirmed: false,
    status: false,
  });

  useEffect(() => {
    if (booking && booking.bookingId) {
      setBookingDetails({
        bookingId: booking.bookingId,
        userId: booking.userId,
        hotelId: booking.hotelId,
        roomId: booking.roomId,
        checkInDate: new Date(booking.checkInDate).toISOString().substr(0, 10),
        checkOutDate: new Date(booking.checkOutDate).toISOString().substr(0, 10),
        totalPrice: booking.totalPrice,
        voucherCode: booking.voucherCode,
        roomQuantity: booking.roomQuantity,
        userNote: booking.userNote,
        isConfirmed: booking.isConfirmed,
        status: booking.status,
      });
    }
  }, [booking]);

  const { data: listUser } = useSWR("userList", userService.getUsers);
  const { data: listHotel } = useSWR("hotelList", hotelService.getHotels);
  const { data: listRoom } = useSWR("roomList", roomService.getRooms);

  const handleCloseModal = () => {
    setShowModalBookingDetail(false);
  };

  const getItemName = useMemo(
    () => (list: any[] | undefined, id: number, idField: string, nameField: string) => {
      const item = list?.find((item: any) => item[idField] === id);
      return item ? item[nameField] : "N/A";
    },
    []
  );

  const userName = useMemo(
    () => getItemName(listUser, bookingDetails.userId, "userId", "email"),
    [listUser, bookingDetails.userId, getItemName]
  );

  const hotelName = useMemo(
    () => getItemName(listHotel, bookingDetails.hotelId, "hotelId", "hotelName"),
    [listHotel, bookingDetails.hotelId, getItemName]
  );

  const roomName = useMemo(
    () => getItemName(listRoom, bookingDetails.roomId, "roomId", "roomName"),
    [listRoom, bookingDetails.roomId, getItemName]
  );

  return (
    <>
      <Modal
        show={showModalBookingDetail}
        onHide={handleCloseModal}
        keyboard={false}
        size="lg"
      >
        <Modal.Header closeButton>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <div className="row">
              <Form.Group className="mb-3 col-6" controlId="userName">
                <Form.Label className="font-bold text-xl">User Name</Form.Label>
                <p>{userName}</p>
              </Form.Group>
              <Form.Group className="mb-3 col-6" controlId="hotelName">
                <Form.Label className="font-bold text-xl">
                  Hotel Name
                </Form.Label>
                <p>{hotelName}</p>
              </Form.Group>
              <Form.Group className="mb-3 col-6" controlId="roomName">
                <Form.Label className="font-bold text-xl">Room Name</Form.Label>
                <p>{roomName}</p>
              </Form.Group>
              <Form.Group className="mb-3 col-6" controlId="checkInDate">
                <Form.Label className="font-bold text-xl">
                  Check In Date
                </Form.Label>
                <p>
                  {bookingDetails.checkInDate}
                </p>
              </Form.Group>
              <Form.Group className="mb-3 col-6" controlId="checkOutDate">
                <Form.Label className="font-bold text-xl">
                  Check Out Date
                </Form.Label>
                <p>
                  {bookingDetails.checkOutDate}
                </p>
              </Form.Group>
              <Form.Group className="mb-3 col-6" controlId="totalPrice">
                <Form.Label className="font-bold text-xl">
                  Total Price
                </Form.Label>
                <p>{bookingDetails.totalPrice}</p>
              </Form.Group>
              <Form.Group className="mb-3 col-6" controlId="roomQuantity">
                <Form.Label className="font-bold text-xl">
                  Room Quantity
                </Form.Label>
                <p>{bookingDetails.roomQuantity}</p>
              </Form.Group>
              <Form.Group className="mb-3 col-6" controlId="voucherCode">
                <Form.Label className="font-bold text-xl">
                  Voucher Code
                </Form.Label>
                <p>{bookingDetails.voucherCode}</p>
              </Form.Group>
              <Form.Group className="mb-3 col-6" controlId="userNote">
                <Form.Label className="font-bold text-xl">User Note</Form.Label>
                <p>{bookingDetails.userNote}</p>
              </Form.Group>
              <Form.Group className="mb-3 col-6" controlId="isConfirmed">
                <Form.Label className="font-bold text-xl">
                  Is Confirmed
                </Form.Label>
                <p
                  className={`whitespace-nowrap ${
                    bookingDetails.isConfirmed ? "color-active" : "color-stop"
                  }`}
                >
                  {bookingDetails.isConfirmed ? "Confirmed" : "Pending..."}
                </p>
              </Form.Group>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default BookingDetail;
