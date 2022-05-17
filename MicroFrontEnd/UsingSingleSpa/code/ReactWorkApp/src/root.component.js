import React from "react";
import { BrowserRouter, Route, Link, Redirect, Switch } from "react-router-dom";
import Home from "./Home";
import About from "./About";

export default function Root(props) {
  let temp = <section>{props.name} is mounted!</section>;
  return (
    <BrowserRouter basename="/todos">
      {temp}
      <div>
        <Link to="/home">Home</Link>&nbsp;&nbsp;
        <Link to="/about">About</Link>
      </div>
      <Switch>
        <Route path={"/home"}>
          <Home />
        </Route>
        <Route path={"/about"}>
          <About />
        </Route>
        <Route path="/">
          <Redirect to="/home" />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
