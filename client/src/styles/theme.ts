import { phalette } from "./colorPhalette";
import { createMuiTheme } from "@material-ui/core";

/* eslint-disable */

export const colors = {
  ...phalette,
  primary: {
    main: phalette.indigo[7],
    light: phalette.indigo[4],
    dark: phalette.indigo[10],
  },
  error: {
    main: phalette.red[0],
    light: phalette.red[3],
    dark: phalette.red[14],
  },
  font: {
    main: phalette.white,
    light: phalette.white,
    dark: phalette.white,
  },
  nav: {
    top: {
      main: phalette.brown[3],
    },
    side: {
      main: phalette.brown[4],
    },
  },
};

export const vars = {
  backdrop: {
    zIndex: 1200,
  },
  sidebar: {
    zIndex: 7,
  },
  navbar: {
    maxWidth: "1440px",
    height: "3.5rem",
    zIndex: 5,
  },
  footer: {
    bgColor: colors.black,
  },
};

export const StyledTheme = {
  colors,
  vars,
};

export const MaterialTheme = createMuiTheme({
  palette: {
    primary: {
      main: colors.brown[3],
    },
    secondary: {
      main: colors.red[0],
    },
  },
});
