import { createGlobalStyle } from "styled-components";
import { colors } from "styles/theme";

const GlobalStyle = createGlobalStyle`

  * {margin: 0; padding: 0; box-sizing: border-border-box;}
  *::before, *::after {box-sizing: border-box;}

  html {
    /* scroll-behavior: smooth; */
    
  }

  body {
    font-family: 'Noto Sans KR', sans-serif;
  }

  a {
    position: relative;
    text-decoration: none;
    color: inherit;

    &:visited {
      color: ${colors.purple[7]};
    }
  }

  a.inherit {
    &:visited {
      color: inherit;
    }
  }
  
  input {
    padding: 0.8rem;
  }

  textarea {
    padding: 0.8rem;
  }

  ul {
    list-style: none;
  }
  
  .text-center {text-align: center;}
  .disp-flex {display: flex;}
  .disp-inline {display: inline;}

  .vr {
    display: inline;
    margin: 0 0.25em; 
    height: 1em;
  }

  .displayNone {
    display: none;
  }

`;

export default GlobalStyle;

// default hr
// hr { color: gray; border-style: inset; border-width: 1px; margin: 0.5em auto; }

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
