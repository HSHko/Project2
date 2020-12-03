import { createGlobalStyle } from "styled-components";

const globalStyle = createGlobalStyle`
  * {margin: 0; padding: 0; box-sizing: border-border-box;}
  *, *::before, *::after {box-sizing: border-box;}

  body {
    font-family: 'Noto Sans KR', sans-serif;
  }

  a, button {
    text-decoration: none;
    color: inherit;
  }
  
  .text-center {text-align: center;}
  .disp-flex {display: flex;}
  .disp-inline {display: inline;}
`;

export default globalStyle;

/*

  a, button {
    display: flex;
    margin: auto 0.5rem;
    outline: none;
    background-color: transparent;
    border: none;
    cursor: pointer;
    font-weight: 700;
    text-decoration: none;
    color: inherit;
    cursor: pointer;
  }
*/
