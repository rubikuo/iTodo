import React, { Component } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import axios from "axios";
import HeaderMemo from "./Header";
import { token$, updateToken } from "./Store";
import { FaAngleRight, FaClipboardList } from "react-icons/fa";
import Card from "./Card";
import Circle from "./Circle";
import styles from "./Home.module.css";

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
      todos: []
    };
  }

  componentDidMount() {
    this.subscription = token$.subscribe(token => {
      this.setState({ token });
    });
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
        });
    }
  };

  componentWillUnmount() {
    this.subscription.unsubscribe();
    this.source.cancel();
  }

  logOut = () => {
    updateToken(null);
  };

  render() {
    const { token } = this.state;
    const { todos } = this.state;
    const todosAmount = todos.length;
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
              />
            ))}
          </div>
          <Link to="/todo" className="links"><FaClipboardList/> Todolist</Link>
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

          <div className={styles.smlLinks}>
            <div>Log In</div>
            <Link to="/login" className={styles.linkTag}>
              <FaAngleRight />
            </Link>
          </div>
          <div className={styles.smlLinks}>
            <div> Register </div>
            <Link to="/register" className={styles.linkTag}>
              <FaAngleRight />
            </Link>
          </div>
        </>
      );
    }

    console.log(this.state.token);
    return (
      <div className="container">
        <Helmet>
          <title>Home</title>
        </Helmet>
        <HeaderMemo {...this.state} logOut={this.logOut} />
        <div className="wrapCtn">{renderHome}</div>
      </div>
    );
  }
}

export default Home;
