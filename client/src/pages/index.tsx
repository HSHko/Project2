import React from "react";
import Home from "./home";

export default function fun(props) {
  React.useEffect(() => {
    console.log("render");
  });
  return (
    <>
      <Home></Home>
    </>
  );
}
