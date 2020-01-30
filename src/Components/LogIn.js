import React, { Component } from "react";
import { Helmet } from "react-helmet";
import axios from "axios";
import { token$, updateToken } from "./Store";
import { Redirect } from "react-router-dom";



// get method
// post method
export default class LogIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      error: false,
      token: token$.value
    };

    this.onEmailChange = this.onEmailChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.subscription = token$.subscribe(token => {
      this.setState({ token });
    });
  }

  componentWillUnmount() {
    this.subscription.unsubscribe();
  }

  onEmailChange(e) {
    this.setState({ email: e.target.value });
  }

  onPasswordChange(e) {
    this.setState({ password: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    let authData = {
      email: this.state.email,
      password: this.state.password
    };

    axios
      .post("http://3.120.96.16:3002/auth", authData)
      .then(response => {
        this.setState({ error: false });
        updateToken(response.data.token);
       
      })
      .catch(err => {
        this.setState({ error: true });
        console.error(err);
      });
  }
  render() {
    if (this.state.token) {
      return <Redirect to="/" />;
    }
    let errorMsg = null;
    if (this.state.error) {
      errorMsg = "Invalid login values";
    }

    return (
      <div className="container">
        <Helmet>
          <title>Log In</title>
        </Helmet>
        <p>{errorMsg}</p>
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

          <button type="submit">Login</button>
        </form>
      </div>
    );
  }
}
