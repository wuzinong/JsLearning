import React from "react";
import { BrowserRouter, Route, Link, Redirect, Switch } from "react-router-dom";
import Home from "./Home";
import About from "./About";
import Parcel from "single-spa-react/parcel";

export default function Root(props) {
  let temp = <section>{props.name} is mounted!</section>;
  return (
    <BrowserRouter basename="/todos">
      <Parcel config={System.import("@study/navbar")} />
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
