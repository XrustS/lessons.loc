<?php

    include __DIR__."/../models/Db.class.php";
    include __DIR__."/../models/News.class.php";


$db = new DB();
/*assert(
    [
        [ 'id'=>'1', 'text'=>'Test1' ],
        [ 'id'=>'2', 'text'=>'Test2' ],
    ] ==*/
    var_dump($db->query("SELECT * FROM test")->fetchObj(News));
echo "TEST PASSED";