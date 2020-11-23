import React from "react";
import "./Form.css";

const FormSuccess = () => {
  return (
    <div className="form-container">
      <span className="close-btn">×</span>
      <div className="form-content-left">
        <img className="form-img" src="img/gato-black-white.png" alt="cat" />
        <h1>JumpyCat</h1>
      </div>
      <div className="form-content-right">
        <h1 className="form-success">
          Nós recebemos seu cadastro, você já pode fazer o login!!
        </h1>
        <img className="form-img-2" src="img/img-3.svg" alt="success" />
      </div>
    </div>
  );
};

export default FormSuccess;
