<?php

require __DIR__."/../models/News.class.php";

$listnews = News::get_AllNews();
?>
<!doctype html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <title>Test show news</title>
</head>
<body>
<section>
    <?php
    if(isset($listnews)):
        foreach($listnews as $item): ?>
            <div class="news">
                <?php if(!empty($item->Pic)): ?>
                    <a href="../upload/bigimg/<?php echo $item->Pic;?>">
                        <img src="../upload/smallimg/<?php echo $item->Pic;?>">
                    </a>
                <?php else: ?>
                    <div class="img"></div>
                <?php endif; ?>
                <h2><?php echo $item->title; ?></h2>
                <p><?php echo $item->Text; ?></p>
            </div>
        <?php endforeach;
    else:
        echo "Новостей нет.";
    endif;
    ?>
</section>
</body>
</html>