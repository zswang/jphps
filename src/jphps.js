(function (exportName) {
  /*<remove>*/
  'use strict';
  /*</remove>*/

  var exports = exports || {};

  /*<jdists encoding="ejs" data="../package.json">*/
  /**
   * @file <%- name %>
   *
   * <%- description %>
   * @author
       <% (author instanceof Array ? author : [author]).forEach(function (item) { %>
   *   <%- item.name %> (<%- item.url %>)
       <% }); %>
   * @version <%- version %>
       <% var now = new Date() %>
   * @date <%- [
        now.getFullYear(),
        now.getMonth() + 101,
        now.getDate() + 100
      ].join('-').replace(/-1/g, '-') %>
   */
  /*</jdists>*/

  /**
   * 是否行是否输出
   *
   * @param {string} line 行
   * @return {Boolean} 返回该行是否为内容输出
   '''<example>'''
   * @example isOutput():expression 1
    ```js
    console.log(jphps.isOutput('print: #{$name}'));
    // > true
    ```
   * @example isOutput():expression 2
    ```js
    console.log(jphps.isOutput('print: !#{$title}'));
    // > true
    ```
   * @example isOutput():Begin "&"
    ```js
    console.log(jphps.isOutput('& 8848'));
    // > true
    ```
   * @example isOutput():Begin "="
    ```js
    console.log(jphps.isOutput('= 8848'));
    // > true
    ```
   * @example isOutput():Begin ":"
    ```js
    console.log(jphps.isOutput(': 8848'));
    // > true
    ```
   * @example isOutput():Begin "|"
    ```js
    console.log(jphps.isOutput('| 8848'));
    // > true
    ```
   * @example isOutput():Begin "汉字"
    ```js
    console.log(jphps.isOutput('汉字'));
    // > true
    ```
   * @example isOutput():Begin "<"
    ```js
    console.log(jphps.isOutput('<li>item1</li>'));
    // > true
    ```
   * @example isOutput():Begin "##"
    ```js
    console.log(jphps.isOutput('## title'));
    // > true
    ```
   * @example isOutput():Keyword "else"
    ```js
    console.log(jphps.isOutput('else'));
    // > false
    ```
   * @example isOutput():Keyword "void"
    ```js
    console.log(jphps.isOutput('void'));
    // > false
    ```
   * @example isOutput():Keyword "try"
    ```js
    console.log(jphps.isOutput('try'));
    // > false
    ```
   * @example isOutput():Keyword "finally"
    ```js
    console.log(jphps.isOutput('finally'));
    // > false
    ```
   * @example isOutput():Keyword "elseif"
    ```js
    console.log(jphps.isOutput('elseif'));
    // > false
    ```
   * @example isOutput():Keyword "echo"
    ```js
    console.log(jphps.isOutput('echo VERSION'));
    // > false
    ```
   * @example isOutput():Keyword "do"
    ```js
    console.log(jphps.isOutput('do'));
    // > false
    ```
   * @example isOutput():Not keyword "hello"
    ```js
    console.log(jphps.isOutput('hello'));
    // > true
    ```
   '''</example>'''
   */
  function isOutput(line) {
    // 碰见替换表达式
    // 示例：title: #{title}
    if (/^.*#\{[^}]*\}.*$/.test(line)) {
      return true;
    }

    // 特殊字符开头
    // 示例：&、=、:、|
    if (/^[ \t]*[&=:|].*$/.test(line)) {
      return true;
    }

    // 非 PHP 字符开头
    // 示例：#、<div>、汉字
    if (/^[ \w\t_$]*([^&\^?|\n\w\/'"{}\[\]+\-():;, \t=\.$_]|:\/\/).*$/.test(line)) {
      return true;
    }

    // 不是 else 等单行语句
    // 示例：hello world
    if (/^(?!\s*(else|elseif|do|try|finally|void|(echo|print|typeof)\s[\w$_]*)\s*$)[^'":;{}()\[\],\n|=&\/^?]+$/.test(line)) {
      return true;
    }
    return false;
  }
  exports.isOutput = isOutput;

  /**
   * 编译模板
   *
   * @param {string} template 模板字符串资源
   * @return {string} 返回模板
   */
  function build(template) {
    if (!template) {
      return template;
    }
    var lines = String(template).split(/\n\r?/).map(function (line, index, array) {
      if (/^\s*$/.test(line)) {
        return line;
      }
      else if (isOutput(line)) {
        return line.replace(/(!?#)\{("([^\\"]|(\\.))*"|'([^\\']|(\\.))*'|[^}]*)\}/g,
          function (all, flag, value) {
            switch (flag) {
            case '#': // 需要转义，防止 XSS
              return '<?php echo htmlentities(' + value + ') ?>';
            case '!#': // 不需要转义
              return '<?php echo ' + value + ' ?>';
            }
          });
      }
      else {
        return '<?php ' + line + ' ?>';
      }
    });
    return lines.join('\n')
      .replace(/ \?>(\s*)<\?php /g, '$1');
  }

  exports.build = build;

  /*<remove>
  console.log(build(`
function renderItem($item) {
  if (isset($item)) {
    <li>
      <a href="!#{$item['url']}">#{$item['title']}</a>
    </li>
  }
}

renderItem(array('url' => 'http://google.com/', 'title' => 'Google'));
   `));
  //</remove>*/

  if (typeof define === 'function') {
    if (define.amd || define.cmd) {
      define(function () {
        return exports;
      });
    }
  }
  else if (typeof module !== 'undefined' && module.exports) {
    module.exports = exports;
  }
  else {
    window[exportName] = exports;
  }

})('jphps');