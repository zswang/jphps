jphps
-----

## 处理前

```html
function renderItem($item) {
  if (isset($item)) {
    <li>
      <a href="!#{$item['url']}">#{$item['title']}</a>
    </li>
  }
}

renderItem(array('url' => 'http://google.com/', 'title' => 'Google'));
```

## 处理后

```php
<?php function renderItem($item) { ?>
<?php   if (isset($item)) { ?>
    <li>
      <a href="<?php echo $item['url'] ?>"><?php echo htmlentities($item['title']) ?></a>
    </li>
<?php   } ?>
<?php } ?>

<?php renderItem(array('url' => 'http://google.com/', 'title' => 'Google')); ?>
```
