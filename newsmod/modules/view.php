<?php
/**
 * Error report
 */
ini_set('display_errors',1);
ini_set('display_startup_errors',1);
error_reporting(-1);

include_once __DIR__.'/../functions/sql.php';

$sql = "SELECT *
        FROM news";
$row=null;
$row = mysql_fetchAll($sql);
?> <pre>
<?php
var_dump($row);
?></pre>
