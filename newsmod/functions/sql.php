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
    $link = mysqlInitDB();
    $query = mysqlCleanSpc($query);
		$sql = "INSERT INTO news (title, Text, Pic) VALUES('NNNNN', 'RRRRRR', 'E') ";
    $result = mysql_query($sql);
    if (!$result){
        die("Ошибочный запрос: $query ".mysql_errno());
    }
    if($status==0){
        while($row=mysql_fetch_assoc($result)){
            $arr[] = $row;
        };
        return $arr;
    }
    mysql_close($link);
};

