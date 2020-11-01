import { createGlobalStyle } from "styled-components";

const globalStyle = createGlobalStyle`
  * {margin: 0; padding: 0;}
  *, *::before, *::after {box-sizing: border-box;}

  body {
    padding: 0;
    font-family: 'Noto Sans KR', sans-serif;
  }

  a, button {
    text-decoration: none;
    color: inherit;
  }

  .styledBtn {
    
  }
  
  .text-center {text-align: center;}
  .disp-flex {display: flex;}
  .disp-inline {display: inline;}
  .width80 {width: 80%;}
  .width60 {width: 60%;}
  .width50 {width: 50%;}
  .width40 {width: 40%;}
  .width20 {width: 20%;}
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
