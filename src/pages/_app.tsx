import React from "react";
import { CssBaseline } from "@material-ui/core";
import GlobalStyle from "styles/GlobalStyle";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import { StyledTheme } from "styles/theme";
import { ThemeProvider as MaterialThemeProvider } from "@material-ui/core";
import { MaterialTheme } from "styles/theme";
import { Provider } from "react-redux";
import { configureStore } from "store";

const store = configureStore();

function MyApp({ Component, pageProps }) {
  return (
    <React.Fragment>
      <CssBaseline />
      <GlobalStyle />
      <StyledThemeProvider theme={StyledTheme}>
        <MaterialThemeProvider theme={MaterialTheme}>
          <Provider store={store}>
            <Component {...pageProps} />
          </Provider>
        </MaterialThemeProvider>
      </StyledThemeProvider>
    </React.Fragment>
  );
}

export default MyApp;

/*
export async function getServerSideProps(context) {
  return {
    props: {},
  }
}

export async function getServerSideProps(context) {
  return {
    props: {
      layout: true,
    },
  }
}

function MyApp({ Component, pageProps }) {
  return pageProps.layout ? (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  ) : (
    <Component {...pageProps} />
  )
*/
