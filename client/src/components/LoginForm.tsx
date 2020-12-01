import React from "react";
import styled from "styled-components";

// import Link from "next/link";
// import axios from 'axios';

// Material-ui stuff
import { withStyles } from "@material-ui/core/styles";
import { MaterialTheme } from "styles/theme";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import PersonIcon from "@material-ui/icons/Person";

// Redux stuff
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { shallowEqual } from "react-redux";
import { RootState } from "store";
import { userAction } from "store";

// Components
import Button from "atoms/Button";
import DynamicWrapper from "atoms/DynamicWrapper";
import LoadingIndicator from "blocks/LoadingIndicator";

// interface Props {}

const CssTextField = withStyles({
  root: {
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: MaterialTheme.palette.primary.main,
      },
      "&:hover fieldset": {
        borderColor: MaterialTheme.palette.primary.dark,
      },
    },
    width: "80%",
  },
})(TextField);

export default function fun(props) {
  const refs = {
    email: React.useRef<any>(""),
    password: React.useRef<any>(""),
  };

  const errors = useSelector(
    (x: RootState) => x.userReducer.errors,
    shallowEqual,
  );
  const isLoading = useSelector(
    (x: RootState) => x.userReducer.isLoading,
    shallowEqual,
  );

  const dispatch = useDispatch();

  React.useEffect(() => {
    console.log("render");
  }, []);

  const handleOnSubmit = React.useCallback((e) => {
    e.preventDefault();
    const submitData = {
      email: refs.email.current.value,
      password: refs.password.current.value,
    };
    dispatch(userAction.signIn(submitData));
  }, []);

  return (
    <>
      <DynamicWrapper align="center" padding="3rem 1.5rem">
        {isLoading && (
          <LoadingIndicator top={"7rem"} size={120}></LoadingIndicator>
        )}
        <h2>MEMBER LOGIN</h2>
        <h6>
          <br></br>
        </h6>
        <span>
          アカウントをお持ちの方は
          <br />
          下記よりログインしてください。
        </span>
        <h6>
          <br></br>
        </h6>
        <form noValidate onSubmit={handleOnSubmit}>
          <CssTextField
            id="emailInput"
            name="email"
            type="email"
            autoComplete="email"
            fullWidth
            style={{ margin: 8 }}
            label="Eメール"
            placeholder="email@email.com"
            inputRef={refs.email}
            defaultValue={refs.email.current}
            helperText={errors.email}
            error={errors.email ? true : false}
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
          />
          <CssTextField
            id="passwordInput"
            name="password"
            type="password"
            autoComplete="current-password"
            fullWidth
            style={{ margin: 8 }}
            label="パスワード"
            placeholder="パスワードを入力してください。"
            inputRef={refs.password}
            defaultValue={refs.password.current}
            helperText={errors.password}
            error={errors.password ? true : false}
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
          />
          <Button type="submit" disabled={isLoading}>
            Login
          </Button>
        </form>
      </DynamicWrapper>
    </>
  );
}
