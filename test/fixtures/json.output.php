<?php $items = json_decode('[
  {
    "name": "马东敏",
    "title": "百度CEO李彦宏夫人"
  }, {
    "name": "马云",
    "title": "阿里巴巴集团创始人"
  }, {
    "name": "马化腾",
    "title": "腾讯公司创始人兼CEO"
  }
]'); ?>

<div>
  <ol>
<?php foreach ($items as $item) { ?>
    <li>
      <span><?php echo htmlentities($item->name) ?></span><em>:</em><span><?php echo htmlentities($item->title) ?></span><button>show</button>
    </li>
<?php } ?>
  <ol>
</div>