import React, { Component } from "react";
import { Helmet } from "react-helmet";
import axios from "axios";
import { token$, updateToken } from "./Store";
import { Redirect } from "react-router-dom";
import jwt from 'jsonwebtoken';


export default class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: {},
      token: token$.value, 
      decodedToken: ""
    };
  }

  componentDidMount() {
    this.subscription = token$.subscribe(token => {
        const decoded = jwt.decode(token);
      console.log(decoded);
      this.setState({ token, decodedToken:decoded });
      
      
    });

    let CancelToken = axios.CancelToken;
    this.source = CancelToken.source();
    if(this.state.token !== null) {
    axios
      .get("http://3.120.96.16:3002/todos", {
        headers: {
          Authorization: `Bearer ${this.state.token}`,
          cancelToken: this.source.token
        }
      })
      .then(response => {
        this.setState({ profile: response.data.profile });
      })
      .catch(error => {
        console.log(error);
        updateToken(null);
      });
    }
  }

  logOut() {
    updateToken(null);
  }

  componentWillUnmount() {
    this.source.cancel();
    this.subscription.unsubscribe();
  }

  render() {
    if (!this.state.token) {
      return <Redirect to="/home" />;
    }

    // let email = this.state.decodedToken.email;

    return (

      <div className="container">
          <Helmet><title>Todos</title></Helmet>
          {/* <h1>Welcome {email}</h1> */}
          <h2>Todo</h2>
        <button onClick={this.logOut} className="logOutBtn">
          Log Out
        </button>
      </div>
    );
  }
}
