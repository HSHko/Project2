import React from "react";
// import styled from "styled-components";

// import Link from "next/link";
// import axios from 'axios';

// Material-ui stuff
// import Grid from "@material-ui/core/Grid";

// Redux stuff
// import { useSelector } from "react-redux";
// import { useDispatch } from "react-redux";
// import { RootState } from "store";

// Components
import Button from "atoms/Button";
import LoginForm from "components/LoginForm";

// interface Props {}

export default function fun(props) {
  React.useEffect(() => {
    console.log("render");
  });

  // const dispatch = useDispatch();

  return (
    <>
      <h1>Script</h1>
      <LoginForm></LoginForm>
    </>
  );
}

// const Wrapper = styled.div``;
