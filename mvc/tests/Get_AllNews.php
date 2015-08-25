<?php

require __DIR__."/../models/news.php";

$objlist= News::get_AllNews();
var_dump($objlist);