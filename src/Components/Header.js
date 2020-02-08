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
        <Link to="/" className="links logo">
          iToDo
        </Link>
        <div className="linksCtn">
          <Link className="links" to="/login">
            <FaUnlock /> Log in
          </Link>
          <Link className="links" to="/register">
            <FaPen /> Register
          </Link>
        </div>
      </>
    );
  }

  if (token) {
    content = (
      <>
        <Link to="/" className="links logo">
          iToDo
        </Link>

        <div className="linksCtn">
          <span style={{ color: "white", margin: "0 10px" }}>
            <FaUserAlt /> {email}
          </span>
          <Link to="/" onClick={logOut} className="logOutBtn links">
            <FaSignOutAlt /> Log out
          </Link>
        </div>
      </>
    );
  }

  return <nav className="header">{content}</nav>;
};

let HeaderMemo = React.memo(Header);

export default HeaderMemo;
