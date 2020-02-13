import React, { Component } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import axios from "axios";
import HeaderMemo from "./Header";
import { token$, updateToken, checkItems$ } from "./Store";
import { FaPen, FaUnlock, FaClipboardList } from "react-icons/fa";
import Card from "./Card";
import Circle from "./Circle";
import styles from "./Home.module.css";
import PopUp from "./PopUp";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: token$.value,
      page: "home",
      cards: [
        { id: 1, name: "card-one" },
        { id: 2, name: "card-two" },
        { id: 3, name: "card-three" }
      ],
      circles: [
        { id: 1, name: "circle-one" },
        { id: 2, name: "circle-two" },
        { id: 3, name: "circle-three" }
      ],
      todos: [],
      checkItems: checkItems$.value,
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
          console.log(err);
          if (err.response && err.response.status === 401) {
            this.setState({ tokenExpired: true });
          }
        });
    }
  };

  componentWillUnmount() {
    this.subscriptions.forEach(s => s.unsubscribe());
    this.source.cancel();
  }

  logOut = () => {
    updateToken(null);
  };

  render() {
    console.log("checked items", this.state.checkItems.size);
    const { token } = this.state;
    const { todos } = this.state;

    let renderHome;

    if (token) {
      renderHome = (
        <>
          <div className={styles.circleCtn}>
            {this.state.circles.map(circle => (
              <Circle
                key={circle.id}
                className={styles.myCircle}
                id={circle.name}
                todos={todos}
                checkItemAmount={this.state.checkItems.size}
              />
            ))}
          </div>
          <Link to="/todo" className={`links ${styles.todoLink}`}>
            <FaClipboardList style={{ margin: "0px" }} />{" "}
            <span style={{ margin: "0px 3px" }}>Todolist</span>
          </Link>
        </>
      );
    }

    if (token === null) {
      renderHome = (
        <>
          <div className={styles.cardCtn}>
            {this.state.cards.map(card => (
              <Card key={card.id} className={styles.card} id={card.name} />
            ))}
          </div>

          <Link to="/login" className={styles.smlLinks}>
            <FaUnlock style={{ margin: "0 5px" }} />{" "}
            <span style={{ margin: "0" }}>Log In</span>
          </Link>

          <Link to="/register" className={styles.smlLinks}>
            <FaPen style={{ margin: "0 5px " }} />{" "}
            <span style={{ margin: "0" }}>Register</span>
          </Link>
        </>
      );
    }

    // console.log(this.state.token);
    return (
      <>
        <div className="container">
          <Helmet>
            <title>Home</title>
          </Helmet>
          <HeaderMemo {...this.state} logOut={this.logOut} />
          <div className="wrapCtn">{renderHome}</div>
        </div>
        {this.state.tokenExpired && <PopUp />}
      </>
    );
  }
}

export default Home;
