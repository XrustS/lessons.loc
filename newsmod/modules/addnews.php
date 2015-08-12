<?php
/**
 * Модуль добавления новой новости
 */
require_once  __DIR__.'/../functions/sql.php';

?>
<form action="<?php echo $_SERVER['PHP_SELF'] ?>" method="post">
    <input type="text" name="title" id="title">
    <label for="title">Input title:</label>
    <textarea name="Text" id="Text"></textarea>
    <label for="Text">Text news:</label>
    <input type="submit" value="Send news">
    <input type="reset" value="Reset fields">
</form>
<?php

if(isset($_POST)&&!empty($_POST))
{
    $title = $_POST['title'];
    $text = $_POST['Text'];
    echo $sql ="INSERT INTO news SET title='".$title."', Text='".$text."', Pic='dd'";

    mysqlQwery($sql,1);
}
?>
