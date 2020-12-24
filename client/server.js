const express = require("express");
const next = require("next");
const { createProxyMiddleware } = require("http-proxy-middleware");

const port = process.env.PORT || 3000;
const dev = process.env.CONFIG_ENV.trim() === "development";
const app = next({ dev });
const handle = app.getRequestHandler();

const baseUrl = dev
  ? "http://localhost:5001/project2-7396c/asia-northeast1"
  : "http://asia-northeast1-project2-7396c.cloudfunctions.net";

console.log({
  CONFIG_ENV: process.env.CONFIG_ENV,
  baseUrl: baseUrl,
});

// 참조:
// https://medium.com/bb-tutorials-and-thoughts/next-js-how-to-proxy-to-backend-server-987174737331
// https://github.com/bbachi/nextjs-proxy-example/blob/master/todo-app/package.json

app
  .prepare()
  .then(() => {
    const server = express();

    server.use(
      "/api",
      createProxyMiddleware({
        target: baseUrl,
        changeOrigin: true,
      }),
    );

    server.all("*", (req, res) => {
      return handle(req, res);
    });

    server.listen(port, (err) => {
      if (err) throw err;
      console.log(`> Ready on http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.log("Error:::::", err);
  });
