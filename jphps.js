(function (exportName) {
  var exports = exports || {};
  /**
   * @file jphps
   *
   * PHP and HTML alternate static template
   * @author
   *   zswang (http://weibo.com/zswang)
   * @version 0.0.1
   * @date 2016-01-23
   */
  /**
   * 是否行是否输出
   *
   * @param {string} line 行
   * @return {Boolean} 返回该行是否为内容输出
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
    if (/^(?!\s*(else|elseif|echo|print|do|try|finally|void|typeof\s[\w$_]*)\s*$)[^'":;{}()\[\],\n|=&\/^?]+$/.test(line)) {
      return true;
    }
  }
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
    var lines = String(template).split(/\n\r?/).map(function (line) {
      if (/^\s*$/.test(line)) {
        return line;
      }
      else if (isOutput(line)) {
        return line.replace(/(!?#)\{("([^\\"]|(\\.))*"|'([^\\']|(\\.))*'|[^}]*)\}/g,
          function (all, flag, value) {
            switch (flag) {
            case '#':
              return '<?php echo htmlentities(' + value + ') ?>';
            case '!#':
              return '<?php echo ' + value + ' ?>';
            }
            return flag + '{' + value.replace(/\}/g, '\\x7d').replace(/\\/g, '\\x5c') + '}';
          });
      }
      else {
        return '<?php ' + line + ' ?>';
      }
    });
    return lines.join('\n');
  }
  exports.build = build;
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