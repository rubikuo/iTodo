import React from "react";
import {FaEye, FaEyeSlash} from "react-icons/fa"


const Form = ({
  onSubmit,
  onEmailChange,
  onPasswordChange,
  onEyeChange,
  email,
  password,
  page,
  eyeOpen,
  eyeClose, 
  inputType,
}) => {
  let button;
  if (page === "register") {
    button = <button className="registerBtn"> Register </button>;
  } else if (page === "logIn") {
    button = <button className="registerBtn"> Log In </button>;
  }
   
  
  return (
    <form onSubmit={onSubmit}>
      
      <input
        placeholder="Email"
        type="email"
        onChange={onEmailChange}
        value= {email}
      />
      <div className ="inputDiv">
      <input
        placeholder="Password"
        type={inputType}
        onChange={onPasswordChange}
        value={password}
      />
      <i className="eyeIcon" onClick={onEyeChange} style={{display: eyeOpen}}><FaEye /></i>
      <i className="eyeIcon" onClick={onEyeChange} style = {{display: eyeClose}}><FaEyeSlash /></i>
      </div>
      {button}
    </form>
  );
};

export default Form;
