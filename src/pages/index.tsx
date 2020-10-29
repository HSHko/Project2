import React from "react";
import Navbar from "components/navigation/Navbar";
import Home from "./home";
// import { Switch, Route } from "react-router-dom";

export default function fun(props) {
  console.log(props);
  return (
    <>
      <Navbar></Navbar>
      <Home></Home>
    </>
  );
}
