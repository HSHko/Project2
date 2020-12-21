import React from "react";
import styled from "styled-components";

// Communication stuff
import { useRouter } from "next/router";

// Material-ui stuff
import CircularProgress from "@material-ui/core/CircularProgress";

// Redux stuff
import { useSelector } from "react-redux";
import { shallowEqual } from "react-redux";
// import { useDispatch } from "react-redux";
import { RootState } from "store";

// Components
import LoadingIndicator from "blocks/LoadingIndicator";

import { colors } from "styles/theme";

// interface Props {}

export default function fun(props) {
  const isUiLoading = useSelector(
    (x: RootState) => x.uiReducer.isHi,
    shallowEqual,
  );

  return (
    <>{isUiLoading ? <LoadingIndicator size={100}></LoadingIndicator> : null}</>
  );
}

// const Wrapper = styled.div``;
