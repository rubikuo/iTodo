import React, { Component } from "react";
import { Helmet } from "react-helmet";
import axios from "axios";
import { token$, updateToken } from "./Store";
import { Redirect } from "react-router-dom";
import HeaderMemo from "./Header";
import Form from "./Form";
import { FaUser, FaInfoCircle } from "react-icons/fa";

// get method // post method
export default class LogIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      error: false,
      token: token$.value,
      login: false,
      page: "logIn",
      eyeOpen: "block",
      eyeClose: "none",
      inputType: "password"
    };
  }

  componentDidMount() {
    this.subscription = token$.subscribe(token => {
      this.setState({ token });
    });
  }

  componentWillUnmount() {
    this.subscription.unsubscribe();
  }

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

  onSubmit = e => {
    e.preventDefault();
    let authData = {
      email: this.state.email,
      password: this.state.password
    };

    axios
      .post("http://3.120.96.16:3002/auth", authData)
      .then(response => {
        this.setState({ error: false, login: true });
        updateToken(response.data.token);
      })
      .catch(err => {
        this.setState({ error: true });
        console.error(err);
      });
  };

  render() {
    if (this.state.token) {
      return <Redirect to="/todo" />;
    }
    let showMsg;
    if (this.state.error) {
      showMsg = (
        <p style={{ color: "white" }}>
          <FaInfoCircle /> Invalid login information
        </p>
      );
    }


    return (
      <div className="container">
        <Helmet>
          <title>Log In</title>
        </Helmet>
        <HeaderMemo page={this.state.page} />
        <div className="wrapCtn">
          <FaUser className="userHeadIcon" />
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
