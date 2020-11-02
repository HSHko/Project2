import styled from "styled-components";
import { vars } from "styles/theme";

interface Props {}

export default styled.button.attrs(() => ({}))<Props>`
  z-index: ${vars.backdrop.zIndex};
  position: fixed;
  width: 100vh;
  height: 100vh;
  animation: anime 0.25s ease forwards;
  opacity: 0.15;
  @keyframes anime {
    to {
      background-color: #000000;
    }
  }
`;
