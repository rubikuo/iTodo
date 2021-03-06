/* eslint-disable no-unused-expressions */
import React, { Component } from "react";
import { Helmet } from "react-helmet";
import axios from "axios";
import {
  token$,
  updateToken,
  checkItems$,
  updateCheckItem,
  removeCheckItem
} from "./Store";
import { FaTrash } from "react-icons/fa";
import HeaderMemo from "./Header";
import TodoForm from "./TodoForm";
import styles from "./Todo.module.css";
import PopUp from "./PopUp";

export default class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: token$.value,
      todos: [],
      checkItems: checkItems$.value,
      addContent: "",
      login: true,
      page: "todo",
      errorMsg: "",
      tokenExpired: false
    };
  }

  componentDidMount() {
    this.subscriptions = [
      token$.subscribe(token => {
        this.setState({ token });
      }),
      checkItems$.subscribe(checkItems => {
        this.setState({ checkItems });
      })
    ];
    this.fetchData();
  }

  fetchData = () => {
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
          if (err.response.statusText === "Unauthorized") {
            this.setState({ tokenExpired: true });
          }
        });
    }
  };

  handleCheck = e => {
    e.stopPropagation();
    const id = e.target.id;
    updateCheckItem(id); // toggle the check
  };

  logOut = () => {
    updateToken(null);
    console.log(this.setState.token)
  };

  submitTodo = e => {
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
        // the response is the data we added so we can directly add it to the state without fetching the data from the server
        console.log(response.data);
        // this.fetchData(); // instead of fetching data from server again its better to render the data from client side directly

        this.setState({
          addContent: "",
          todos: [...this.state.todos, response.data.todo] // to concat the data from the post response to the todo list in state
        });
      })
      .catch(err => {
        console.log(err.response.data);
        if (err.response && err.response.status === 401) {
          this.setState({ tokenExpired: true });
        }
        this.setState({ errorMsg: err.response.data.details[0].message });
      });
  };

  addTodo = e => {
    this.setState({ addContent: e.target.value });
  };

  deleteItem = id => {
    axios
      .delete(`http://3.120.96.16:3002/todos/${id}`, {
        headers: {
          Authorization: `Bearer ${this.state.token}`
        }
      })
      .then(response => {
        console.log(response);
        removeCheckItem(id);
        this.setState({
          todos: this.state.todos.filter(t => t.id !== id)
        });
      });
  };

  componentWillUnmount() {
    this.source.cancel();
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  render() {
    console.log(this.state.checkItems);
    let showMsg = <p style={{ color: "red" }}>{this.state.errorMsg}</p>;

    let { todos } = this.state;
    let { check } = this.state;

    let renderTodo = todos.length
      ? todos.map(todo => {
          console.log(check);
          return (
            <li
              key={todo.id}
              id={todo.id}
              className={`${styles.item} ${
                this.state.checkItems.has(todo.id) ? "checked" : ""
              }`}
              onClick={e => {
                this.handleCheck(e);
              }}
            >
              {todo.content}
              <button
                onClick={e => {
                  e.stopPropagation();
                  this.deleteItem(todo.id);
                }}
                className={styles.deleteBtn}
              >
                <FaTrash className={styles.deleteBtnIcon} />
              </button>
            </li>
          );
        })
      : null;

    return (
      <>
        <div className="container">
          <Helmet>
            <title>Todo List</title>
          </Helmet>
          <HeaderMemo token={this.state.token} logOut={this.logOut} />
          <div className="wrapCtn">
            <TodoForm
              submitTodo={this.submitTodo}
              addTodo={this.addTodo}
              addContent={this.state.addContent}
            />
            <ul className={styles.todoContent}>{renderTodo}</ul>
            {showMsg}
          </div>
        </div>
        {this.state.tokenExpired && <PopUp />}
      </>
    );
  }
}
