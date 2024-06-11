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

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isTouched, setIsTouched] = useState<{ [key: string]: boolean }>({
    hotelName: false,
    hotelPhone: false,
    hotelEmail: false,
    hotelFulDescription: false,
    hotelDistrict: false,
    hotelCity: false,
    hotelInformation: false,
  });
  //Validate Input
  const validateHotelName = (name: string) => {
    if (!name) return "Hotel Name is required";
    return "";
  };

  const validateHotelPhone = (phoneNumber: string) => {
    if (!phoneNumber) return "Hotel Phone Number is required";
    if (!/0[0-9]{9}$/.test(phoneNumber))
      return "Hotel Phone Number must be 10 digits";
    return "";
  };

  const validateHotelEmail = (email: string) => {
    if (!email) return "Hotel Email is required";
    if (!/^([A-Za-z][\w\.\-]+)@([a-z]+)((\.(\w){2,3})+)$/.test(email))
      return "Hotel Email must be a valid format email address";
    return "";
  };

  const validateHotelFulDescription = (description: string) => {
    if (!description) return "Hotel Description is required";
    return "";
  };

  const validateHotelDistrict = (district: string) => {
    if (!district) return "Hotel District is required";
    return "";
  };

  const validateHotelCity = (city: string) => {
    if (!city) return "Hotel City is required";
    return "";
  };

  const validateHotelInformation = (information: string) => {
    if (!information) return "Hotel Information is required";
    return "";
  };

  useEffect(() => {
    if (isTouched.hotelName) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        hotelName: validateHotelName(hotelName),
      }));
    }
  }, [hotelName, isTouched.hotelName]);

  useEffect(() => {
    if (isTouched.hotelPhone) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        hotelPhone: validateHotelPhone(hotelPhone),
      }));
    }
  }, [hotelPhone, isTouched.hotelPhone]);

  useEffect(() => {
    if (isTouched.hotelEmail) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        hotelEmail: validateHotelEmail(hotelEmail),
      }));
    }
  }, [hotelEmail, isTouched.hotelEmail]);

  useEffect(() => {
    if (isTouched.hotelFulDescription) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        hotelFulDescription: validateHotelFulDescription(hotelFulDescription),
      }));
    }
  }, [hotelFulDescription, isTouched.hotelFulDescription]);

  useEffect(() => {
    if (isTouched.hotelDistrict) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        hotelDistrict: validateHotelDistrict(hotelDistrict),
      }));
    }
  }, [hotelDistrict, isTouched.hotelDistrict]);

  useEffect(() => {
    if (isTouched.hotelCity) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        hotelCity: validateHotelCity(hotelCity),
      }));
    }
  }, [hotelCity, isTouched.hotelCity]);

  useEffect(() => {
    if (isTouched.hotelInformation) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        hotelInformation: validateHotelInformation(hotelInformation),
      }));
    }
  }, [hotelInformation, isTouched.hotelInformation]);

  const handleBlur = (field: string) => {
    setIsTouched((prevTouched) => ({ ...prevTouched, [field]: true }));
  };
  // End Validate Input //
  const handleSubmit = async () => {
    const hotelId = ThishotelId;
    const supplierId = localStorage.getItem("supplierId");
    const validationErrors = {
      hotelName: validateHotelName(hotelName),
      hotelPhone: validateHotelPhone(hotelPhone),
      hotelEmail: validateHotelEmail(hotelEmail),
      hotelFulDescription: validateHotelFulDescription(hotelFulDescription),
      hotelDistrict: validateHotelDistrict(hotelDistrict),
      hotelCity: validateHotelCity(hotelCity),
      hotelInformation: validateHotelInformation(hotelInformation),
    };
    setErrors(validationErrors);

    if (Object.values(validationErrors).some((error) => error)) {
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
    setErrors({});
    setIsTouched({
      hotelName: false,
      hotelPhone: false,
      hotelEmail: false,
      hotelFulDescription: false,
      hotelDistrict: false,
      hotelCity: false,
      hotelInformation: false,
    });
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
                onBlur={() => handleBlur("hotelName")}
                isInvalid={!!errors.hotelName}
              />
              <Form.Control.Feedback type="invalid">
                {errors.hotelName}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formHotelPhone">
              <Form.Label>Hotel Phone</Form.Label>
              <Form.Control
                type="text"
                placeholder="Please enter hotel phone"
                value={hotelPhone}
                onChange={(e) => setHotelPhone(e.target.value)}
                onBlur={() => handleBlur("hotelPhone")}
                isInvalid={!!errors.hotelPhone}
              />
              <Form.Control.Feedback type="invalid">
                {errors.hotelPhone}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formHotelEmail">
              <Form.Label>Hotel Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Please enter hotel email"
                value={hotelEmail}
                onChange={(e) => setHotelEmail(e.target.value)}
                onBlur={() => handleBlur("hotelEmail")}
                isInvalid={!!errors.hotelEmail}
              />
              <Form.Control.Feedback type="invalid">
                {errors.hotelEmail}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formHotelFullDescription">
              <Form.Label>Hotel Full Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Please enter hotel full description"
                value={hotelFulDescription}
                onChange={(e) => setHotelFullDescription(e.target.value)}
                onBlur={() => handleBlur("hotelFulDescription")}
                isInvalid={!!errors.hotelFulDescription}
              />
              <Form.Control.Feedback type="invalid">
                {errors.hotelFulDescription}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formHotelDistrict">
              <Form.Label>Hotel District</Form.Label>
              <Form.Control
                type="text"
                placeholder="Please enter hotel district"
                value={hotelDistrict}
                onChange={(e) => setHotelDistrict(e.target.value)}
                onBlur={() => handleBlur("hotelDistrict")}
                isInvalid={!!errors.hotelDistrict}
              />
              <Form.Control.Feedback type="invalid">
                {errors.hotelDistrict}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formHotelCity">
              <Form.Label>Hotel City</Form.Label>
              <Form.Control
                type="text"
                placeholder="Please enter hotel city"
                value={hotelCity}
                onChange={(e) => setHotelCity(e.target.value)}
                onBlur={() => handleBlur("hotelCity")}
                isInvalid={!!errors.hotelCity}
              />
              <Form.Control.Feedback type="invalid">
                {errors.hotelCity}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formHotelInformation">
              <Form.Label>Hotel Information</Form.Label>
              <Form.Control
                type="text"
                placeholder="Please enter hotel information"
                value={hotelInformation}
                onChange={(e) => setHotelInformation(e.target.value)}
                onBlur={() => handleBlur("hotelInformation")}
                isInvalid={!!errors.hotelInformation}
              />
              <Form.Control.Feedback type="invalid">
                {errors.hotelInformation}
              </Form.Control.Feedback>
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
