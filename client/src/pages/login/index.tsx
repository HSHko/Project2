import React from "react";
import styled from "styled-components";
import { colors } from "styles/theme";

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
import Overlay from "atoms/Overlay";
import { useRouter } from "next/router";

// interface Props {}

export default function fun(props) {
  const router = useRouter();
  React.useEffect(() => {
    console.log(router.pathname);
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
