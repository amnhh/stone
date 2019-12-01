class Lexer {
  // 整型
  static intReg = /[0-9]+/
  // 标识符 https://jex.im/regulex/#!flags=&re=%5BA-Za-z_%5D%5BA-Za-z0-9_%5D*%7C%3D%3D%7C%3C%3D%7C%3E%3D%7C%26%26%7C%5C%7C%5C%7C
  static identiferReg = /[A-Za-z_][A-Za-z0-9_]*|==|<=|>=|&&|\|\|/
  // 字符串型 https://jex.im/regulex/#!flags=&re=%5E%22(%5C%5C%22%7C%5C%5C%5C%5C%7C%5C%5Cn%7C%5B%5E%22%5D)*%22%24
  static stringReg = /^"(\\"|\\\\|\\n|[^"])*"$/
}

module.exports = Lexer