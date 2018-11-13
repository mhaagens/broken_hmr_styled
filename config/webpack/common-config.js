const webpack = require("webpack");
const path = require("path");
const { PRODUCTION, SRC_DIR } = require("./constants");

module.exports = {
  mode: process.env.NODE_ENV === "production" ? "production" : "development",
  devtool: process.env.NODE_ENV === "production" ? "none" : "source-map",
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
    alias: {
      "@client": path.join(SRC_DIR, "client"),
      "@common": path.join(SRC_DIR, "common"),
      "@server": path.join(SRC_DIR, "server")
    }
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx|js)?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "awesome-typescript-loader",
            options: {
              useBabel: true,
              useCache: true,
              babelOptions: {
                babelrc: false,
                presets: [
                  "@babel/preset-react",
                  [
                    "@babel/preset-env",
                    { targets: { node: "current" }, modules: false }
                  ]
                ],
                plugins: [
                  "babel-plugin-styled-components"
                ]
              },
              babelCore: "@babel/core"
            }
          }
        ]
      }
    ]
  },
  plugins: [...(!PRODUCTION ? [new webpack.HotModuleReplacementPlugin()] : [])]
};
