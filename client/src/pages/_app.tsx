import React from "react";
import GlobalStyle from "styles/GlobalStyle";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import { StyledTheme } from "styles/theme";

// Communication stuff
import axios from "axios";

// Material-ui stuff
import { CssBaseline } from "@material-ui/core";
import { ThemeProvider as MaterialThemeProvider } from "@material-ui/core";
import { MaterialTheme } from "styles/theme";

// Redux stuff
import { Provider } from "react-redux";
import { store } from "store";
import { userAction } from "store";
import { refreshToken } from "util/refreshToken";

// Components
import Layout from "layouts/Layout";

import jwtDecode from "jwt-decode";
import { getCookie } from "util/getCookie";
import { setAuthorizationHeader } from "store/redux/user";
import Axios from "axios";

function MyApp({ Component, pageProps, preStore }) {
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

    // console.log(preStore);
    if (preStore.isAuthenticated) {
      userAction.setAuthorizationHeader(preStore.token);
      store.dispatch(userAction.setUser(preStore.userDetailsQry) as any);
      console.log({ userDetails: preStore.userDetailsQry.data });
    }
  }, []);

  return (
    <React.Fragment>
      <CssBaseline />
      <GlobalStyle />
      <StyledThemeProvider theme={StyledTheme}>
        <MaterialThemeProvider theme={MaterialTheme}>
          <Provider store={store}>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </Provider>
        </MaterialThemeProvider>
      </StyledThemeProvider>
    </React.Fragment>
  );
}

MyApp.getInitialProps = async (context) => {
  // ssr에서 쿠키의 정보는 ctx에 들어있다.
  const { ctx, Component } = context;

  let preStore = {
    isAuthenticated: null,
    userDetailsQry: null,
    token: null,
  };

  // client side
  try {
    if (!ctx.req) throw { error: "not client side" };

    const token = getCookie("fbIdToken", ctx.req.headers.cookie);
    if (!token) throw { error: "token not found" };

    const decodedToken: any = jwtDecode(token);

    if (Date.now() - decodedToken.exp * 1000 > 0)
      throw { error: "token expired" };

    const userDetailsQry = await fetch(
      `${process.env.baseUrl}/api/users/userdetails`,
      {
        method: "POST",
        headers: new Headers({
          Authorization: `Bearer ${token}`,
          "Content-Type": `application/json`,
        }),
      },
    );

    preStore.isAuthenticated = true;
    preStore.userDetailsQry = userDetailsQry.json();
    preStore.token = token;
  } catch (err) {
    // console.error(err);
  }

  // server side
  // if (typeof window === "undefined")
  // console.log({ preStore: preStore });
  return { preStore };
};

export default MyApp;

// https://qiita.com/matamatanot/items/1735984f40540b8bdf91%E3%80%80
// getInitialPropsを加えた4つのメソッドの実行環境とタイミングは以下の通りです。

// サーバーサイド	クライアントサイド	実行タイミング
// getStaticProps	◯	✗	ビルド時 (+ fallback=trueならリクエストに応じて)
// getStaticPaths	◯	✗	ビルド時のみ
// getServerSideProps	◯	✗	リクエストに応じて
// getInitialProps	◯	◯	リクエストに応じて
