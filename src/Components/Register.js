import React, { Component } from "react";
import { Helmet } from "react-helmet";
import axios from "axios";
import { Redirect, Link } from "react-router-dom";
import HeaderMemo from "./Header";
import Form from "./Form";
import { FaClipboard, FaUnlock } from "react-icons/fa";

// to post new user info to server
export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      error: null,
      registered: false,
      login: false,
      page: "register",
      eyeOpen: "block",
      eyeClose: "none",
      inputType: "password"
    };
  }

  onSubmit = e => {
    e.preventDefault();
    if (this.state.email === "" || this.state.password === "") return;

    let userData = {
      email: this.state.email,
      password: this.state.password
    };
    axios
      .post("http://3.120.96.16:3002/register", userData)
      .then(response => {
        console.log(response);
        this.setState({ registered: true });
      })
      .catch(err => {
        if (!err.response) {
          this.setState({ error: err.message });
        } else if (err.response.data.details) {
          this.setState({ error: err.response.data.details[0].message });
        } else {
          this.setState({ error: err.response.data.message });
        }
      });
  };

  onInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onEyeChange = e => {
    if (this.state.eyeOpen === "none") {
      this.setState({
        eyeOpen: "block",
        eyeClose: "none",
        inputType: "password"
      });
    } else {
      this.setState({ eyeOpen: "none", eyeClose: "block", inputType: "text" });
    }
  };

  render() {
    if (this.state.registered) {
      return <Redirect to="/login" />;
    }

    let showMsg;

    if (this.state.error === "User with that email address exists") {
      showMsg = (
        <p style={{ color: "rgb(167, 236, 254)" }}>
          {this.state.error}, Go to
          <Link className="links" to="/login">
            <FaUnlock /> Log In
          </Link>
        </p>
      );
    } else if (this.state.error) {
      showMsg = <p>{this.state.error}</p>;
    }

    return (
      <div className="container">
        <Helmet>
          <title>Register</title>
        </Helmet>
        <HeaderMemo page={this.state.page} />
        <div className="wrapCtn">
          <FaClipboard className="userHeadIcon" />
          <Form
            onSubmit={this.onSubmit}
            onInputChange={this.onInputChange}
            onEyeChange={this.onEyeChange}
            {...this.state}
          />
          {showMsg}
        </div>
      </div>
    );
  }
}
