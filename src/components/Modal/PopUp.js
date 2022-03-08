import { Modal } from "react-bootstrap";

import React from "react";

const PopUp = ({ show, hide, message }) => {
  return (
    <div>
      <Modal show={show} onHide={hide} centered animation={false}>
        <p className="text-center text-success p-2 mt-2">{message}</p>
      </Modal>
    </div>
  );
};

export default PopUp;
