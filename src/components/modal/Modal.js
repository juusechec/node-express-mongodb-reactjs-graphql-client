import React from "react";
import "./Modal.css";

const Modal = ({ show, children }) => {
  const showHideClassName = show ? "modal d-block" : "modal d-none";

  return (
    <div className={showHideClassName}>
      <div className="modal-container">{children}</div>
    </div>
  );
};

export default Modal;
