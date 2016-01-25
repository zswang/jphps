jphps(<%>)
-----

# [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][coverage-image]][coverage-url]

## 处理前

```html
function renderItem($item) {
  if (isset($item)) {
  <li>
    <a href="!#{$item['url']}">#{$item['title']}</a>
  </li>
  }
}

<ul>
renderItem(array('url' => 'http://google.com/', 'title' => 'Google'));
renderItem(array('url' => 'http://www.baidu.com/', 'title' => '百度'));
</ul>
```

## 处理后

```php
<?php function renderItem($item) {
  if (isset($item)) { ?>
  <li>
    <a href="<?php echo $item['url'] ?>"><?php echo htmlentities($item['title']) ?></a>
  </li>
<?php   }
} ?>

<ul>
<?php renderItem(array('url' => 'http://google.com/', 'title' => 'Google'));
renderItem(array('url' => 'http://www.baidu.com/', 'title' => '百度')); ?>
</ul>
```

## 运行后

```html

<ul>
  <li>
    <a href="http://google.com/">Google</a>
  </li>
  <li>
    <a href="http://www.baidu.com/">百度</a>
  </li>
</ul>
```

## License

MIT © [zswang](http://weibo.com/zswang)

[npm-url]: https://npmjs.org/package/jphps
[npm-image]: https://badge.fury.io/js/jphps.svg
[travis-url]: https://travis-ci.org/zswang/jphps
[travis-image]: https://travis-ci.org/zswang/jphps.svg?branch=master
[coverage-url]: https://coveralls.io/github/zswang/jphps?branch=master
[coverage-image]: https://coveralls.io/repos/zswang/jphps/badge.svg?branch=master&service=github
