import styled from "styled-components";
import { css } from "styled-components";
import { vars } from "styles/theme";

interface Props {
  top?: string;
  bg?: string;
  opacity?: number;
  type?: "static" | "dynamic";
}

// left 0, right 0인 경우 표시영역을 양쪽으로 당김
export default styled.div.attrs(() => ({}))<Props>`
  ${(p) => {
    if (!p.type) {
      return css`
        position: absolute;
        z-index: ${vars.overlay.zIndex};
        top: ${p.top ? p.top : `5rem`};
        left: 0;
        right: 0;
        text-align: center;
        background-color: ${p.bg ? p.bg : `transparent`};
      `;
    }
  }};
`;

// &::after {
//   content: "";
//   position: absolute;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100%;
// }
