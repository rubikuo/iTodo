import React from "react";
import { Link } from "react-router-dom";
import { FaSignOutAlt, FaUserAlt, FaUnlock, FaPen } from "react-icons/fa";
import jwt from "jsonwebtoken";
import styles from "./Header.module.css";

const Header = ({ page, logOut, token }) => {
   

  let content;

  if (token === null || token === undefined) {
    content = (
      <Link to="/" className={`${styles.links} ${styles.logo}`}>
        iToDo
      </Link>
    );
  }

  if (page === "register" || page === "logIn") {
    content = (
      <>
        <Link to="/" className={`${styles.links} ${styles.logo}`}>
          iToDo
        </Link>
        <div className={styles.linksCtn}>
          <Link className={styles.links} to="/login">
            <FaUnlock /> <span className={styles.logInText}>Log in</span>
          </Link>
          <Link className={styles.links} to="/register">
            <FaPen /> <span className={styles.registerText}>Register</span>
          </Link>
        </div>
      </>
    );
  }

  if (token) {
    console.log(token)
    let email;
    let decoded = jwt.decode(token);
    email = decoded.email;
    content = (
      <>
        <Link to="/" className={`${styles.links} ${styles.logo}`}>
          iToDo
        </Link>
        <p>just for testing</p>

        <div className={styles.linksCtn}>
          <span style={{ color: "white", margin: "0 10px" }}>
            <FaUserAlt className="userIcon" />
            <span className={styles.headerEmail}>{email}</span>
          </span>
          <Link
            to="/"
            onClick={logOut}
            className={`${styles.logOutBtn} ${styles.links}`}
          >
            <FaSignOutAlt /> <span className={styles.logoutText}>Log out</span>
          </Link>
        </div>
      </>
    );
  }

  return <nav className={styles.header}>{content}</nav>;
};

let HeaderMemo = React.memo(Header);

export default HeaderMemo;
