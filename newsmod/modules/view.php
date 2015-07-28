<?php

error_reporting(E_ALL);
ini_set("display_errors", 1);

include_once __DIR__.'/../functions/sql.php';
$sql = 'select * from news;';
$row = mysql_fetchAll($sql);
//var_dump($row);
if(isset($_GET)&&empty($_GET['id'])){
    
}
foreach($row as $item){
   echo '<b>'.$item['title'].'</b><br/>';
   echo $item['Text'].'<br/>';
}