<?php

require_once __DIR__.'/models/news.php';
$listnews = News::get_AllNews();
include __DIR__.'/views/shownews.php';