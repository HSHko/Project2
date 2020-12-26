import React from "react";
import Head from "next/head";
import GlobalStyle from "styles/GlobalStyle";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import { StyledTheme } from "styles/theme";

// Communication stuff
import axios from "axios";

// Material-ui stuff
import { createGenerateClassName, CssBaseline } from "@material-ui/core";
import { StylesProvider } from "@material-ui/core";
import { ThemeProvider as MaterialThemeProvider } from "@material-ui/core";
import { MaterialTheme } from "styles/theme";

// Redux stuff
import { Provider } from "react-redux";
import { store } from "store";
import { userAction } from "store";

// Components
import Layout from "layouts/Layout";

import jwtDecode from "jwt-decode";
import Axios from "axios";
import Cookies from "util/CookieHandler";

const generateClassName = createGenerateClassName({
  productionPrefix: "myclasses-",
});

function MyApp({ Component, pageProps, preProps }) {
  const [key, setKey] = React.useState(0);

  React.useEffect(() => {
    // 오류처리, 참고: https://github.com/mui-org/material-ui/blob/master/examples/nextjs/pages/_app.js
    // Warning: Prop`className` did not match.
    //   Server: "PrivateNotchedOutline-legendLabelled-39"
    //   Client: "PrivateNotchedOutline-legendLabelled-3"
    // The IDs from the server side rendered CSS are not the same as the client side CSS, hence the mismatch error.
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }

    if (preProps.alert) {
      store.dispatch(userAction.logout() as any);
      alert(preProps.alert);
    }

    if (preProps.userDetailsData) {
      store.dispatch(userAction.setAuthorizationHeader(preProps.token) as any);
      store.dispatch(userAction.setUser(preProps.userDetailsData) as any);
    }

    if (process.env.NODE_ENV.trim() !== "development") {
      setKey(1);
    }
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>My page</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
        />
      </Head>

      <StyledThemeProvider theme={StyledTheme}>
        <StylesProvider key={key} generateClassName={generateClassName}>
          <MaterialThemeProvider theme={MaterialTheme}>
            <CssBaseline />
            <GlobalStyle />
            <Provider store={store}>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </Provider>
          </MaterialThemeProvider>
        </StylesProvider>
      </StyledThemeProvider>
    </React.Fragment>
  );
}

MyApp.getInitialProps = async (context) => {
  let preProps = {
    userDetailsData: null,
    token: null,
    alert: null,
  };

  // client side
  try {
    if (!context.ctx.req) throw { error: "not client side" };

    // ssr에서 쿠키의 정보는 ctx에 들어있다.
    const cookies = new Cookies(context.ctx.req.headers.cookie);
    const token = cookies.get("fbIdToken");

    if (!token) throw { error: "token not found" };
    // console.log({ token: token });

    // const decodedToken = {
    //   iss: "https://securetoken.google.com/${projcetName}",
    //   aud: projectName,
    //   auth_time: 1608039359,
    //   user_id: "nRMEyIUNajc71zhN4yyuXxU7Wz83",
    //   sub: "nRMEyIUNajc71zhN4yyuXxU7Wz83",
    //   iat: 1608039359,
    //   exp: 1608042959,
    //   email: "test1@email.com",
    //   email_verified: false,
    //   firebase: { identities: [Object], sign_in_provider: "password" },
    // };
    const decodedToken: any = jwtDecode(token);

    if (Date.now() - decodedToken.exp * 1000 > 0) {
      preProps.alert = "ログイントークンの有効期限が切れました";
      throw { errors: "token expired" };
    }

    const userDetailsQry = await fetch(
      `${process.env.BASE_URL}/api/users/getuserdetails`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    if (!userDetailsQry.ok) throw { errors: await userDetailsQry.json() };
    const userDetailsData = await userDetailsQry.json();

    preProps = {
      ...preProps,
      token: token,
      userDetailsData: userDetailsData,
    };
  } catch (err) {
    // console.error(err);
  }
  return { preProps };

  // if (typeof window !== "undefined") throw { error: "not server side" };
};

export default MyApp;

// https://qiita.com/matamatanot/items/1735984f40540b8bdf91%E3%80%80
// getInitialPropsを加えた4つのメソッドの実行環境とタイミングは以下の通りです。
// サーバーサイド	クライアントサイド	実行タイミング
// getStaticProps	◯	✗	ビルド時 (+ fallback=trueならリクエストに応じて)
// getStaticPaths	◯	✗	ビルド時のみ
// getServerSideProps	◯	✗	リクエストに応じて
// getInitialProps	◯	◯	リクエストに応じて
