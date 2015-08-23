<?php

include "../models/db.class.php";

$db = new DataBase("localhost","root","","test");
assert(
    [
        [ 'id'=>'1', 'text'=>'Test1' ],
        [ 'id'=>'2', 'text'=>'Test2' ],
    ] ==
    $db->query("SELECT * FROM test")
    );
echo "TEST PASSED";