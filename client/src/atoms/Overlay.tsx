import styled from "styled-components";
import { css } from "styled-components";
import { vars } from "styles/theme";

export interface Props {
  top?: string;
  bg?: string;
  opacity?: number;
  type?: "dynamic" | "browser" | "box";
  align?: string; // type: dynamic
  boxWidth?: string | number; // type: "box"
  boxHeight?: string | number; // type: "box"
  size?: number; // CircularProgress size
}

// left 0, right 0인 경우 표시영역을 양쪽으로 당김
export default styled.div.attrs(() => ({}))<Props>`
  ${(p) => {
    if (!p.type || p.type === "dynamic") {
      return css`
        position: absolute;
        z-index: ${vars.overlay.zIndex};
        top: ${p.top ? p.top : `5rem`};
        left: 0;
        right: 0;
        text-align: ${p.align ? p.align : `center`};
      `;
    } else if (p.type === "box") {
      return css`
        position: absolute;
        z-index: ${vars.overlay.zIndex};
        left: calc(${p.boxWidth} / 2);
        top: calc(${p.boxHeight} / 2);
        transform: translate(-50%, -50%);
      `;
    } else if (p.type === "browser") {
      return css`
        position: fixed;
        z-index: ${vars.overlay.zIndex};
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      `;
    }
  }};
  background-color: ${(p) => (p.bg ? p.bg : `transparent`)};
  opacity: ${(p) => (p.opacity ? p.opacity : `1`)};
`;

// &::after {
//   content: "";
//   position: absolute;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100%;
// }
