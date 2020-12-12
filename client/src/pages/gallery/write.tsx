import React from "react";
import styled from "styled-components";

// Communication stuff
// import axios from 'axios';
// import NextLink from "next/link";
import NextRouter from "next/router";
import { useRouter } from "next/router";

// Material-ui stuff
// import Grid from "@material-ui/core/Grid";
// import TextField from "@material-ui/core/TextField";
// import PersonIcon from "@material-ui/icons/Person";

// Redux stuff
import { useSelector } from "react-redux";
// import { useDispatch } from "react-redux";
import { RootState } from "store";
import { shallowEqual } from "react-redux";

// Components
import Button from "atoms/Button";
import WriteForm from "components/gallery/WriteForm";

// interface Props {}

export default function fun(props) {
  // const nextRouter = useRouter();

  React.useEffect(() => {
    // if (!isAuthenticated) {
    //   alert("書き込みにはログインが必要です。");
    //   NextRouter.push("/join/signin");
    // }
  }, []);

  // const dispatch = useDispatch();
  // const nextRouter = useRouter();

  return (
    <Wrapper>
      <Dropdown>
        <input className="head" type="checkbox"></input>
        <div className="contents">
          <div>111111</div>
          <div>122211</div>
          <div>133311</div>
          <div>144411</div>
        </div>
      </Dropdown>
      <WriteForm></WriteForm>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 80%;
  max-width: 1200px;
  margin: 0 auto;
`;

const Dropdown = styled.div`
  & > {
    &.head {
      position: relative;
    }

    &.contents {
      display: none;
      position: absolute;
      background-color: orange;
    }

    &.head:checked + .contents {
      display: block;
    }
  }
`;
