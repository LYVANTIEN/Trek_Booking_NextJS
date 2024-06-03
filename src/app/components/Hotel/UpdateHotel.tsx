"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import hotelService from "@/app/services/hotelService";
import { Button, Form, Modal } from "react-bootstrap";
import { Hotel } from "@mui/icons-material";

interface Iprops {
  showHotelUpdate: boolean;
  setShowHotelUpdate: (value: boolean) => void;
  onUpdate: () => void;
  ThishotelId: Number;
  hotel: IHotel | null;
  setHotel: (value: IHotel | null) => void;
}

function UpdateHotel(props: Iprops) {
  const {
    showHotelUpdate,
    setShowHotelUpdate,
    onUpdate,
    ThishotelId,
    hotel,
    setHotel,
  } = props;

  //const [HotelId, setHotelId] = useState<Number>();
  const [hotelName, setHotelName] = useState<string>("");
  const [hotelPhone, setHotelPhone] = useState<string>("");
  const [hotelEmail, setHotelEmail] = useState<string>("");
  const [hotelAvatar, setHotelAvatar] = useState<string>("");
  const [hotelFulDescription, setHotelFullDescription] = useState<string>("");
  const [hotelDistrict, setHotelDistrict] = useState<string>("");
  const [hotelCity, setHotelCity] = useState<string>("");
  const [hotelInformation, setHotelInformation] = useState<string>("");

  const handleSubmit = async () => {
    const hotelId = ThishotelId;
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
        hotelId: Number(hotelId),
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
      const response = await hotelService.updateHotel(hotel);
      toast.success("Update Hotel Success");
      handleCloseModal();
      onUpdate();
    } catch (error) {
      toast.error("Failed to update hotel");
      console.error("Error updating hotel:", error);
    }
  };
  useEffect(() => {
    if (hotel && hotel.hotelId) {
      setHotelName(hotel.hotelName);
      setHotelPhone(hotel.hotelPhone);
      setHotelEmail(hotel.hotelEmail);
      setHotelFullDescription(hotel.hotelFulDescription);
      setHotelDistrict(hotel.hotelDistrict);
      setHotelCity(hotel.hotelCity);
      setHotelInformation(hotel.hotelInformation);
    }
  }, [hotel]);
  console.log("List Hotel" + hotel);

  const handleCloseModal = () => {
    setHotelName("");
    setHotelPhone("");
    setHotelEmail("");
    setHotelFullDescription("");
    setHotelDistrict("");
    setHotelCity("");
    setHotelInformation("");
    setHotel(null);
    setShowHotelUpdate(false);
  };

  return (
    <>
      <Modal
        className="pt-36"
        show={showHotelUpdate}
        onHide={() => handleCloseModal()}
        size="lg"
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Update Hotel</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formHotelName">
              <Form.Label>Hotel Name</Form.Label>

              <Form.Control
                type="text"
                value={hotelName}
                onChange={(e) => setHotelName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formHotelPhone">
              <Form.Label>Hotel Phone</Form.Label>
              <Form.Control
                type="text"
                placeholder="Please enter hotel phone"
                value={hotelPhone}
                onChange={(e) => setHotelPhone(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formHotelEmail">
              <Form.Label>Hotel Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Please enter hotel email"
                value={hotelEmail}
                onChange={(e) => setHotelEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formHotelFullDescription">
              <Form.Label>Hotel Full Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Please enter hotel full description"
                value={hotelFulDescription}
                onChange={(e) => setHotelFullDescription(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formHotelDistrict">
              <Form.Label>Hotel District</Form.Label>
              <Form.Control
                type="text"
                placeholder="Please enter hotel district"
                value={hotelDistrict}
                onChange={(e) => setHotelDistrict(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formHotelCity">
              <Form.Label>Hotel City</Form.Label>
              <Form.Control
                type="text"
                placeholder="Please enter hotel city"
                value={hotelCity}
                onChange={(e) => setHotelCity(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formHotelInformation">
              <Form.Label>Hotel Information</Form.Label>
              <Form.Control
                type="text"
                placeholder="Please enter hotel information"
                value={hotelInformation}
                onChange={(e) => setHotelInformation(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => handleCloseModal()}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleSubmit()}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default UpdateHotel;
