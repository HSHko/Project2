import React from "react";
import styled from "styled-components";
import { css } from "styled-components";

// Components
import { vars } from "styles/theme";

interface Props {
  browser?: boolean;
}

export default styled.div.attrs(() => ({}))<Props>`
  ${(p) => {
    if (p.browser) {
      return css`
        position: fixed;
        z-index: ${vars.zIndex.backdrop};
        top: 50%;
        left: 50%;
        width: 100vh;
        height: 100vh;

        display: flex;
        justify-content: center;
        align-items: center;

        transform: translate(-50%, -50%);

        &::before {
          content: "";
          position: fixed;
          width: 100%;
          height: 100%;

          animation: anime 0.3s ease 0s 1 forwards;
          @keyframes anime {
            from {
              background-color: black;
              opacity: 0;
            }
            to {
              background-color: black;
              opacity: 0.15;
            }
          }
        }
      `;
    } else {
      return css`
        position: absolute;
        z-index: ${vars.zIndex.overlay};

        top: 0;
        left: 0;

        width: 100%;
        height: 100%;

        display: flex;
        justify-content: center;
        align-items: center;

        &::before {
          content: "";
          position: absolute;
          width: 100%;
          height: 100%;

          animation: anime 0.3s ease 0s 1 forwards;
          @keyframes anime {
            from {
              background-color: black;
              opacity: 0;
            }
            to {
              background-color: black;
              opacity: 0.15;
            }
          }
        }
      `;
    }
  }}
`;
