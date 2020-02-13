import React from "react";
import "./App.css";
import { Route, BrowserRouter as Router } from "react-router-dom";
import Home from "./Components/Home";
import LogIn from "./Components/LogIn";
import Register from "./Components/Register";
import Todo from "./Components/Todo";
import FooterMemo from "./Components/Footer";

function App() {
  return (
    <div className="container">
      <Router>
        <Route exact path="/" component={Home}></Route>
        <Route path="/todo" component={Todo}></Route>
        <Route path="/register" component={Register}></Route>
        <Route path="/login" component={LogIn}></Route>
        <FooterMemo />
      </Router>
    </div>
  );
}

export default App;
