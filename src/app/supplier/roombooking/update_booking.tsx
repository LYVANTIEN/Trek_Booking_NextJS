"use client";
import bookingService from "@/app/services/bookingService";
import hotelService from "@/app/services/hotelService";
import roomService from "@/app/services/roomService";
import userService from "@/app/services/userService";

import { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import useSWR, { mutate } from "swr";

interface IProps {
  showModalEditBooking: boolean;
  setShowModalEditBooking: (value: boolean) => void;
  booking: IBooking | null;
  setBooking: (value: IBooking | null) => void;
}

const UpdateBooking = (props: IProps) => {
  const supplierId = localStorage.getItem("supplierId");
  const { showModalEditBooking, setShowModalEditBooking, booking, setBooking } =
    props;
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
    if (booking) {
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
  //   console.log(booking)
  const { data: listUser } = useSWR("userList", userService.getUsers);
  const { data: listHotel } = useSWR("hotelList", hotelService.getHotels);
  const { data: listRoom } = useSWR("roomList", roomService.getRooms);
  //   console.log(listUser);
  
  const handleCloseModal = () => {
    setShowModalEditBooking(false);
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
  const handleSubmit = async () => {
    try {
      const response = await bookingService.updateBooking({
        bookingId,
        userId,
        hotelId,
        roomId,
        checkInDate,
        checkOutDate,
        totalPrice,
        roomQuantity,
        voucherCode,
        userNote,
        status,
        isConfirmed,
      });
      if (typeof response === "string") {
        toast.success(response);
      } else {
        toast.success("Update booking Success");
        mutate("bookingList");
      }
      handleCloseModal();
    } catch (error) {
      toast.error("Update Error");
      console.error(error);
    }
  };

  if (!booking) {
    return null; // or a loading indicator if needed
  }

  return (
    <>
      <Modal
        show={showModalEditBooking}
        onHide={() => handleCloseModal()}
        keyboard={false}
        size="lg"
      >
        {/* <Modal.Header closeButton>
          <Modal.Title>Edit booking</Modal.Title>
        </Modal.Header> */}
        <Modal.Body>
          <Form>
            <div className="row">
              <div className="col-6">
                <Form.Group className="mb-3">
                  <Form.Label className="font-semibold">User</Form.Label>
                  <Form.Control
                    readOnly
                    style={{ backgroundColor: "#CED1D2" }}
                    className="font-semibold"
                    type="text"
                    value={getItemName(listUser, userId, "userId", "email")}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label className="font-semibold">
                    Check-in Date
                  </Form.Label>
                  <Form.Control
                    readOnly
                    className="font-semibold"
                    style={{ backgroundColor: "#CED1D2" }}
                    type="date"
                    value={
                      checkInDate
                        ? new Date(checkInDate).toISOString().substr(0, 10)
                        : ""
                    }
                    onChange={(e) => setCheckInDate(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label className="font-semibold">
                    Check-out Date
                  </Form.Label>
                  <Form.Control
                    readOnly
                    className="font-semibold"
                    style={{ backgroundColor: "#CED1D2" }}
                    type="date"
                    value={
                      checkOutDate
                        ? new Date(checkOutDate).toISOString().substr(0, 10)
                        : ""
                    }
                    onChange={(e) => setCheckOutDate(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label className="font-semibold">
                    Voucher Code
                  </Form.Label>
                  <Form.Control
                    readOnly
                    className="font-semibold"
                    style={{ backgroundColor: "#CED1D2" }}
                    type="text"
                    value={voucherCode}
                    onChange={(e) => setVoucherCode(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label className="font-semibold">User Note</Form.Label>
                  <Form.Control
                    readOnly
                    style={{ backgroundColor: "#CED1D2" }}
                    className="font-semibold"
                    as="textarea"
                    value={userNote}
                    onChange={(e) => setUserNote(e.target.value)}
                  />
                </Form.Group>
              </div>
              <div className="col-6">
                <Form.Group className="mb-3">
                  <Form.Label className="font-semibold">Hotel</Form.Label>
                  <Form.Control
                    style={{ backgroundColor: "#CED1D2" }}
                    className="font-semibold"
                    readOnly
                    type="text"
                    value={getItemName(listHotel, hotelId, "hotelId", "hotelName")}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label className="font-semibold">Room</Form.Label>
                  <Form.Control
                    style={{ backgroundColor: "#CED1D2" }}
                    className="font-semibold"
                    readOnly
                    type="text"
                    value={getItemName(listRoom, roomId, "roomId", "roomName")}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label className="font-semibold">Total Price</Form.Label>
                  <Form.Control
                    readOnly
                    style={{ backgroundColor: "#CED1D2" }}
                    type="number"
                    className="font-semibold"
                    value={totalPrice}
                    onChange={(e) => setTotalPrice(Number(e.target.value))}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label className="font-semibold">
                    Room Quantity
                  </Form.Label>
                  <Form.Control
                    readOnly
                    style={{ backgroundColor: "#CED1D2" }}
                    type="number"
                    className="font-semibold"
                    value={roomQuantity}
                    onChange={(e) => setRoomQuantity(Number(e.target.value))}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label className="font-semibold">
                    Is Confirmed
                  </Form.Label>
                  <Form.Control
                    className={isConfirmed ? "color-active" : "color-stop"}
                    as="select"
                    value={isConfirmed ? "confirmed" : "not confirmed"}
                    onChange={(e) =>
                      setIsConfirmed(e.target.value === "confirmed")
                    }
                  >
                    <option className="color-active" value="confirmed">
                      Confirmed
                    </option>
                    <option className="color-stop" value="not confirmed">
                      Pending...
                    </option>
                  </Form.Control>
                </Form.Group>
                <Form.Group className="mb-3 hidden">
                  <Form.Label>Status</Form.Label>
                  <Form.Check
                    type="checkbox"
                    checked={status}
                    onChange={(e) => setStatus(e.target.checked)}
                  />
                </Form.Group>
              </div>
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="text-black font-semibold border"
            style={{ backgroundColor: "white", borderRadius: "10px" }}
            onClick={() => handleCloseModal()}
          >
            Cancel
          </Button>
          <Button
            style={{ backgroundColor: "#305A61", borderRadius: "10px" }}
            onClick={() => handleSubmit()}
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default UpdateBooking;