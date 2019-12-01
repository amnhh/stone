const { logError } = require('../utils/error')

module.exports = class Token {
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

  }

  isNumber () {
    
  }

  isString () {

  }

  getNumber () {
    logError('not number token')
  }

  getText () {
    return '';
  }
}