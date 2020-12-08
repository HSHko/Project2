const express = require("express");
const next = require("next");
const { createProxyMiddleware } = require("http-proxy-middleware");

const port = process.env.PORT || 3000;
const dev = process.env.CONFIG_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const baseUrl = "http://asia-northeast1-project2-7396c.cloudfunctions.net";
// const baseUrl = "http://localhost:5001/project2-7396c/asia-northeast1";

// 참조:
// https://medium.com/bb-tutorials-and-thoughts/next-js-how-to-proxy-to-backend-server-987174737331
// https://github.com/bbachi/nextjs-proxy-example/blob/master/todo-app/package.json

http: app
  .prepare()
  .then(() => {
    const server = express();

    server.use(
      ["/api"],
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

    // if (dev) {
    //   server.use(["/api"], createProxyMiddleware(apiPaths["/api"]));
    //   //server.use(["/api", "/api2"], createProxyMiddleware(apiPaths["/api"]));
    //   //server.use('/api2', createProxyMiddleware(apiPaths['/api2']));
    // }
  })
  .catch((err) => {
    console.log("Error:::::", err);
  });

// app.use('/api', proxy({ target: 'http://localhost:5000', changeOrigin: true }));
