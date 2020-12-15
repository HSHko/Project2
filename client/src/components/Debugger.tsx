import React from "react";
import styled from "styled-components";

// Communication stuff
import axios from "axios";
// import NextLink from "next/link";
// import NextRouter from "next/router";
// import { useRouter } from "next/router";
import Cookies from "universal-cookie";

// Material-ui stuff
// import Grid from "@material-ui/core/Grid";
// import TextField from "@material-ui/core/TextField";
// import PersonIcon from "@material-ui/icons/Person";

// Redux stuff
// import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
// import { RootState } from "store";

// Components
// import Button from 'atoms/Button';

// interface Props {}

export default function fun(props) {
  // const nextRouter = useRouter();
  const dispatch = useDispatch();

  React.useEffect(() => {
    // console.log(nextRouter.pathname);
  });

  // const nextRouter = useRouter();

  const handleOnClickDeleteToken = React.useCallback(() => {
    const cookies = new Cookies();
    cookies.remove("fbIdToken", { path: "/" });
    delete axios.defaults.headers.common["Authorization"];
    dispatch({ type: "user/SET_UNAUTHENTICATED" });
  }, []);

  const handleOnClickShowCookie = React.useCallback(() => {
    const cookies = new Cookies();
    console.log(cookies.get("fbIdToken"));
  }, []);

  return (
    <>
      <h1>Script</h1>
      <button onClick={() => handleOnClickDeleteToken()}>
        <h1>DELETE COOKIE</h1>
      </button>
      <button onClick={() => handleOnClickShowCookie()}>
        <h1>SHOW COOKIE</h1>
      </button>
    </>
  );
}

// const Wrapper = styled.div``;
