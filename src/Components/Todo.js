/* eslint-disable no-unused-expressions */
import React, { Component } from "react";
import { Helmet } from "react-helmet";
import axios from "axios";
import { token$, updateToken } from "./Store";
import { Redirect } from "react-router-dom";
import jwt from "jsonwebtoken";
import { FaPlusCircle, FaTrash } from "react-icons/fa";
import HeaderMemo from "./Header";

export default class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: token$.value,
      decodedToken: "",
      todos: [],
      addContent: "",
      check: "",
      login: true,
      page: "todo",
      errorMsg: ""
    };
    this.addTodo = this.addTodo.bind(this);
    this.submitTodo = this.submitTodo.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.fetchData = this.fetchData.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
  }

  componentDidMount() {
    this.subscription = token$.subscribe(token => {
      const decoded = jwt.decode(token);
      this.setState({ token, decodedToken: decoded });
    });
    this.fetchData();
  }

  fetchData() {
    let { token } = this.state;
    let CancelToken = axios.CancelToken;
    this.source = CancelToken.source();
    if (token !== null) {
      axios
        .get("http://3.120.96.16:3002/todos", {
          headers: {
            Authorization: `Bearer ${token}`,
            cancelToken: this.source.token
          }
        })
        .then(response => {
          let data = response.data.todos;
          this.setState({ todos: data });
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
  }

  handleCheck(e) {
    e.target.classList.toggle("checked");
  }

  logOut() {
    updateToken(null);
  }

  submitTodo(e) {
    e.preventDefault();
    if (this.state.email === "" || this.state.password === "") return;

    axios
      .post(
        "http://3.120.96.16:3002/todos",
        { content: this.state.addContent },
        {
          headers: {
            Authorization: `Bearer ${this.state.token}`
          }
        }
      )
      .then(response => {
        // the response is the data we added so we an directly add it to the state without fetching the data from the server
        console.log(response.data);
        // this.fetchData();

        this.setState({
          addContent: "",
          todos: [...this.state.todos, response.data.todo]
        });
      })
      .catch(err => {
        console.log(err.response.data);
        this.setState({ errorMsg: err.response.data.details[0].message });
      });
  }

  addTodo(e) {
    this.setState({ addContent: e.target.value });
  }

  deleteItem(id) {
    axios
      .delete(`http://3.120.96.16:3002/todos/${id}`, {
        headers: {
          Authorization: `Bearer ${this.state.token}`
        }
      })
      .then(response => {
        console.log(response);
        this.setState({
          todos: this.state.todos.filter(t => t.id !== id)
        });
      });
  }

  componentWillUnmount() {
    this.source.cancel();
    this.subscription.unsubscribe();
  }

  render() {
    let showMsg = <p>{this.state.errorMsg}</p>;

    if (!this.state.token) {
      return <Redirect to="/" />;
    }
    // let email = this.state.decodedToken.email;

    let { todos } = this.state;
    let { check } = this.state;

    let renderTodo = todos.length
      ? todos.map(todo => {
          return (
            <li
              key={todo.id}
              id={todo.id}
              className={`item ${check}`}
              onClick={e => {
                this.handleCheck(e);
              }}
            >
              {todo.content}
              <button
                onClick={() => {
                  this.deleteItem(todo.id);
                }}
                className="deleteBtn"
              >
                <FaTrash size="1rem" />
              </button>
            </li>
          );
        })
      : null;

    return (
      <div className="container">
        <Helmet>
          <title>Todo List</title>
        </Helmet>
        <HeaderMemo
          decodedToken={this.state.decodedToken}
          page={this.state.page}
          logOut={this.logOut}
        />
        <div className="wrapCtn">
          <h2 className="todoHeader">Todo</h2>
          <form onSubmit={this.submitTodo} className="todoForm">
            <input
              placeholder="Something to do..."
              onChange={this.addTodo}
              type="text"
              value={this.state.addContent}
            />
            <button>
              <FaPlusCircle size="2rem" />
            </button>
          </form>
          <ul className="collection with-header todoContent">{renderTodo}</ul>
        </div>
        {showMsg}
      </div>
    );
  }
}
