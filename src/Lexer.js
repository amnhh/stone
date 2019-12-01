const Reader = require('./Reader')
const { StringToken, IdToken, NumberToken, CommentToken, Token } = require('./Token')
const { parseError } = require('./utils/error')

/**
 * 匹配正则
 *  分组信息：
 *    group 1: \s* => 以外的整体
 *    group 2: (\/\/.*) => 注释
 *    group 3: ([0-9]+) => 数字
 *    group 4: ("(\\"|\\\\|\\n|[^"])*\") => 字符串
 *    group 5: (\\"|\\\\|\\n|[^"]) => 字符串 "" 中间的部分
 *    group 6: ([A-Za-z_][A-Za-z0-9_]*) => 标识符(变量)
 *    group 7: (==|<=|>=|&&|\|\|) => 标识符(两字符符号)
 *    group 8: ([\{\}\=\+\-\*\/\>\<\?\.\,\;\!\(\)\%]) => 标识符(单字符符号)
 *  图示：
 *    https://jex.im/regulex/#!flags=&re=%5Cs*((%5C%2F%5C%2F.*)%7C(%5B0-9%5D%2B)%7C(%22(%5C%5C%22%7C%5C%5C%5C%5C%7C%5C%5Cn%7C%5B%5E%22%5D)*%5C%22)%7C(%5BA-Za-z_%5D%5BA-Za-z0-9_%5D*)%7C(%3D%3D%7C%3C%3D%7C%3E%3D%7C%26%26%7C%5C%7C%5C%7C)%7C(%5B%5C%7B%5C%7D%5C%3D%5C%2B%5C-%5C*%5C%2F%5C%3E%5C%3C%5C%3F%5C.%5C%2C%5C%3B%5C!%5C(%5C)%5C%25%5D))%3F
 */
const stoneReg = /\s*((\/\/.*)|([0-9]+)|("(\\"|\\\\|\\n|[^"])*\")|([A-Za-z_][A-Za-z0-9_]*)|(==|<=|>=|&&|\|\|)|([\{\}\=\+\-\*\/\>\<\?\.\,\;\!\(\)\%]))?/g
// 正则分组 map
const STONE_GROUP_MAP = {
  ALL: 1,
  COMMENT: 2,
  NUMBER: 3,
  STRING_WITH_COMMA: 4,
  STRING_WITHOUT_COMMA: 5,
  IDENTIFIER: 6,
  IDENTIFIER_IN_TWO_CHARS: 7,
  IDENTIFIER_IN_SINGLE_CHARS: 8
}

class Lexer {
  constructor ({ filePath }) {
    this.hasMore = true
    this.filePath = filePath
    this.reader = new Reader({ filePath })
    this.queue = []
  }

  /**
   * 读取 tokens
   */
  read () {
    // 可以填充 queue，则填充 queue 后一个个取
    if (this.fillQueue(0)) {
      return this.queue.shift()
    } else {
      // 不可以填充 queue，则整个文件结束
      return Token.EOF
    }
  }

  /**
   * 获取第 idx 个token
   * @param { Number } idx 
   */
  peek (idx) {
    if (this.fillQueue(idx)) {
      return this.queue[idx]
    } else {
      return Token.EOF
    }
  }

  /**
   * 填充 tokens queue
   * @param { Number } idx 
   */
  fillQueue (idx) {
    while (idx >= this.queue.length) {
      if (this.hasMore) {
        this.readLine()
      } else {
        return false
      }
    }
    return true
  }

  /**
   * 读取每一行的数据，填入到 queue 中
   */
  readLine () {
    // 读取一行的数据
    const line = this.reader.readLine()

    // 如果这行么得了，就直接返回了，并且置反 hasMore
    if (line === null) {
      this.hasMore = false
      return
    }
    // 行号
    const lineNumber = this.reader.getLineNumber()

    console.log(`读取到第 ${lineNumber} 行 : ${line}`)

    // 是否为有效 token
    let start = 0
    const end = line.length

    while (start < end) {
      const matcher = stoneReg.exec(line)
      if (matcher[1]) {
        this.addToken({
          lineNumber,
          matcher
        })
        start = stoneReg.lastIndex
      } else {
        parseError({
          lineNumber,
          line,
          charIdx: stoneReg.lastIndex,
          filePath: this.filePath
        })
      }
    }
    stoneReg.lastIndex = 0
    this.queue.push(new IdToken(lineNumber, Token.EOL ))
  }

  /**
   * 添加 token
   */
  addToken ({ lineNumber, matcher }) {
    const token = this.tokenResolver(matcher, lineNumber)
    if (token) {
      this.queue.push(token)
    }
  }

  tokenResolver (matcher, lineNumber) {
    // 参照物为 matcher[1], 哪个相等，则进哪个
    const reference = matcher[STONE_GROUP_MAP.ALL]
    let TargetTokenConstructor = null
    switch (reference) {
      case matcher[STONE_GROUP_MAP.COMMENT]:
        TargetTokenConstructor = CommentToken
        break
      case matcher[STONE_GROUP_MAP.NUMBER]:
        TargetTokenConstructor = NumberToken
        break
      case matcher[STONE_GROUP_MAP.STRING_WITH_COMMA]:
      case matcher[STONE_GROUP_MAP.STRING_WITHOUT_COMMA]:
        TargetTokenConstructor = StringToken
        break
      case matcher[STONE_GROUP_MAP.IDENTIFIER]:
      case matcher[STONE_GROUP_MAP.IDENTIFIER_IN_TWO_CHARS]:
      case matcher[STONE_GROUP_MAP.IDENTIFIER_IN_SINGLE_CHARS]:
        TargetTokenConstructor = IdToken
        break
    }
    return TargetTokenConstructor
      ? new TargetTokenConstructor(lineNumber, reference)
      : null
  }
}

module.exports = Lexer