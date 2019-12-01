const Lexer = require('./../../src/Lexer')
const path = require('path')
const { Token } = require('./../../src/Token')

const lexer = new Lexer({ filePath: path.resolve(__dirname, './Lexer.test.js') })
let t = lexer.read()
for (; t !== Token.EOF; t = lexer.read()) {
  console.log(`=> ${t.getText()}`)
}