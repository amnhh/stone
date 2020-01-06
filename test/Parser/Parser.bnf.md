代码用例：

```js
const again = "bcd"; // 这是注释
if (again) { return; }

while (i < 10) {
  if (i % 2) {
    even = even + i
  } else {
    odd = 1
  }
}
```

对应的 `BNF` 语法定义:

```
# 终结符
primary : "(" expression ")" | NUMBER | IDENTIFIER | STRING

# 因子、非终结符
factor : "-" primary | primary

# 表达式
# 表达式可以是一个简单的 factor，如果有第二个 factor 的话，则必须和双目操作符 OPERATOR 一同出现
expression : factor { OPERATOR factor }

# 块
# 可以是一个空的块标签，只包含 {  }
# 可以只包含一条语句，{ statement }
# 可以包含多条语句，多条语句时，从第二条语句开始，分号(;) 或者 EOL 必须出现，此时 statement 可出现也可不出现：{ statement1; statement2; ; ; }
block : "{" [statement] { (";" | EOL) [statement] } "}"

# 简单表达式语句
simple : expression

# 语句
# if 语句、while 语句、简单表达式语句
# if 语句的 else 必须和 block 一起出现
# while 语句后的 block 必须出现
statement : "if" "(" expression ")" block ["else" block]
          | "while" "(" expression ")" block
          | simple

# 非终结符
# 可以为一个空行，也可以为一个只包含分号的行
program : [statement] (";" | EOL)
```

