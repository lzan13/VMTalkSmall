const vutil = require("./vmutil.js");

/**
 * 格式化日志输出
 */
const i = function() {
  console.log(vutil.formatStr(arguments));
}

module.exports = {
  i: i
}