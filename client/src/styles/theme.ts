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
  border: {
    main: phalette.bluegray[3],
    light: phalette.gray[4],
    dark: phalette.gray[7],
  },
  user: {
    main: phalette.blue[9],
  },
};

export const vars = {
  zIndex: {
    sidebar: 220,
    backdrop: 210,
    overlay: 208,
    navbar: 205,
  },
  maxWidth: {
    main: "1080px",
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
