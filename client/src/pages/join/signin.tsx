import React from "react";
import styled from "styled-components";
import { colors } from "styles/theme";

// Communication stuff
import NextRouter from "next/router";
import { useRouter } from "next/router";
import cookieCutter from "cookie-cutter";
import axios from "axios";

// Material-ui stuff
// import Grid from "@material-ui/core/Grid";

// Redux stuff
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { RootState } from "store";
import { shallowEqual } from "react-redux";
import { userAction } from "store";

// Components
import Button from "atoms/Button";
import SignInForm from "components/SignInForm";
import Overlay from "atoms/Overlay";

import { BrowserRouter, Switch, Route, Link } from "react-router-dom";

export default function fun(props) {
  const nextRouter = useRouter();
  const dispatch = useDispatch();

  const isAuthenticated = useSelector(
    (x: RootState) => x.userReducer.isAuthenticated,
    shallowEqual,
  );

  React.useEffect(() => {
    console.log(nextRouter.pathname);
    if (isAuthenticated) {
      NextRouter.push("/");
    } else {
      cookieCutter.set("fbIdToken", "", { expires: new Date(0) });
      delete axios.defaults.headers.common["Authorization"];
    }
  });

  return (
    <>
      <SignInForm></SignInForm>
    </>
  );
}

// const Wrapper = styled.div``;
