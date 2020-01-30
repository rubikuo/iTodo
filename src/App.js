import React from "react";
import "./App.css";
import { Route, BrowserRouter as Router } from "react-router-dom";
import Home from "./Components/Home";
import LogIn from "./Components/LogIn";
import Register from "./Components/Register";
import Todo from "./Components/Todo";

function App() {
  return (
    <div className="container">
      <Router>
        <Route path="/home" component={Home}></Route>
        <Route exact path="/" component={Todo}></Route>
        <Route path="/register" component={Register}></Route>
        <Route path="/login" component={LogIn}></Route>
       
      </Router>
    </div>
  );
}

export default App;
