<?php
    /* функции для работы с БД
    */
function mysqlInitDB()
{
    $link = mysql_connect('localhost','root','');
    if (!$link){
        die('Ошибка соединения: '.mysql_error());
    }
};
function mysqlCleanSpc($query)
{
    $query = htmlspecialchars($query);
    return mysql_real_escape_string($query);
};
function mysqlQwery($query)
{
    $query = mysqlCleanSpc($query);
    $result = mysql_query($query);
    if (!$result){
        die('Ошибочный запрос: '.mysql_errno());
    }
    return $result;
};
function mysql_fetchAll($query){
    $result = mysqlQwery($query);
    while($row=mysql_fetch_row($result)){
        $return[] = $row;
    }
    mysql_close($result);
    return $return;
};

?>