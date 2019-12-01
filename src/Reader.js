const fs = require('fs')
const path = require('path')
const promiseify = require('./utils/promiseify')
const { errorTrace } = require('./utils/error')

const readFilePms = promiseify(fs.readFile)

class Reader {
  constructor ({ filePath }) {
    this.source = this.sourceAdaptor(filePath)
  }
  /**
   * 接收源代码地址，返回源代码数组字符串
   * 相对路径依赖于 Lexer.js 所在路径
   * @param {String} filePath => 源代码地址
   * @return { Array } sourceArray => 源代码字符串数组
   *  sourceArray[lineNumber = 0]...
   *  sourceArray[lineNumber = 1]...
   */
  async sourceAdaptor (filePath) {
    const source = await readFilePms(path.resolve(__dirname, filePath), { 
      encoding: 'utf8'
    }).catch(errorTrace)

    return source.split('\n')
  }
}