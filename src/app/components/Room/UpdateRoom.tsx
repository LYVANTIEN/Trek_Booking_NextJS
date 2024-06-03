"use client";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import roomService from "@/app/services/roomService";
import { mutate } from "swr";
import { toast } from "react-toastify";

interface IProps {
  showRoomUpdate: boolean;
  setShowRoomUpdate: (value: boolean) => void;
  hotelId: string;
  room: IRoom | null;
  setRoom: (value: IRoom | null) => void;
}

function UpdateRoom(props: IProps) {
  const { showRoomUpdate, setShowRoomUpdate, hotelId, room, setRoom } = props;
  const [roomId, setRoomId] = useState<number>(0);
  const [roomName, setRoomName] = useState<string>("");
  const [roomNote, setNote] = useState<string>("");
  const [discountPercent, setDiscount] = useState<string>("");
  const [roomDescription, setDescription] = useState<string>("");
  const [roomAvailable, setAvailable] = useState<string>("");
  const [roomPrice, setPrice] = useState<string>("");
  const [roomCapacity, setCapacity] = useState<string>("");

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!roomName) newErrors.roomName = "Room Name is required";
    if (!roomAvailable || isNaN(parseInt(roomAvailable)))
      newErrors.roomAvailable = "Available must be a number";
    if (!roomPrice || isNaN(parseFloat(roomPrice)))
      newErrors.roomPrice = "Price must be a number";
    if (!roomCapacity || isNaN(parseInt(roomCapacity)))
      newErrors.roomCapacity = "Capacity must be a number";
    return newErrors;
  };

  const handleCloseModal = async () => {
    setRoomName("");
    setNote("");
    setDiscount("");
    setDescription("");
    setAvailable("");
    setPrice("");
    setCapacity("");
    setErrors({});
    setRoom(null);
    setShowRoomUpdate(false);
  };

  useEffect(() => {
    if (room && room.roomId) {
      setRoomId(room.roomId);
      setRoomName(room.roomName);
      setNote(room.roomNote);
      setAvailable(room.roomAvailable.toString());
      setPrice(room.roomPrice.toString());
      setCapacity(room.roomCapacity.toString());
      setDiscount(room.discountPercent.toString());
      setDescription(room.roomDescription);
    }
  }, [room]);

  const discount = discountPercent ? parseFloat(discountPercent) : 0;
  const note = roomNote ? roomNote : "";
  const description = roomDescription ? roomDescription : "";

  const handleSubmit = async () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    try {
      const room: IRoom = {
        roomId: Number(roomId),
        roomName,
        roomNote: note,
        roomStatus: true,
        roomAvailable: parseInt(roomAvailable),
        roomPrice: parseFloat(roomPrice),
        roomCapacity: parseInt(roomCapacity),
        discountPercent: discount,
        roomDescription: description,
        hotelId: Number(hotelId),
      };

      const updateRoom = await roomService.updateRoom(room);

      if (typeof updateRoom === "string") {
        toast.success(updateRoom);
      } else {
        toast.success("Update Room Success");
      }
      handleCloseModal();
      mutate("listRoom");
    } catch (error) {
      toast.error("Failed to update room");
      console.error(error);
    }
  };

  return (
    <Modal
      className="modal-xl"
      show={showRoomUpdate}
      onHide={() => handleCloseModal()}
      backdrop="static"
      keyboard={false}
      size="xl"
    >
      <Modal.Header closeButton>
        <Modal.Title>Update Room</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Row>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Room Name</Form.Label>
                <Form.Control
                  type="text"
                  value={roomName}
                  onChange={(e) => setRoomName(e.target.value)}
                  isInvalid={!!errors.roomName}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.roomName}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Available</Form.Label>
                <Form.Control
                  type="text"
                  value={roomAvailable}
                  onChange={(e) => setAvailable(e.target.value)}
                  isInvalid={!!errors.roomAvailable}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.roomAvailable}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Note</Form.Label>
                <Form.Control
                  type="text"
                  value={roomNote}
                  onChange={(e) => setNote(e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.roomNote}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="text"
                  value={roomPrice}
                  onChange={(e) => setPrice(e.target.value)}
                  isInvalid={!!errors.roomPrice}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.roomPrice}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Discount Percent</Form.Label>
                <Form.Control
                  type="text"
                  value={discountPercent}
                  onChange={(e) => setDiscount(e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.discountPercent}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Capacity</Form.Label>
                <Form.Control
                  type="text"
                  value={roomCapacity}
                  onChange={(e) => setCapacity(e.target.value)}
                  isInvalid={!!errors.roomCapacity}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.roomCapacity}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col xs={11}>
              <Form.Group>
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={roomDescription}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.roomDescription}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col xs={1} className="d-flex align-items-end">
              <div className="d-flex flex-column gap-2">
                <Button
                  style={{
                    background: "#305A61",
                    color: "white",
                    border: "1px solid #ccc",
                  }}
                  onClick={() => handleSubmit()}
                >
                  Save
                </Button>
                <Button
                  style={{
                    border: "1px solid #ccc",
                    color: "black",
                    background: "white",
                  }}
                  onClick={() => handleCloseModal()}
                >
                  Exit
                </Button>
              </div>
            </Col>
          </Row>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default UpdateRoom;
