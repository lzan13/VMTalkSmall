// 自定义 JS 工具类

/**
 * 格式化时间
 */
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}


/**
 * JS 实现格式化字符串方法
 * "可以用 {key} 字符串替换占位符 {one} {two} {three}".format({one: "I",two: "LOVE",three: "YOU"});
 * "可以用 {1} 自符串替换占位符 {1} {2} {0} ".format("I","LOVE","YOU");
 */
const formatStr = function() {
  if (arguments.length == 0) return "";
  var str = arguments[0];
  if (arguments.length == 1) return str;
  var param = arguments[1];
  if (typeof(param) == 'object') {
    for (var key in param)
      str = str.replace(new RegExp("\\{" + key + "\\}", "g"), param[key]);
    return str;
  } else {
    for (var i = 1; i < arguments.length; i++)
      str = str.replace(new RegExp("\\{" + i + "\\}", "g"), arguments[i]);
    return str;
  }
}

/**
 * 将方法暴露出去
 */
module.exports = {
  formatTime: formatTime,
  formatStr: formatStr
}