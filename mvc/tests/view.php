<?php

include __DIR__."/../models/View.class.php";

$out = "<h1>Test Passed</h1>";
$view = new View("maintemplate.php",$out);