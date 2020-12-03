import React from "react";
import GlobalStyle from "styles/GlobalStyle";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import { StyledTheme } from "styles/theme";

// Material-ui stuff
import { CssBaseline } from "@material-ui/core";
import { ThemeProvider as MaterialThemeProvider } from "@material-ui/core";
import { MaterialTheme } from "styles/theme";

// Redux stuff
import { Provider } from "react-redux";
import { store } from "store";
import { refreshToken } from "util/refreshToken";

// Components
import LoggedOutLayout from "layouts/LoggedOutLayout";

function MyApp({ Component, pageProps }) {
  React.useEffect(() => {
    // 오류처리
    // Warning: Prop`className` did not match.
    //   Server: "PrivateNotchedOutline-legendLabelled-39"
    //   Client: "PrivateNotchedOutline-legendLabelled-3"
    // The IDs from the server side rendered CSS are not the same as the client side CSS, hence the mismatch error.
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }

    refreshToken();
    // console.log({ "localStorage.fbIdToken": localStorage.fbIdToken });
  }, []);

  return (
    <React.Fragment>
      <CssBaseline />
      <GlobalStyle />
      <StyledThemeProvider theme={StyledTheme}>
        <MaterialThemeProvider theme={MaterialTheme}>
          <Provider store={store}>
            <LoggedOutLayout>
              <Component {...pageProps} />
            </LoggedOutLayout>
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
