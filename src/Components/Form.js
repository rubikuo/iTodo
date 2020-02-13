import React from "react";
import styles from "./Form.module.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Form = ({
  onSubmit,
  onInputChange,
  onEyeChange,
  email,
  password,
  page,
  eyeOpen,
  eyeClose,
  inputType
}) => {
  let button;
  if (page === "register") {
    button = <button className={styles.registerBtn}> Register </button>;
  } else if (page === "logIn") {
    button = <button className={styles.loginBtn}> Log In </button>;
  }

  return (
    <form onSubmit={onSubmit}>
      <input
        placeholder="Email"
        type="email"
        name="email"
        onChange={onInputChange}
        value={email}
      />
      <div className={styles.inputDiv}>
        <input
          placeholder="Password"
          type={inputType}
          name="password"
          onChange={onInputChange}
          value={password}
        />
        <i
          className={styles.eyeIcon}
          onClick={onEyeChange}
          style={{ display: eyeOpen }}
        >
          <FaEye />
        </i>
        <i
          className={styles.eyeIcon}
          onClick={onEyeChange}
          style={{ display: eyeClose }}
        >
          <FaEyeSlash />
        </i>
      </div>
      {button}
    </form>
  );
};

export default Form;
