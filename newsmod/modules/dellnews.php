<?php
if(isset($_GET)&&$_GET['action'] === "del"&&!empty($_GET['id'])){
 require_once __DIR__.'/../functions/sql.php';
    $id = $_GET['id'];
    $sql='DELETE FROM news WHERE id = '.$id;
    mysqlQwery($sql,1);
    header('Location: index.php');
    exit();
}
