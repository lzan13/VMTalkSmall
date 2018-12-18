const util = require("./util.js");

/**
 * 格式化日志输出
 */
const i = function() {
  console.log(util.formatStr(arguments));
}

module.exports = {
  i: i
}