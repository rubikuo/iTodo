import React from "react";
import { Link } from "react-router-dom";
import { FaSignOutAlt, FaUserAlt, FaUnlock, FaPen } from "react-icons/fa";

const Header = ({ page, decodedToken, logOut }) => {
  let email;
  if (decodedToken) {
    email = decodedToken.email;
  }
  console.log(email);
  let content;

  if (page === "register" || page === "logIn") {
    content = (
      <>
        <Link className="links" to="/login">
          <FaUnlock /> Log in
        </Link>
        <Link className="links" to="/register">
          <FaPen /> Register
        </Link>
      </>
    );
  }

  if (page === "todo") {
    content = (
      <>
        <span style={{ color: "white", margin: "0 10px" }}>
          <FaUserAlt /> {email}
        </span>
        <Link to="/" onClick={logOut} className="logOutBtn links">
          <FaSignOutAlt /> Log out
        </Link>
      </>
    );
  }

  return <nav className="header">{content}</nav>;
};

let HeaderMemo = React.memo(Header);

export default HeaderMemo;
