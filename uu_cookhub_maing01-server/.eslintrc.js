const path = require("path");

let config = {
  extends: [
    "./" + path.relative(".", require.resolve("uu_appg01_devkit/src/config/.eslintrc-uu5.js")).replace(/\\/g, "/"),
  ],
};

module.exports = config;
