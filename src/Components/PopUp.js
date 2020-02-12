import React, { useState } from "react";
import ReactDOM from "react-dom";
import { updateToken } from "./Store";
import { Redirect, Link } from "react-router-dom";
import { FaUnlock, FaHome } from "react-icons/fa";

const PopUp = () => {
  const [page, updatePage] = useState("");

  const controlPage = pageOption => {
    if (pageOption === "home") {
      updatePage("home");
    } else if (pageOption === "login") {
      updatePage("login");
    }
  };

  if (page === "home") {
    return <Redirect to="/"> </Redirect>;
  } else if (page === "login") {
    return <Redirect to="/login"> </Redirect>;
  }

  return ReactDOM.createPortal(
    <div className="popUp">
      <p className="popTitle">Session is expired... </p>
      <div className="popLinkWrap">
        <Link
          to="/"
          onClick={() => {
            updateToken(null);
            controlPage("home");
          }}
          className="popUplinkTag"
        >
          <FaHome style={{ margin: "0px" }} />
          <span style={{ margin: "0px 3px" }}> Home</span>
        </Link>

        <Link
          to="/login"
          onClick={() => {
            updateToken(null);
            controlPage("login");
          }}
          className="popUplinkTag"
        >
          <FaUnlock style={{ margin: "0px" }} />
          <span style={{ margin: "0px 3px" }}>Log In</span>
        </Link>
      </div>
    </div>,
    document.body
  );
};

export default PopUp;
