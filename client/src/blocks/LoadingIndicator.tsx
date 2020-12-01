import React from "react";
import Overlay from "atoms/Overlay";
import CircularProgress from "@material-ui/core/CircularProgress";

interface Props {
  top?: string;
  bg?: string;
  opacity?: number;
  size?: number;
}

export default function fun(props: Props) {
  return (
    <Overlay top={props.top} bg={props.bg} opacity={props.opacity}>
      <CircularProgress size={props.size}></CircularProgress>
    </Overlay>
  );
}
