const { ASTLeaf } = require('./baseType')
const Token = require('./../Token')

class NumberLiteral extends ASTLeaf {
  constructor (token) {
    super(token)
  }

  value () {
    return this.getToken().getNumber()
  }
}

module.exports = NumberLiteral