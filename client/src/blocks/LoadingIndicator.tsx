import React from "react";
import styled from "styled-components";

import CircularProgress from "@material-ui/core/CircularProgress";

import Overlay from "atoms/Overlay";
import { Props as OverlayProps } from "atoms/Overlay";

export default function fun(props: OverlayProps) {
  return (
    <RelativeDiv>
      <Overlay
        type={props.type}
        align={props.align}
        boxWidth={props.boxWidth}
        boxHeight={props.boxHeight}
        top={props.top}
        bg={props.bg}
        opacity={props.opacity}>
        <CircularProgress size={props.size}></CircularProgress>
      </Overlay>
    </RelativeDiv>
  );
}

const RelativeDiv = styled.div`
  position: relative;
`;
