/**
 * @file jphps
 *
 * PHP and HTML alternate static template
 * @author
 *   zswang (http://weibo.com/zswang)
 * @version 1.0.1
 * @date 2017-11-08
 */
/*<function name="jphps_isOutput">*/
/**
 * 是否行是否输出
 *
 * @param line 行
 * @return 返回该行是否为内容输出
 * @example isOutput():expression 1
  ```js
  console.log(jphps.isOutput('print: #{$name}'))
  // > true
  ```
 * @example isOutput():expression 2
  ```js
  console.log(jphps.isOutput('print: !#{$title}'))
  // > true
  ```
 * @example isOutput():Begin "&"
  ```js
  console.log(jphps.isOutput('& 8848'))
  // > true
  ```
 * @example isOutput():Begin "="
  ```js
  console.log(jphps.isOutput('= 8848'))
  // > true
  ```
 * @example isOutput():Begin ":"
  ```js
  console.log(jphps.isOutput(': 8848'))
  // > true
  ```
 * @example isOutput():Begin "|"
  ```js
  console.log(jphps.isOutput('| 8848'))
  // > true
  ```
 * @example isOutput():Begin "汉字"
  ```js
  console.log(jphps.isOutput('汉字'))
  // > true
  ```
 * @example isOutput():Begin "<"
  ```js
  console.log(jphps.isOutput('<li>item1</li>'))
  // > true
  ```
 * @example isOutput():Begin "##"
  ```js
  console.log(jphps.isOutput('## title'))
  // > true
  ```
 * @example isOutput():Keyword "else"
  ```js
  console.log(jphps.isOutput('else'))
  // > false
  ```
 * @example isOutput():Keyword "void"
  ```js
  console.log(jphps.isOutput('void'))
  // > false
  ```
 * @example isOutput():Keyword "try"
  ```js
  console.log(jphps.isOutput('try'))
  // > false
  ```
 * @example isOutput():Keyword "finally"
  ```js
  console.log(jphps.isOutput('finally'))
  // > false
  ```
 * @example isOutput():Keyword "elseif"
  ```js
  console.log(jphps.isOutput('elseif'))
  // > false
  ```
 * @example isOutput():Keyword "echo"
  ```js
  console.log(jphps.isOutput('echo VERSION'))
  // > false
  ```
 * @example isOutput():Keyword "do"
  ```js
  console.log(jphps.isOutput('do'))
  // > false
  ```
 * @example isOutput():Not keyword "hello"
  ```js
  console.log(jphps.isOutput('hello'))
  // > true
  ```
 */
function jphps_isOutput(line: string): boolean {
  // 碰见替换表达式
  // 示例：title: #{title}
  if (/^.*#\{[^}]*\}.*$/.test(line)) {
    return true
  }
  // 特殊字符开头
  // 示例：&、=、:、|
  if (/^[ \t]*[&=:|].*$/.test(line)) {
    return true
  }
  // 非 PHP 字符开头
  // 示例：#、<div>、汉字
  if (/^[ \w\t_$]*([^&\^?|\n\w\/'"{}\[\]+\-():, \t=\.$_]|:\/\/).*$/.test(line)) {
    return true
  }
  // 不是 else 等单行语句
  // 示例：hello world
  if (/^(?!\s*(return|else|elseif|do|try|finally|void|(echo|print|typeof)\s[\w$_]*)\s*$)[^'":{}()\[\],\n|=&\/^?]+$/.test(line)) {
    return true
  }
  return false
} /*</function>*/
/*<function name="jphps_build" depend="jphps_isOutput">*/
/**
 * 编译模板
 *
 * @param template 模板字符串资源
 * @return 返回模板
 */
function jphps_build(template: string): string {
  if (!template) {
    return template
  }
  let lines = String(template).split(/\n\r?/).map((line, index, array) => {
    if (/^\s*$/.test(line)) {
      return line
    }
    if (jphps_isOutput(line)) {
      return line.replace(/(!?#)\{("([^\\"]|(\\.))*"|'([^\\']|(\\.))*'|[^}]*)\}/g,
        (all, flag, value) => {
          switch (flag) {
            case '#': // 需要转义，防止 XSS
              return `<?php echo htmlspecialchars(${value}) ?>`
            case '!#': // 不需要转义
              return `<?php echo ${value} ?>`
          }
        })
    }
    return '<?php ' + line + ' ?>'
  })
  return lines.join('\n').replace(/ \?>(\s*)<\?php /g, '$1')
} /*</function>*/
export {
  jphps_isOutput as isOutput,
  jphps_build as build,
}
