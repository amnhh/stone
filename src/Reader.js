const fs = require('fs')
// const path = require('path')
const promiseify = require('./utils/promiseify')
// const { errorTrace } = require('./utils/error')

// const readFilePms = promiseify(fs.readFile)
const readFile = fs.readFileSync

class Reader {
  constructor ({ filePath }) {
    this.source = this.sourceCodeAdaptor(filePath)
    this.currentLine = 0
    this.iterator = this.source[Symbol.iterator]()
  }

  /**
   * 读取一行的数据
   * iterator 实现
   */
  readLine () {
    const { value, done } = this.iterator.next()
    if (!done) {
      this.currentLine ++
      return value;
    } else {
      return null;
    }
  }

  /**
   * 获取行号
   */
  getLineNumber () {
    return this.currentLine
  }

  /**
   * 接收源代码地址，返回源代码数组字符串
   * 相对路径依赖于 Lexer.js 所在路径
   * @param {String} filePath => 源代码地址
   * @return { Array } sourceArray => 源代码字符串数组
   *  sourceArray[lineNumber = 0]...
   *  sourceArray[lineNumber = 1]...
   */
  sourceCodeAdaptor (filePath) {
    const source = readFile(filePath, { 
      encoding: 'utf8'
    })
    return source.split('\n')
  }
}

module.exports = Reader;