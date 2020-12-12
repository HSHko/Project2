import React from "react";
import styled from "styled-components";

// Communication stuff
// import axios from 'axios';
// import NextLink from "next/link";
// import NextRouter from "next/router";
import { useRouter } from "next/router";

// Material-ui stuff
// import Grid from "@material-ui/core/Grid";
// import TextField from "@material-ui/core/TextField";
// import PersonIcon from "@material-ui/icons/Person";

// Redux stuff
import { useSelector } from "react-redux";
import { shallowEqual } from "react-redux";
// import { useDispatch } from "react-redux";
import { RootState } from "store";

// Components
// import Button from 'atoms/Button';
import LoadingIndicator from "blocks/LoadingIndicator";

import { colors } from "styles/theme";

// interface Props {}

export default function fun(props) {
  // const nextRouter = useRouter();

  // React.useEffect(() => {
  //   // console.log(nextRouter.pathname);
  // });

  const isUiLoading = useSelector(
    (x: RootState) => x.uiReducer.isHi,
    shallowEqual,
  );

  return (
    <>
      {isUiLoading ? (
        <LoadingIndicator type="browser" size={100}></LoadingIndicator>
      ) : null}
    </>
  );
}

// const Wrapper = styled.div``;
