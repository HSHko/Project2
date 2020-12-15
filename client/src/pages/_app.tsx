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
import Cookies from "universal-cookie";

function MyApp({ Component, pageProps, preProps }) {
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

    if (preProps.isAuthenticated) {
      userAction.setAuthorizationHeader(preProps.token);
      store.dispatch(userAction.setUser(preProps.userDetailsQry) as any);
    }

    const cookies = new Cookies();
    console.log({ clientToken: cookies.get("fbIdToken") });
    console.log({ axiosHeader: axios.defaults.headers.common });
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
  let preProps = {
    isAuthenticated: null,
    userDetailsQry: null,
    token: null,
    cookie: null,
  };

  // client side
  try {
    if (!context.ctx.req) throw { error: "not client side" };

    // ssr에서 쿠키의 정보는 ctx에 들어있다.
    const cookies = new Cookies(context.ctx.req.headers.cookie);
    const token = cookies.get("fbIdToken");

    if (!token) throw { error: "token not found" };

    // console.log({ serverToken: token });

    const decodedToken: any = jwtDecode(token);
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

    if (Date.now() - decodedToken.exp * 1000 > 0)
      throw { error: "token expired" };

    const userDetailsQry = await fetch(
      `${process.env.baseUrl}/api/users/getuserdetails`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": `application/json`,
        },
      },
    ).then((res) => res.json());

    preProps = {
      ...preProps,
      isAuthenticated: true,
      userDetailsQry: userDetailsQry,
      token: token,
    };
  } catch (err) {
    console.error(err);
  }

  // server side
  try {
    if (typeof window !== "undefined") throw { error: "not server side" };
  } catch (err) {
    // console.error(err);
  }

  // console.log({ preProps: preProps });
  return { preProps };
};

export default MyApp;

// https://qiita.com/matamatanot/items/1735984f40540b8bdf91%E3%80%80
// getInitialPropsを加えた4つのメソッドの実行環境とタイミングは以下の通りです。

// サーバーサイド	クライアントサイド	実行タイミング
// getStaticProps	◯	✗	ビルド時 (+ fallback=trueならリクエストに応じて)
// getStaticPaths	◯	✗	ビルド時のみ
// getServerSideProps	◯	✗	リクエストに応じて
// getInitialProps	◯	◯	リクエストに応じて
