<?php

require_once __DIR__."/../models/News.class.php";

if(isset($_POST)&&!isset($_FILES)){
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
    <input type="text" name="title" id="title"><label for="title">Введите заголовок новости:</label>
    <input type="text" name="text" id="text"><label for="text">Введите новость:</label>
    <input type="file" name="image" value="Загрузить фото"> <input type="submit" value="Соханить новость">
</form>
<?php var_dump(News::get_AllNews());?>
</body>
</html>


