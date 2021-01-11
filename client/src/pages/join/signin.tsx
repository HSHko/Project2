import React from "react";
import styled from "styled-components";
import { colors } from "styles/theme";

// Communication stuff
import NextRouter from "next/router";
import { useRouter } from "next/router";
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
import SignInForm from "components/SignInForm";

export default function fun(props) {
  const nextRouter = useRouter();
  const dispatch = useDispatch();

  const isAuthenticated = useSelector(
    (x: RootState) => x.userReducer.isAuthenticated,
    shallowEqual,
  );

  React.useEffect(() => {
    if (isAuthenticated) {
      NextRouter.push("/community/list?page=1");
    }
  }, [isAuthenticated]);

  return (
    <>
      <SignInForm></SignInForm>
    </>
  );
}

// const Wrapper = styled.div``;
