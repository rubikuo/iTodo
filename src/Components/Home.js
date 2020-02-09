import React, { Component } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import HeaderMemo from "./Header";
import { token$, updateToken } from "./Store";
import { FaAngleRight } from "react-icons/fa";
import Card from "./Card";
import styles from "./Home.module.css"

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
      ]
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

  logOut = () => {
    updateToken(null);
  };

  render() {
    const { token } = this.state;
    let renderHome;

    if (token) {
      renderHome = (
        <>
          <p>You have 0 todo</p>
          <Link to="/todo">Todolist</Link>
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
