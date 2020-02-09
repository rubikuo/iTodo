import React from "react";
import { Link } from "react-router-dom";
import {
  FaSignOutAlt,
  FaUserAlt,
  FaUnlock,
  FaPen,
  FaClipboardList
} from "react-icons/fa";
import jwt from "jsonwebtoken";
import styles from "./Header.module.css";

const Header = ({ page, logOut, token }) => {
  let email;
  if (token) {
    let decoded = jwt.decode(token);
    email = decoded.email;
  }

  let content;

  if (page === "register" || page === "logIn" || token === null) {
    content = (
      <>
        <Link to="/" className={`${styles.links} ${styles.logo}`}>
          iToDo
        </Link>
        <div className={styles.linksCtn}>
          <Link className={styles.links} to="/login">
            <FaUnlock /> Log in
          </Link>
          <Link className={styles.links} to="/register">
            <FaPen /> Register
          </Link>
        </div>
      </>
    );
  }

  if (token) {
    content = (
      <>
        <Link to="/" className={`${styles.links} ${styles.logo}`}>
          iToDo
        </Link>

        <div className={styles.linksCtn}>
          <span style={{ color: "white", margin: "0 10px" }}>
            <FaUserAlt /> {email}
          </span>
          <Link
            to="/"
            onClick={logOut}
            className={`${styles.logOutBtn} ${styles.links}`}
          >
            <FaSignOutAlt /> Log out
          </Link>
        </div>
      </>
    );
  }

  return <nav className={styles.header}>{content}</nav>;
};

let HeaderMemo = React.memo(Header);

export default HeaderMemo;
