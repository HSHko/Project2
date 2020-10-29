import { color as colors } from "./colorPhalette";
import { createMuiTheme } from "@material-ui/core";

/* eslint-disable */

export const color = {
  ...colors,
  primary: {
    main: colors.indigo[7],
    light: colors.indigo[4],
    dark: colors.indigo[10],
  },
  error: {
    main: colors.red[0],
    light: colors.red[3],
    dark: colors.red[14],
  },
  font: {
    main: colors.white,
    light: colors.white,
    dark: colors.white,
  },
  nav: {
    top: {
      main: colors.brown[3],
    },
    side: {
      main: colors.brown[4],
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
    height: "3.5rem",
    zIndex: 5,
  },
  footer: {
    bgColor: color.black,
  },
};

export const StyledTheme = {
  color,
  vars,
};

export const MaterialTheme = createMuiTheme({
  palette: {
    primary: {
      main: color.brown[3],
    },
    secondary: {
      main: color.red[0],
    },
  },
});
