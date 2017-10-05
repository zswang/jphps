/**
 * @file jphps
 *
 * PHP and HTML alternate static template
 * @author
 *   zswang (http://weibo.com/zswang)
 * @version 1.0.0
 * @date 2017-10-05
 */
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
declare function jphps_isOutput(line: string): boolean;
/**
 * 编译模板
 *
 * @param template 模板字符串资源
 * @return 返回模板
 */
declare function jphps_build(template: string): string;
export { jphps_isOutput as isOutput, jphps_build as build };
