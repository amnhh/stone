module.exports = {
  logError (msg) {
    throw new Error(msg)
  },
  errorTrace (err, exit) {
    console.log('---------------TRACE START---------------')
    console.trace(err)
    console.log('---------------TRACE   END---------------')
    console.error('程序终止，请仔细检查 trace 日志修改后再试')
    process.exit(1)
  }
}