import hotelService from "@/app/services/hotelService";
import roomService from "@/app/services/roomService";
import userService from "@/app/services/userService";

import { useEffect, useState } from "react";
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
  const [bookingId, setBookingId] = useState<number>(0);
  const [userId, setUserId] = useState<number>(0);
  const [hotelId, setHotelId] = useState<number>(0);
  const [roomId, setRoomId] = useState<number>(0);
  const [checkInDate, setCheckInDate] = useState<string | Date>("");
  const [checkOutDate, setCheckOutDate] = useState<string | Date>("");
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [voucherCode, setVoucherCode] = useState<string>("");
  const [roomQuantity, setRoomQuantity] = useState<number>(0);
  const [userNote, setUserNote] = useState<string>("");
  const [isConfirmed, setIsConfirmed] = useState<boolean>(false);
  const [status, setStatus] = useState<boolean>(false);

  useEffect(() => {
    if (booking && booking.bookingId) {
      setBookingId(booking.bookingId);
      setUserId(booking.userId);
      setHotelId(booking.hotelId);
      setRoomId(booking.roomId);
      setCheckInDate(booking.checkInDate);
      setCheckOutDate(booking.checkOutDate);
      setTotalPrice(booking.totalPrice);
      setVoucherCode(booking.voucherCode);
      setRoomQuantity(booking.roomQuantity);
      setUserNote(booking.userNote);
      setIsConfirmed(booking.isConfirmed);
      setStatus(booking.status);
    }
  }, [booking]);

  const { data: listUser } = useSWR("userList", userService.getUsers);
  const { data: listHotel } = useSWR("hotelList", hotelService.getHotels);
  const { data: listRoom } = useSWR("roomList", roomService.getRooms);

  const handleCloseModal = () => {
    setShowModalBookingDetail(false);
  };
  const getItemName = (
    list: any[] | undefined,
    id: number,
    idField: string,
    nameField: string
  ) => {
    const item = list?.find((item: any) => item[idField] === id);
    return item ? item[nameField] : "N/A";
  };
  return (
    <>
      <Modal
        show={showModalBookingDetail}
        onHide={() => handleCloseModal()}
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
                <p>{getItemName(listUser, userId, "userId", "email")}</p>
              </Form.Group>
              <Form.Group className="mb-3 col-6" controlId="hotelName">
                <Form.Label className="font-bold text-xl">
                  Hotel Name
                </Form.Label>
                <p>{getItemName(listHotel, hotelId, "hotelId", "hotelName")}</p>
              </Form.Group>
              <Form.Group className="mb-3 col-6" controlId="roomName">
                <Form.Label className="font-bold text-xl">Room Name</Form.Label>
                <p>{getItemName(listRoom, roomId, "roomId", "roomName")}</p>
              </Form.Group>
              <Form.Group className="mb-3 col-6" controlId="checkInDate">
                <Form.Label className="font-bold text-xl">
                  Check In Date
                </Form.Label>
                <p>
                  {checkInDate
                    ? new Date(checkInDate).toISOString().substr(0, 10)
                    : ""}
                </p>
              </Form.Group>
              <Form.Group className="mb-3 col-6" controlId="checkOutDate">
                <Form.Label className="font-bold text-xl">
                  Check Out Date
                </Form.Label>
                <p>
                  {checkOutDate
                    ? new Date(checkOutDate).toISOString().substr(0, 10)
                    : ""}
                </p>
              </Form.Group>
              <Form.Group className="mb-3 col-6" controlId="totalPrice">
                <Form.Label className="font-bold text-xl">
                  Total Price
                </Form.Label>
                <p>{totalPrice}</p>
              </Form.Group>
              <Form.Group className="mb-3 col-6" controlId="roomQuantity">
                <Form.Label className="font-bold text-xl">
                  Room Quantity
                </Form.Label>
                <p>{roomQuantity}</p>
              </Form.Group>
              <Form.Group className="mb-3 col-6" controlId="voucherCode">
                <Form.Label className="font-bold text-xl">
                  Voucher Code
                </Form.Label>
                <p>{voucherCode}</p>
              </Form.Group>
              <Form.Group className="mb-3 col-6" controlId="userNote">
                <Form.Label className="font-bold text-xl">User Note</Form.Label>
                <p>{userNote}</p>
              </Form.Group>
              <Form.Group className="mb-3 col-6" controlId="isConfirmed">
                <Form.Label className="font-bold text-xl">
                  Is Confirmed
                </Form.Label>
                <p
                  className={`whitespace-nowrap ${
                    isConfirmed ? "color-active" : "color-stop"
                  }`}
                >
                  {isConfirmed ? "Confirmed" : "Pending..."}
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