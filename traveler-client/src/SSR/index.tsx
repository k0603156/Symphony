import express from "express";
import React from "react";
import Helmet from "react-helmet";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import path from "path";

import App from "../CLIENT/components/App";

const app = express();

if (process.env.NODE_ENV !== "production") {
  const webpack = require("webpack");
  const webpackConfig = require("../../webpack.client.js");
  const webpackDevMiddleware = require("webpack-dev-middleware");
  const webpackHotMiddleware = require("webpack-hot-middleware");
  const compiler = webpack(webpackConfig);
  app.use(
    webpackDevMiddleware(compiler, {
      logLevel: "silent",
      publicPath: webpackConfig.output.publicPath
    })
  );
  app.use(webpackHotMiddleware(compiler));
}

app.use(express.static(path.resolve(__dirname)));

app.get("*", (req, res) => {
  const context = {};

  const html = renderToString(
    <StaticRouter location={req.url} context={context}>
      <App />
    </StaticRouter>
  );

  const helmet = Helmet.renderStatic();

  res.set("content-type", "text/html");
  res.send(`
    <!DOCTYPE html>
      <html lang="ko">
        <head>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta name="google" content="notranslate">
            ${helmet.title.toString()}
        </head>
        <body>
            <div id="root">${html}</div>
            <script type="text/javascript" src="main.js"></script>
        </body>
      </html>
  `);
});

app.listen(8000, () => console.log("Server started http://localhost:8000"));
