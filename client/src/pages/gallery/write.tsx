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
import Write from "components/gallery/Write";

export default function fun(props) {
  const isAuthenticated = useSelector(
    (x: RootState) => x.userReducer.isAuthenticated,
    shallowEqual,
  );

  React.useEffect(() => {
    // if (!isAuthenticated) {
    //   alert("書き込みにはログインが必要です。");
    //   NextRouter.push("/join/signin");
    // }
  }, []);

  // const dispatch = useDispatch();

  return (
    <Wrapper>
      <Write></Write>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 80%;
  max-width: 1200px;
  margin: 0 auto;
`;
