const { ASTLeaf } = require('./baseType')

class Name extends ASTLeaf {
  constructor (token) {
    super(token)
  }

  getName () {
    return this.getToken().getText()
  }
} 

module.exports = Name