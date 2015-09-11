<?php

require_once __DIR__."/../models/News.class.php";

if(isset($_POST)){
    if(!empty($_POST['title'])) {
        $news = new News();
        $news->set_news($_POST['title'], $_POST['text'], $_FILES['image']);
        header('Location: http://lessons.loc/mvc/tests/addnews.php ');
    }

}
?>
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
</head>
<body>
<form action="" method="post" enctype="multipart/form-data">
    <label for="title">Введите заголовок новости:</label><br>
    <input type="text" name="title" id="title"><br>
    <label for="text">Введите новость:</label><br>
    <textarea  name="text" id="text"></textarea><br>
    <input type="file" name="image" value="Загрузить фото"> <input type="submit" value="Соханить новость">
</form>
<?php
    $arr = News::get_AllNews();
    echo "Количество новостей: ".count($arr);
    echo "<hr>";
    foreach($arr as $item){
    ?>

        <h1><?php echo $item->title; ?></h1><br>
        <p><?php echo $item->Text; ?></p><br>
        <p><?php echo $item->Pic; ?></p><br>
        <hr>

    <?php
}



?>
</body>
</html>


