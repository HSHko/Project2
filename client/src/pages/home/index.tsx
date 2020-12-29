import React from "react";
import styled from "styled-components";

// Communication stuff
// import axios from 'axios';
// import NextLink from "next/link";
// import NextRouter from "next/router";
// import { useRouter } from "next/router";

// Material-ui stuff
// import Grid from "@material-ui/core/Grid";
// import TextField from "@material-ui/core/TextField";

// Redux stuff
// import { shallowEqual, useSelector } from "react-redux";
// import { useDispatch } from "react-redux";
// import { RootState } from "store";

// Components
// import Button from 'atoms/Button';
import Home from "components/home/Home";

export default function fun(props) {
  // const nextRouter = useRouter();
  // const dispatch = useDispatch();

  React.useEffect(() => {
    // console.log(nextRouter.pathname);
  });

  return (
    <>
      <Home></Home>
    </>
  );
}
