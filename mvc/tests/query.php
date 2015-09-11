<?php

    include __DIR__."/../models/Db.class.php";
    include __DIR__."/../models/News.class.php";


$db = new DB();
assert(
    [
        0=>[ 'id'=>'1', 'text'=>'Test1' ],
        1=>[ 'id'=>'2', 'text'=>'Test2' ],
    ] ==
    $db->query("SELECT * FROM test")->fetchAssoc());
echo "TEST PASSED";