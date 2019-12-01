const { logError } = require('./utils/error')

// 基础 Token 定义
class Token {
  static EOF = new Token(-1)
  static EOL = '\\n'

  constructor (line) {
    this.lineNumber = line
  }

  getLineNumber () {
    return this.lineNumber
  }

  // 三个类型判断方法，在实例中重写
  isIdentifier () {
    return false
  }

  isNumber () {
    return false
  }

  isString () {
    return false
  }

  getNumber () {
    logError('not number token')
  }

  getText () {
    return '';
  }
}

// 数字 Token 定义，继承自 Token
class NumberToken extends Token {
  constructor (line, value) {
    super(line)
    this.value = value
  }

  isNumber () {
    return true
  }

  getText() {
    return String(this.value)
  }

  getNumber () {
    return this.value
  }
}

// 操作符 Token，继承自 Token
class IdToken extends Token {
  constructor (line, text) {
    super(line)
    this.text = text
  }

  isIdentifier () {
    return true
  }

  getText () {
    return this.text
  }
}

class CommentToken extends Token {
  constructor (line, comment) {
    super(line)
    this.comment = comment
  }

  getText () {
    return this.comment
  }
}

// 字符串 Token，继承自 Token
class StringToken extends Token {
  constructor (line, literal) {
    super(line)
    this.literal = literal
  }

  isString () {
    return true
  }

  getText () {
    return this.literal
  }
}

module.exports = {
  StringToken,
  IdToken,
  NumberToken,
  Token
}