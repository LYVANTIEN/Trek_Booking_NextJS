"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import hotelService from "@/app/services/hotelService";
import { Button, Form, Modal } from "react-bootstrap";

interface Iprops {
  showHotelCreate: boolean;
  setShowHotelCreate: (value: boolean) => void;
  onCreate: () => void;
}

function CreateHotel(props: Iprops) {
  const { showHotelCreate, setShowHotelCreate, onCreate } = props;

  // const [HotelId, setHotelId] = useState<number>();
  const [hotelName, setHotelName] = useState<string>("");
  const [hotelPhone, setHotelPhone] = useState<string>("");
  const [hotelEmail, setHotelEmail] = useState<string>("");
  const [hotelAvatar, setHotelAvatar] = useState<string>("");
  const [hotelFulDescription, setHotelFullDescription] = useState<string>("");
  const [hotelDistrict, setHotelDistrict] = useState<string>("");
  const [hotelCity, setHotelCity] = useState<string>("");
  const [hotelInformation, setHotelInformation] = useState<string>("");

  const handleSubmit = async () => {
    const supplierId = localStorage.getItem("supplierId");
    if (
      !hotelName ||
      !hotelPhone ||
      !hotelEmail ||
      !hotelFulDescription ||
      !hotelDistrict ||
      !hotelCity ||
      !hotelInformation
    ) {
      toast.error("Please fill in all fields!!!");
      return;
    }

    try {
      const hotel: IHotel = {
        hotelId: 0,
        hotelName,
        hotelPhone,
        hotelEmail,
        hotelAvatar: "1",
        hotelFulDescription,
        hotelDistrict,
        hotelCity,
        hotelInformation,
        isVerify: true, // Default value is true
        supplierId: Number(supplierId),
      };
      const response = await hotelService.createHotel(hotel);
      toast.success("Create Hotel Success");
      handleCloseModal();
      onCreate();
    } catch (error) {
      toast.error("Failed to create hotel");
      console.error("Error creating hotel:", error);
    }
  };

  const handleCloseModal = () => {
    setHotelName("");
    setHotelPhone("");
    setHotelEmail("");
    setHotelFullDescription("");
    setHotelDistrict("");
    setHotelCity("");
    setHotelInformation("");
    setShowHotelCreate(false);
  };

  return (
    <>
      <Modal
        className="pt-36"
        show={showHotelCreate}
        onHide={() => handleCloseModal()}
        size="lg"
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add New Hotel</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formHotelName">
              <Form.Label>Hotel Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Please enter hotel name"
                value={hotelName}
                onChange={(e: any) => setHotelName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formHotelPhone">
              <Form.Label>Hotel Phone</Form.Label>
              <Form.Control
                type="text"
                placeholder="Please enter hotel phone"
                value={hotelPhone}
                onChange={(e: any) => setHotelPhone(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formHotelEmail">
              <Form.Label>Hotel Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Please enter hotel email"
                value={hotelEmail}
                onChange={(e: any) => setHotelEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formHotelFullDescription">
              <Form.Label>Hotel Full Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Please enter hotel full description"
                value={hotelFulDescription}
                onChange={(e: any) => setHotelFullDescription(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formHotelDistrict">
              <Form.Label>Hotel District</Form.Label>
              <Form.Control
                type="text"
                placeholder="Please enter hotel district"
                value={hotelDistrict}
                onChange={(e: any) => setHotelDistrict(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formHotelCity">
              <Form.Label>Hotel City</Form.Label>
              <Form.Control
                type="text"
                placeholder="Please enter hotel city"
                value={hotelCity}
                onChange={(e: any) => setHotelCity(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formHotelInformation">
              <Form.Label>Hotel Information</Form.Label>
              <Form.Control
                type="text"
                placeholder="Please enter hotel information"
                value={hotelInformation}
                onChange={(e: any) => setHotelInformation(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => handleCloseModal()}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleSubmit()}>
            Create
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CreateHotel;
