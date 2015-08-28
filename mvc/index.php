<?php

require_once __DIR__.'/models/News.class.php';
$listnews = News::get_AllNews();
include __DIR__.'/views/shownews.php';