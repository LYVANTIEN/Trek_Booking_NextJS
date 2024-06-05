"use client";
import tourOrderService from "@/app/services/tourOrderService";
import tourService from "@/app/services/tourService";
import userService from "@/app/services/userService";

import { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import useSWR, { mutate } from "swr";

interface IProps {
  showModalEditTourOrder: boolean;
  setShowModalEditTourOrder: (value: boolean) => void;
  tourOrder: ITourOrder | null;
  setTourOrder: (value: ITourOrder | null) => void;
}

const UpdateTourOrder = (props: IProps) => {
  const { showModalEditTourOrder, setShowModalEditTourOrder, tourOrder, setTourOrder } =
    props;
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
    if (tourOrder) {
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
  //   console.log(booking)
  const { data: listTour } = useSWR("tourList", tourService.getTours);
  const { data: listUser } = useSWR("userList", userService.getUsers);
  //   console.log(listUser);
  const handleCloseModal = () => {
    setShowModalEditTourOrder(false);
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
      const response = await tourOrderService.updateTourOrder({
        tourOrderId,
        userId,
        tourId,
        tourOrderDate,
        tourOrderQuantity,
        tourTotalPrice,
        supplierId,
        status,
        isConfirmed,
      });
      if (typeof response === "string") {
        toast.success(response);
      } else {
        toast.success("Update tour order Success");
        mutate("tourOrderList");
      }
      handleCloseModal();
    } catch (error) {
      toast.error("Update Error");
      console.error(error);
    }
  };

  if (!tourOrder) {
    return null; // or a loading indicator if needed
  }

  return (
    <>
      <Modal
        show={showModalEditTourOrder}
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
                      tourOrderDate
                        ? new Date(tourOrderDate).toISOString().substr(0, 10)
                        : ""
                    }
                    onChange={(e) => setTourOrderDate(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label className="font-semibold">Total Price</Form.Label>
                  <Form.Control
                    readOnly
                    style={{ backgroundColor: "#CED1D2" }}
                    type="number"
                    className="font-semibold"
                    value={tourTotalPrice}
                    onChange={(e) => setTourTotalPrice(Number(e.target.value))}
                  />
                </Form.Group>
              </div>
              <div className="col-6">
                <Form.Group className="mb-3">
                  <Form.Label className="font-semibold">Tour Name</Form.Label>
                  <Form.Control
                    readOnly
                    style={{ backgroundColor: "#CED1D2" }}
                    className="font-semibold"
                    type="text"
                    value={getItemName(listTour, tourId, "tourId", "tourName")}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label className="font-semibold">Tour Quantity</Form.Label>
                  <Form.Control
                    readOnly
                    style={{ backgroundColor: "#CED1D2" }}
                    type="number"
                    className="font-semibold"
                    value={tourOrderQuantity}
                    onChange={(e) => setTourOrderQuantity(Number(e.target.value))}
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
export default UpdateTourOrder;