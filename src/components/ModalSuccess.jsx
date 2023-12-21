import React from "react";
import ReactDOM from "react-dom";

const ModalSuccess = () => {

  return ReactDOM.createPortal(
    <div className="modal-success">
      <div className="modal-content">
         <h1>Thanks for your purchase!!!</h1>
      </div>
    </div>,
    document.body
  );
};

export default ModalSuccess;