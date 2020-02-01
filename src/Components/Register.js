import React, { Component } from "react";
import { Helmet } from "react-helmet";
import axios from "axios";
import { css } from "glamor";
import { Redirect, Link } from "react-router-dom";

// to push new user info to server
export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      error: null,
      registered: false
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onEmailChange = this.onEmailChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
  }

  onSubmit(e) {
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
  }

  onEmailChange(e) {
    this.setState({ email: e.target.value });
  }

  onPasswordChange(e) {
    this.setState({ password: e.target.value });
  }

  render() {
    let cssStyle = css({
      color: "blue",
      backgroundColor: "pink",
      height: "3rem",
      width: "5rem",
      ":hover": {
        color: "white",
        backgroundColor: "black"
      }
    });
    if (this.state.registered) {
      return <Redirect to="/login" />;
    }

    let showMsg;

    if (this.state.error === "User with that email address exists") {
      showMsg = (
        <p>
          {this.state.error}, Go to <Link to="/login">Log In</Link>
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
        <form onSubmit={this.onSubmit}>
          <label>Email</label>
          <input
            type="email"
            onChange={this.onEmailChange}
            value={this.state.email}
          />

          <label>Password</label>
          <input
            type="password"
            onChange={this.onPasswordChange}
            value={this.state.password}
          />

          <button className={cssStyle} type="submit">
            Register
          </button>
        </form>
        {showMsg}
      </div>
    );
  }
}
