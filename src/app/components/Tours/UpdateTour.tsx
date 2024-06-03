import { ITour } from "@/app/entities/tour";
import { revalidateTours, updateTour } from "@/app/services/tourService";
import { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import Button from "../../../../node_modules/react-bootstrap/esm/Button";
import Form from "../../../../node_modules/react-bootstrap/esm/Form";
import Modal from "../../../../node_modules/react-bootstrap/esm/Modal";
import { mutate } from "../../../../node_modules/swr/dist/core/index";
interface IProps{
    showTourUpdate: boolean;
    setShowTourUpdate: (value:boolean) => void;

    tour: ITour | null;
    setTour: (value: ITour | null) => void;
}
function UpdateTour(props: IProps) {
const {showTourUpdate, setShowTourUpdate,tour,setTour} = props;
const [tourId,setTourId] = useState<number>(0);
const [tourName,setTourName] = useState<string>("");
const [tourDescription,setTourDescription] = useState<string>("");
const [tourPrice,setTourPrice] =useState<number>(0);
const [tourAddress,setTourAddress] = useState<string>("");
const [tourTime,setTourTime] = useState<string>("");
const [tourTransportation,setTourTransportation] = useState<string>("");
const [tourCapacity,setTourCapacity] =useState<number>(0);
const [tourDiscount,setTourDiscount] =useState<number>(0);
const [status, SetStatus] = useState<boolean>(true);
const [supplierId,setSupplierId] =useState<number>(0);

const handleSetTourTime = (time: string | Date) => {
    let parsedDate;
    if (time instanceof Date) {
        parsedDate = time;
    } else {
        parsedDate = new Date(time);
    }
    // parsedDate.setDate(parsedDate.getDate() + 1); // Cộng thêm một ngày
    setTourTime(parsedDate.toISOString().split('T')[0]); // Định dạng ngày thành yyyy-MM-dd
};
useEffect(() => {
    if(tour && tour.tourId){
        setTourId(tour.tourId);
        setTourName(tour.tourName);
        setTourDescription(tour.tourDescription);
        setTourPrice(tour.tourPrice);
        setTourAddress(tour.tourAddress);
        handleSetTourTime(tour.tourTime);
        setTourCapacity(tour.tourCapacity);
        setTourDiscount(tour.tourDiscount);
        setTourTransportation(tour.tourTransportation);
        setSupplierId(tour.supplierId);
    }
},[tour])

const handleSubmit = async () => {
    if (!tourName || !tourDescription || !tourPrice || !tourAddress || !tourTime || !tourTransportation || !tourCapacity) {
        toast.error("Please fill in all fields!!!");
        return;
      }
    try {
        const response = await updateTour(tourId,tourName, tourDescription,tourPrice,tourAddress,tourTime,tourTransportation,tourCapacity,tourDiscount,status,supplierId);
      if (typeof response === 'string') {
        toast.success(response);
      } else {
        toast.success("Update Tour Success");
      }
      handleCloseModal();
      mutate(revalidateTours)

    } catch (error) {
      toast.error("Failed to update tour");
      console.error(error);
    }
  };

 const handleCloseModal = () => {
    setShowTourUpdate(false)
 }
 return (
    <>
      <Modal className='pt-20' show={showTourUpdate} onHide={() => handleCloseModal()} size='lg'>
        <Modal.Header closeButton>
          <Modal.Title>Update Tour</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>
        <div className="row font-semibold">
        <Form.Group hidden className="mb-3 col-6" controlId="tourName">
            <Form.Label>Tour Id</Form.Label>
            <Form.Control readOnly type="text" placeholder="Please enter tour name !!!" value={tourId} onChange={(e) => setTourId(parseInt(e.target.value))} />
          </Form.Group>
          <Form.Group className="mb-3 col-6" controlId="tourName">
            <Form.Label>Tour Name</Form.Label>
            <Form.Control type="text" placeholder="Please enter tour name !!!" value={tourName} onChange={(e) => setTourName(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3 col-6" controlId="tourTime">
                            <Form.Label>Time</Form.Label>
                            <Form.Control type="date" placeholder="Please enter tour time" value={tourTime} onChange={(e) => setTourTime(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3 col-6" controlId="tourTransportation">
            <Form.Label>Tour Transportation</Form.Label>
            <Form.Control type="text" placeholder="Please enter tour transportation !!!" value={tourTransportation} onChange={(e) => setTourTransportation(e.target.value)} />
          </Form.Group>
          
          <Form.Group className="mb-3 col-3" controlId="tourPrice">
            <Form.Label>Price</Form.Label>
            <Form.Control type="number" placeholder="Please enter tour price !!!" value={tourPrice} onChange={(e) => setTourPrice(parseFloat(e.target.value))} />
          </Form.Group>
          <Form.Group className="mb-3 col-3" controlId="tourPrice">
            <Form.Label>Discount</Form.Label>
            <Form.Control type="number" placeholder="Please enter tour discount !!!" value={tourDiscount} onChange={(e) => setTourDiscount(parseFloat(e.target.value))} />
          </Form.Group>
          <Form.Group className="mb-3 col-6" controlId="tourAddress">
            <Form.Label>Address</Form.Label>
            <Form.Control type="text" placeholder="Please enter tour address !!!" value={tourAddress} onChange={(e) => setTourAddress(e.target.value)} />
          </Form.Group>
          
          <Form.Group className="mb-3 col-6" controlId="tourCapacity">
            <Form.Label>Capacity</Form.Label>
            <Form.Control type="number" placeholder="Please enter tour capacity !!!" value={tourCapacity} onChange={(e) => setTourCapacity(parseInt(e.target.value))} />
          </Form.Group>
          <Form.Group className="mb-3 col-9" controlId="tourDescription">
  <Form.Label>Description</Form.Label>
  <Form.Control
    as="textarea"
    rows={3}
    placeholder="Please enter tour description !!!"
    value={tourDescription}
    onChange={(e) => setTourDescription(e.target.value)}
    style={{ height: '150px', overflowY: 'scroll' }}
  />
</Form.Group>
          <Form.Group hidden className="mb-3 col-6 " controlId="supplierId">
          <Form.Label>Supplier Id</Form.Label>
          <Form.Control
            type="number"
            placeholder="Please enter supplier id !!!"
            value={supplierId}
            onChange={(e) => setSupplierId(parseInt(e.target.value))}
          />
        </Form.Group>
      
        </div>
        </Form>
        <div className="mb-3 ">
  <div className=" text-right relative">
    <button className="btn-save-modal mb-2" onClick={() => handleSubmit()}>
      Save
    </button>
    <br />
    <button className="btn-exit-modal" onClick={() => handleCloseModal()}>
      Exit
    </button>
  </div>
</div>
            </Modal.Body>
      </Modal>
    </>
  );
}
export default UpdateTour;