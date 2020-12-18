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
import { store } from "store";
import { userAction } from "store";

// Components
// import Button from 'atoms/Button';

// interface Props {}

export default function fun(props) {
  // const nextRouter = useRouter();
  const dispatch = useDispatch();

  React.useEffect(() => {
    // console.log(new Cookies().get("test"));
  });

  // const nextRouter = useRouter();

  const handleOnClick = (label) => {
    const cookies = new Cookies();
    switch (label) {
      case "setCookie":
        console.log({ label: label });
        store.dispatch(userAction.setAuthorizationHeader("7272") as any);
        break;
      case "deleteCookie":
        console.log({ label: label });
        store.dispatch(userAction.removeAuthorizationHeader() as any);
        // cookies.remove("test", { path: "/" });
        break;
      case "getCookie":
        console.log({ label: label });
        const cookie = cookies.get("fbIdToken");
        console.log(cookie);
        break;
      default:
        break;
    }
  };

  return (
    <>
      <h1>Script</h1>
      <button onClick={() => handleOnClick("setCookie")}>
        <h1>SET COOKIE</h1>
      </button>
      <button onClick={() => handleOnClick("deleteCookie")}>
        <h1>DELETE COOKIE</h1>
      </button>
      <button onClick={() => handleOnClick("getCookie")}>
        <h1>SHOW COOKIE</h1>
      </button>
    </>
  );
}
