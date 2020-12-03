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
  navbar: {
    top: {
      bg: phalette.brown[3],
    },
    side: {
      bg: phalette.brown[4],
    },
  },
};

export const vars = {
  backdrop: {
    zIndex: 100,
  },
  overlay: {
    zIndex: 80,
  },
  sidebar: {
    zIndex: 120,
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
      main: phalette.indigo[7],
      light: phalette.indigo[4],
      dark: phalette.indigo[10],
    },
    secondary: {
      main: colors.red[0],
    },
    error: {
      main: colors.red[0],
    },
    background: {
      default: "#fff",
    },
  },
});
