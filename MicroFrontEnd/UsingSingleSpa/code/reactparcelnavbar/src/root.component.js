import React from "react";
import { BrowserRouter, Link } from "react-router-dom";
export default function Root(props) {
  return (
    <BrowserRouter>
      <div style={{ textAlign: "center" }}>
        <Link to="/">@single-spa/welcome</Link>&nbsp;&nbsp;&nbsp;&nbsp;
        <Link to="/bran">@study/bran</Link>&nbsp;&nbsp;&nbsp;&nbsp;
        <Link to="/todos">@study/todos</Link>&nbsp;&nbsp;&nbsp;&nbsp;
        <Link to="/testvue">@study/testvue</Link>&nbsp;&nbsp;&nbsp;&nbsp;
      </div>
    </BrowserRouter>
  );
}
