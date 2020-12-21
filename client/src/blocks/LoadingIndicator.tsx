import React from "react";
import styled from "styled-components";

// Communication stuff

// Material-ui stuff
import CircularProgress from "@material-ui/core/CircularProgress";

// Redux stuff

// Components
import Overlay from "atoms/Overlay";

// interface Props {}

export default function fun(props) {
  return (
    <Overlay browser={props.browser}>
      {props.children !== undefined ? (
        <>{props.children}</>
      ) : (
        <CircularProgress
          size={props.size ? props.size : 30}></CircularProgress>
      )}
    </Overlay>
  );
}
