import React from "react";
import styled from "styled-components";
import { colors } from "styles/theme";

// Communication stuff
import { useRouter } from "next/router";

// Material-ui stuff
// import Grid from "@material-ui/core/Grid";

// Redux stuff
// import { useSelector } from "react-redux";
// import { useDispatch } from "react-redux";
// import { RootState } from "store";

// Components
import Button from "atoms/Button";
import SignInForm from "components/SignInForm";
import Overlay from "atoms/Overlay";

import { BrowserRouter, Switch, Route, Link } from "react-router-dom";

export default function fun(props) {
  const nextRouter = useRouter();

  React.useEffect(() => {
    console.log(nextRouter.pathname);
  });

  // const dispatch = useDispatch();

  return (
    <>
      <SignInForm></SignInForm>
    </>
  );
}

// const Wrapper = styled.div``;
