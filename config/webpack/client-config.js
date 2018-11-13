const path = require("path");
const { produce, setAutoFreeze } = require("immer");
const { PRODUCTION, SRC_DIR, BUILD_DIR } = require("./constants");
const commonConfig = require("./common-config");

setAutoFreeze(false);

const clientConfig = produce(commonConfig, clientConfig => {
  clientConfig.entry = [
    ...(!PRODUCTION
      ? [
          "webpack-dev-server/client?http://localhost:9000",
          "webpack/hot/only-dev-server"
        ]
      : []),
    path.join(SRC_DIR, "client/index.tsx")
  ];
  clientConfig.target = "web";
  clientConfig.module.rules[0].use[0].options.configFileName =
    "tsconfig.client.json";
  clientConfig.plugins = [...commonConfig.plugins];
  clientConfig.output = {
    filename: "public/js/[name].js",
    path: BUILD_DIR,
    publicPath: PRODUCTION ? "/" : "http://localhost:9000/"
  };
});

module.exports = clientConfig;
