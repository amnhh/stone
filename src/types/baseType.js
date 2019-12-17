const { logError } = require('../utils/error')

/**
 * 节点类 => ASTNode 更好些？
 */
class ASTree {
  // 获取子节点
  getChild (i) {}

  // 获取子节点个数
  getChildCount () {}

  // 获取子节点的迭代器
  getChildIterator () {}

  // 获取位置信息
  getLocation () {}
}

/**
 * 语法树叶子节点
 */
class ASTLeaf extends ASTree {
  constructor (token) {
    // 节点 token
    this.token = token
    // 子节点
    this.children = []
  }

  // 重写父类 getChild 方法
  getChild (i) {
    logError(`ASTLeaf 不支持 getChild 方法，该类型节点没有子节点`)
  }

  // 获取子节点个数
  // 这里其实就是 0
  getChildCount () {
    return this.children.length;
  }

  // 获取一个 Leaf 组件的子组件的 iterator
  getChildIterator () {
    return this.children[Symbol.iterator]()
  }

  // 打印方法
  toString () {
    return this.token.getText()
  }

  // ASTree 的位置
  location () {
    return `at line ${ this.token.getLineNumber() }`
  }

  getToken () {
    return this.token
  }
}

/**
 * 语法树枝干节点
 */
class ASTList {
  constructor (list) {
    this.children = list
  }

  /**
   * 获取某个子节点
   */
  getChild (i) {
    return this.children[i]
  }

  /**
   * 获取子节点个数
   */
  getChildCount () {
    return this.children.length
  }

  /**
   * 获取子节点迭代器
   */
  getChildIterator () {
    return this.children[Symbol.iterator]()
  }

  /**
   * 打印子节点
   */
  toString () {
    return this.children.join(',')
  }

  /**
   * 获取位置
   */
  location () {
    return this.children.map(token => token.location)
  }
}

module.exports = {
  ASTList,
  ASTLeaf,
  ASTree
}