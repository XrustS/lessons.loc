<?php

include "../models/db.class.php";

$db = new DataBase("localhost","root","","test");
assert(true === $db->initDB());
echo "TEST PASSED";