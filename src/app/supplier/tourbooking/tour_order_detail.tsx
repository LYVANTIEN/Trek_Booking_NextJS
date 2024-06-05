import hotelService from "@/app/services/hotelService";
import roomService from "@/app/services/roomService";
import tourService from "@/app/services/tourService";
import userService from "@/app/services/userService";

import { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import useSWR from "swr";

interface IProps {
  showModalTourOrderDetail: boolean;
  setShowModalTourOrderDetail: (value: boolean) => void;
  tourOrder: ITourOrder | null;
  setTourOrder: (value: ITourOrder | null) => void;
}

const TourOrderDetail = (props: IProps) => {
  const {
    showModalTourOrderDetail,
    setShowModalTourOrderDetail,
    tourOrder,
    setTourOrder,
  } = props;
  const [tourOrderId, seTourOrderId] = useState<number>(0);
  const [userId, setUserId] = useState<number>(0);
  const [tourId, setTourId] = useState<number>(0);
  const [tourOrderQuantity, setTourOrderQuantity] = useState<number>(0);
  const [tourOrderDate, setTourOrderDate] = useState<string | Date>("");
  const [tourTotalPrice, setTourTotalPrice] = useState<number>(0);
  const [supplierId, setSupplierId] = useState<number>(0);
  const [isConfirmed, setIsConfirmed] = useState<boolean>(false);
  const [status, setStatus] = useState<boolean>(false);

  useEffect(() => {
    if (tourOrder && tourOrder.tourOrderId) {
    seTourOrderId(tourOrder.tourOrderId);
      setUserId(tourOrder.userId);
      setTourId(tourOrder.tourId);
      setTourOrderQuantity(tourOrder.tourOrderQuantity);
      setTourOrderDate(tourOrder.tourOrderDate);
      setTourTotalPrice(tourOrder.tourTotalPrice);
      setSupplierId(tourOrder.supplierId);
      setIsConfirmed(tourOrder.isConfirmed);
      setStatus(tourOrder.status);
    }
  }, [tourOrder]);

  const { data: listTour } = useSWR("tourList", tourService.getTours);
  const { data: listUser } = useSWR("userList", userService.getUsers);
  const getItemName = (
    list: any[] | undefined,
    id: number,
    idField: string,
    nameField: string
  ) => {
    const item = list?.find((item: any) => item[idField] === id);
    return item ? item[nameField] : "N/A";
  };
  const handleCloseModal = () => {
    setShowModalTourOrderDetail(false);
  };

  return (
    <>
      <Modal
        show={showModalTourOrderDetail}
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
                  Tour Name
                </Form.Label>
                <p>{getItemName(listTour, tourId, "tourId", "tourName")}</p>
              </Form.Group>
              
              <Form.Group className="mb-3 col-6" controlId="checkInDate">
                <Form.Label className="font-bold text-xl">
                 Tour Date
                </Form.Label>
                <p>
                  {tourOrderDate
                    ? new Date(tourOrderDate).toISOString().substr(0, 10)
                    : ""}
                </p>
              </Form.Group>
              <Form.Group className="mb-3 col-6" controlId="checkOutDate">
                <Form.Label className="font-bold text-xl">
                  Tour Quantity
                </Form.Label>
                <p>{tourOrderQuantity}</p>
              </Form.Group>
              <Form.Group className="mb-3 col-6" controlId="totalPrice">
                <Form.Label className="font-bold text-xl">
                  Total Price
                </Form.Label>
                <p>{tourTotalPrice}</p>
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
export default TourOrderDetail;