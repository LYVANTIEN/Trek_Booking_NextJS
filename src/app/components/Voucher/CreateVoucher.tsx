"use client";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import roomService from "@/app/services/roomService";
import { mutate } from "swr";
import { toast } from "react-toastify";
import voucherService from "@/app/services/voucherService";

interface IProps {
  showVoucherCreate: boolean;
  setShowVoucherCreate: (value: boolean) => void;
  hotelId: string;
}

function CreateVoucher(props: IProps) {
  const { showVoucherCreate, setShowVoucherCreate, hotelId } = props;
  const [voucherCode, setVoucherCode] = useState<string>("");
  const [availableDate, setAvailableDate] = useState<string>("");
  const [expireDate, setExpireDate] = useState<string>("");
  const [voucherQuantity, setVoucherQuantity] = useState<string>("");
  const [discountPercent, setDiscountPercent] = useState<string>("");

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!voucherCode)
      newErrors.voucherCode =
        "Voucher Code is not empty and cannot be the same as an existing Voucher";
    const currentDate = new Date();
    const availableDateObj = new Date(availableDate);
    const expireDateObj = new Date(expireDate);
    if (availableDateObj < currentDate) {
      newErrors.availableDate = "Available Date cannot be in the past";
    }
    if (expireDateObj <= availableDateObj) {
      newErrors.expireDate = "Expire Date must be after Available Date";
    }

    if (!voucherQuantity || isNaN(parseInt(voucherQuantity)))
      newErrors.voucherQuantity = "Quantity must be a number";
    if (!discountPercent || isNaN(parseInt(discountPercent)))
      newErrors.discountPercent = "Discount Percent must be a number";
    return newErrors;
  };

  const handleCloseModal = async () => {
    setVoucherCode("");
    setAvailableDate("");
    setExpireDate("");
    setVoucherQuantity("");
    setDiscountPercent("");
    setErrors({});
    setShowVoucherCreate(false);
  };

  const handleSubmit = async () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const voucher: IVoucher = {
        voucherId: 0,
        voucherCode,
        availableDate,
        expireDate,
        voucherQuantity: parseInt(voucherQuantity),
        discountPercent: parseInt(discountPercent),
        voucherStatus: true,
        hotelId: Number(hotelId),
      };

      const createVoucher = await voucherService.createVoucher(voucher);

      if (typeof createVoucher === "string") {
        toast.success(createVoucher);
      } else {
        toast.success("Create Voucher Success");
      }
      handleCloseModal();
      mutate("listVoucher");
    } catch (error) {
      toast.error("Failed to create voucher");
      console.error(error);
    }
  };

  return (
    <Modal
      className="modal-xl"
      show={showVoucherCreate}
      onHide={() => handleCloseModal()}
      backdrop="static"
      keyboard={false}
      size="xl"
    >
      <Modal.Header closeButton>
        <Modal.Title>Add New Voucher</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Row>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Voucher Code</Form.Label>
                <Form.Control
                  type="text"
                  value={voucherCode}
                  onChange={(e) => setVoucherCode(e.target.value)}
                  isInvalid={!!errors.voucherCode}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.voucherCode}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Voucher Quantity</Form.Label>
                <Form.Control
                  type="text"
                  value={voucherQuantity}
                  onChange={(e) => setVoucherQuantity(e.target.value)}
                  isInvalid={!!errors.voucherQuantity}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.voucherQuantity}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Available Date</Form.Label>
                <Form.Control
                  type="date"
                  value={availableDate}
                  onChange={(e) => setAvailableDate(e.target.value)}
                  isInvalid={!!errors.availableDate}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.availableDate}{" "}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Discount Percent</Form.Label>
                <Form.Control
                  type="text"
                  value={discountPercent}
                  onChange={(e) => setDiscountPercent(e.target.value)}
                  isInvalid={!!errors.discountPercent}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.discountPercent}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <Row className="align-items-end">
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Expire Date</Form.Label>
                <Form.Control
                  type="date"
                  value={expireDate}
                  onChange={(e) => setExpireDate(e.target.value)}
                  isInvalid={!!errors.expireDate}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.expireDate}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col className="d-flex justify-content-end">
              <div className="d-flex gap-4">
                <Button
                  style={{
                    border: "1px solid #ccc",
                    color: "black",
                    background: "white",
                    paddingRight: "50px",
                    paddingLeft: "50px",
                    marginRight: "20px",
                    marginBottom: "16px",
                  }}
                  onClick={() => handleCloseModal()}
                >
                  Exit
                </Button>
                <Button
                  style={{
                    background: "#305A61",
                    color: "white",
                    border: "1px solid #ccc",
                    paddingRight: "50px",
                    paddingLeft: "50px",
                    marginBottom: "16px",
                  }}
                  onClick={() => handleSubmit()}
                >
                  Save
                </Button>
              </div>
            </Col>
          </Row>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default CreateVoucher;
