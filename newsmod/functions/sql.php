<?php
    /* функции для работы с БД
    */

function mysqlInitDB()
{
    $link = mysql_connect('localhost','root','');
    if (!$link){
        die('Ошибка соединения: '.mysql_error());
    }
    mysql_select_db('newsmod',$link) or die('Ошибка select database: '.mysql_errno());
    return $link;
};
function mysqlCleanSpc($query)
{
    $query = htmlspecialchars($query);
    return mysql_real_escape_string($query);
};
function mysqlQwery($query, $status=0) // $status == 0 - select
{

    $query = mysqlCleanSpc($query);
    $result = mysql_query($query);
    if (!$result){
        die("Ошибочный запрос: $query ".mysql_errno());
    }
    if($status==0){
    return $result; }
};
function mysql_fetchAll($query){
    $link = mysqlInitDB();
    $result = mysqlQwery($query);
    while($row=mysql_fetch_assoc($result)){
        $arr[] = $row;
    };
    mysql_close($link);
    return $arr;
};
