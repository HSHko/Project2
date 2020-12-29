import React from "react";
import styled from "styled-components";

// Redux stuff
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { RootState } from "store";
import { backdropAction } from "store";

import Overlay from "atoms/Overlay";
import { TIMEOUT } from "dns";

interface Props {
  opacity?: number;
}

export default function fun(props) {
  React.useEffect(() => {
    console.log("render");
  }, []);

  const dispatch = useDispatch();
  const backdropStore = useSelector((x: RootState) => x.backdropReducer);

  const handleOnClick = React.useCallback(() => {
    dispatch(backdropAction.lo());
  }, [backdropStore]);

  return (
    <>
      {backdropStore.isHi && (
        <Overlay browser onClick={() => handleOnClick()}></Overlay>
      )}
    </>
  );
}

// const Backdrop = styled.button.attrs(() => ({}))<Props>`
//   z-index: ${vars.backdrop.zIndex};
//   position: absolute;
//   top: 0;
//   left: 0;
//   width: 100vw;
//   height: 100vh;
//   animation: anime 0.25s ease forwards;
//   opacity: ${(p) => (p.opacity ? p.opacity : 0.15)};
//   background-color: transparent;
//   @keyframes anime {
//     to {
//       background-color: #000;
//     }
//   }
// `;
