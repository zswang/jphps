<?php function renderItem($item) { ?>
<?php   if (isset($item)) { ?>
  <li>
    <a href="<?php echo $item['url'] ?>"><?php echo htmlentities($item['title']) ?></a>
  </li>
<?php   } ?>
<?php } ?>

<ul>
<?php renderItem(array('url' => 'http://google.com/', 'title' => 'Google')); ?>
<?php renderItem(array('url' => 'http://www.baidu.com/', 'title' => '百度')); ?>
</ul>