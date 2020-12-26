// 2020.12.23 이슈: production 빌드시 SSR 타이밍에 styled components 관련한 class error가 일어나서 css가 적용되지 않음.
// 설명 참고 : https://stackoverflow.com/questions/60060544/page-refresh-break-styles-on-nextjs-production-app
// You have hydration issues involving the styled - components package.In short, your server and client classNames
// don't match (please check your dev console, it's one of the first warnings to show up).Use this example to set up
// a custom _document.js file to configure styled - components properly: github.com / zeit / next.js / blob / master / examples
//   /….In addition, you have a few other warnings that need to be addressed as well, but this config should at least fix the
// styling issues.– Matt Carlotta Feb 7 at 1: 28
// 코드 참고: https://github.com/vercel/next.js/blob/master/examples/with-styled-components/pages/_document.js

// 2020.12.24 이슈 : Next.js & material UIで[Prop className` did not match`]が発生する
// 설명 참고 : https://qiita.com/sobameshi0901/items/a3a95b88770a52f1f31c
// makeStylesで作成したスタイルの読み込み時に発生
// 初回レンダリング時には発生しない
// 変更を加えたり、ページ更新を行うと発生する
// Server 'xx' Client 'xx'の内容は、Server "makeStyles-mainContainer-1" Client
// makeStyles - mainContainer - 2のように、クラス名に違いが生じている
// 코드 참고: https://stackoverflow.com/questions/55109497/how-to-integrate-nextjs-styled-components-with-material-ui

// 위에 해결안됨, 다음을 참고: https://stackoverflow.com/questions/58791674/material-ui-styles-flicker-in-and-disappear
// One way to fix this, is to force a rerender after hidration.
// One way to do this, is to update the key prop on your component.

// 2020.12.25 추가:
// generateClassName을 styles components와 material-ui의 theme provider 사이에 넣으면 해결됨
// 추가: production 상태에서는 이전과 같은 상태. production 상태일때만 사전렌더링 한번 더 할 것

// ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
// 2020.12.23
// ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
import Document from "next/document";
import { ServerStyleSheet } from "styled-components";

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }
}

// ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
// 2020.12.24
// ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
// import React from "react";
// import Document, { Html, Head, Main, NextScript } from "next/document";
// import { ServerStyleSheet } from "styled-components";
// import { ServerStyleSheets } from "@material-ui/styles";
// import { MaterialTheme } from "styles/theme";

// export default class MyDocument extends Document {
//   render() {
//     return (
//       <Html lang="en">
//         <Head>
//           {/* PWA primary color */}
//           <meta
//             name="theme-color"
//             content={MaterialTheme.palette.primary.main}
//           />
//           <link
//             rel="stylesheet"
//             href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
//           />
//         </Head>
//         <body>
//           <Main />
//           <NextScript />
//         </body>
//       </Html>
//     );
//   }
// }

// MyDocument.getInitialProps = async (ctx) => {
//   const styledSheet = new ServerStyleSheet();
//   const materialSheets = new ServerStyleSheets();
//   const originalRenderPage = ctx.renderPage;

//   ctx.renderPage = () =>
//     originalRenderPage({
//       enhanceApp: (App) => (props) =>
//         styledSheet.collectStyles(materialSheets.collect(<App {...props} />)),
//     });

//   const initialProps = await Document.getInitialProps(ctx);

//   return {
//     ...initialProps,
//     // Styles fragment is rendered after the app and page rendering finish.
//     styles: [
//       ...React.Children.toArray(initialProps.styles),
//       styledSheet.getStyleElement(),
//       materialSheets.getStyleElement(),
//     ],
//   };

//   // try {
//   //   ctx.renderPage = () =>
//   //     originalRenderPage({
//   //       enhanceApp: (App) => (props) =>
//   //         styledSheet.collectStyles(materialSheets.collect(<App {...props} />)),
//   //     });
//   //   const initialProps = await Document.getInitialProps(ctx);
//   //   return {
//   //     ...initialProps,
//   //     styles: (
//   //       <>
//   //         {initialProps.styles}
//   //         {materialSheets.getStyleElement()}
//   //         {styledSheet.getStyleElement()}
//   //       </>
//   //     ),
//   //   };
//   // } finally {
//   //   styledSheet.seal();
//   // }
// };
