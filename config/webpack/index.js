const webpack = require("webpack");
const webpackDevServer = require("webpack-dev-server");
const clientConfig = require("./client-config");
const serverConfig = require("./server-config");
const { PRODUCTION, BUILD_DIR } = require("./constants");

const clientCompiler = webpack(clientConfig);
const serverCompiler = webpack(serverConfig);

if (PRODUCTION) {
  console.log("Building application");
  clientCompiler.run((err, stats) => {
    if (err) console.log(err);
    if (stats) {
      console.log("Client build finished");
      serverCompiler.run((err, stats) => {
        if (err) console.log(err);
        if (stats) {
          console.log("Server build finished");
        }
      });
    }
  });
} else {
  const startServer = () => {
    serverCompiler.watch(
      {
        ignored: /node_modules/
      },
      (err, stats) => {
        if (err) console.log(err);
      }
    );
  };

  const devServer = new webpackDevServer(clientCompiler, {
    contentBase: BUILD_DIR,
    host: "localhost",
    port: 9000,
    hot: true,
    historyApiFallback: true,
    overlay: {
      errors: true,
      warnings: false
    },
    headers: {
      "Access-Control-Allow-Origin": "*"
    }
  });

  let started = false;

  clientCompiler.hooks.done.tap("StartServer", stats => {
    if (!started) {
      started = true;
      devServer.listen(9000, "127.0.0.1", () =>
        console.log("Webpack Dev Server listening on port 9000.")
      );
      startServer();
    }
  });
}
