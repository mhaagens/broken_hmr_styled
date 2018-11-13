const path = require("path");
const { produce, setAutoFreeze } = require("immer");
const nodeExternals = require("webpack-node-externals");
const StartServerWebpackPlugin = require("start-server-webpack-plugin");
const { CheckerPlugin } = require("awesome-typescript-loader");
const { PRODUCTION, SRC_DIR, BUILD_DIR } = require("./constants");
const commonConfig = require("./common-config");

setAutoFreeze(false);

const serverConfig = produce(commonConfig, serverConfig => {
  serverConfig.entry = [
    ...(!PRODUCTION ? ["webpack/hot/poll?300"] : []),
    path.join(SRC_DIR, "server/index.ts")
  ];
  serverConfig.target = "node";
  serverConfig.externals = [
    nodeExternals({
      whitelist: !PRODUCTION ? ["webpack/hot/poll?300"] : []
    })
  ];
  serverConfig.module.rules[0].use[0].options.configFileName =
    "tsconfig.server.json";
  serverConfig.plugins = [
    ...commonConfig.plugins,
    new CheckerPlugin(),
    ...(!PRODUCTION ? [new StartServerWebpackPlugin("server.js")] : [])
  ];
  serverConfig.output = {
    filename: "server.js",
    path: BUILD_DIR,
    publicPath: PRODUCTION ? "/" : "http://localhost:9000/"
  };
});

module.exports = serverConfig;
