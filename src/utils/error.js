module.exports = {
  logError (msg) {
    throw new Error(msg)
  },
  errorTrace (err) {
    console.log('---------------TRACE START---------------')
    console.trace(err)
    console.log('---------------TRACE   END---------------')
    console.error('程序终止，请仔细检查 trace 日志修改后再试')
    process.exit(1)
  },
  parseError ({ lineNumber, line, charIdx, filePath }) {
    throw new Error(`[词法解析错误]: 错误在 ${ filePath } 第 ${ lineNumber } 行第 ${ charIdx } 个字符: ${ line }`)
  }
}