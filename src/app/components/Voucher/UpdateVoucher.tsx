"use client";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import roomService from "@/app/services/roomService";
import { mutate } from "swr";
import { toast } from "react-toastify";
import voucherService from "@/app/services/voucherService";

interface IProps {
  showVoucherUpdate: boolean;
  setShowVoucherUpdate: (value: boolean) => void;
  hotelId: string;
  voucher: IVoucher | null;
  setVoucher: (value: IVoucher | null) => void;
}

function UpdateVoucher(props: IProps) {
  const {
    showVoucherUpdate,
    setShowVoucherUpdate,
    hotelId,
    voucher,
    setVoucher,
  } = props;
  const [voucherId, setVoucherId] = useState<number>(0);
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

  const handleSetAvailableDate = (time: string | Date) => {
    let parsedDate;
    if (time instanceof Date) {
      parsedDate = time;
    } else {
      parsedDate = new Date(time);
    }
    parsedDate.setDate(parsedDate.getDate() + 1); // Cộng thêm một ngày
    setAvailableDate(parsedDate.toISOString().split("T")[0]); // Định dạng ngày thành yyyy-MM-dd
  };

  const handleSetExpireDate = (time: string | Date) => {
    let parsedDate;
    if (time instanceof Date) {
      parsedDate = time;
    } else {
      parsedDate = new Date(time);
    }
    parsedDate.setDate(parsedDate.getDate() + 1); // Cộng thêm một ngày
    setExpireDate(parsedDate.toISOString().split("T")[0]); // Định dạng ngày thành yyyy-MM-dd
  };

  const handleCloseModal = async () => {
    setVoucherCode("");
    setAvailableDate("");
    setExpireDate("");
    setVoucherQuantity("");
    setDiscountPercent("");
    setErrors({});
    setVoucher(null);
    setShowVoucherUpdate(false);
  };

  useEffect(() => {
    if (voucher && voucher.voucherId) {
      setVoucherId(voucher.voucherId);
      setVoucherCode(voucher.voucherCode);
      handleSetAvailableDate(voucher.availableDate);
      handleSetExpireDate(voucher.expireDate);
      setVoucherQuantity(voucher.voucherQuantity.toString());
      setDiscountPercent(voucher.discountPercent.toString());
    }
  }, [voucher]);

  const handleSubmit = async () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    try {
      const voucher: IVoucher = {
        voucherId: Number(voucherId),
        voucherCode,
        availableDate,
        expireDate,
        voucherQuantity: parseInt(voucherQuantity),
        discountPercent: parseInt(discountPercent),
        voucherStatus: true,
        hotelId: Number(hotelId),
      };

      const updateVoucher = await voucherService.updateVoucher(voucher);

      if (typeof updateVoucher === "string") {
        toast.success(updateVoucher);
      } else {
        toast.success("Update Voucher Success");
      }
      handleCloseModal();
      mutate("listVoucher");
    } catch (error) {
      toast.error("Failed to update voucher");
      console.error(error);
    }
  };

  return (
    <Modal
      className="modal-xl"
      show={showVoucherUpdate}
      onHide={() => handleCloseModal()}
      backdrop="static"
      keyboard={false}
      size="xl"
    >
      <Modal.Header closeButton>
        <Modal.Title>Update Voucher</Modal.Title>
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

export default UpdateVoucher;
