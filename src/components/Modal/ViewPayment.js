import { useState } from "react";
import { Button, Modal } from "react-bootstrap";

const ViewPayment = ({ image }) => {
  // --------------------------- MODAL ----------------------------- //
  const [modal, setModal] = useState(false);
  const showModal = () => setModal(true);
  const closeModal = () => setModal(false);

  const path = "https://res.cloudinary.com/daxedhulb/image/upload/";

  return (
    <>
      <label onClick={showModal} size="sm" style={{ color: "#061E99" }}>
        View Payment
      </label>
      <Modal show={modal} onHide={closeModal}>
        <Modal.Body>
          <h5 className="text-center my-3 text-danger">Attachment</h5>
          <center>
            <img src={path + image} alt="payment" className="img-fluid" />
          </center>
          <div className="d-flex justify-content-around">
            <Button className="btn btn-danger-custom mt-4" onClick={closeModal}>
              Back
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ViewPayment;
