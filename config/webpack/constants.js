const path = require("path");

exports.PRODUCTION = process.env.NODE_ENV === "production";
exports.BASE_DIR = path.join(__dirname, "../../");
exports.SRC_DIR = path.join(__dirname, "../../src");
exports.BUILD_DIR = path.join(__dirname, "../../build");