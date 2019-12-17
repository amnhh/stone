const { ASTList } = require('./baseType')

class BinaryExpr extends ASTList {
  constructor (list) {
    super(list)
  }

  /**
   * 获取操作符左值
   */
  getLeft () {
    return this.children[0]
  }

  /**
   * 获取操作符
   */
  getOperator () {
    return this.children[1].getToken().getText()
  }

  /**
   * 获取操作符右值
   */
  getRight () {
    return this.children[2]
  }
}