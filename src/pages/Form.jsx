import React from "react";
import UserForm from "./UserForm";
import "./Form.css";

const Form = () => {
  return (
    <>
      <div className="form-container">
        <span className="close-btn">×</span>
        <div className="form-content-left">
          <img className="form-img" src="img/gato-black-white.png" alt="cat" />
          <h1>JumpyCat</h1>
        </div>

        <UserForm />
      </div>
    </>
  );
};

export default Form;
