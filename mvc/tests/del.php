<?php
include __DIR__."/../models/News.class.php";
$mess='';
if(!empty($_GET['idnews']) && $_GET['action'] ==='del' ){
    $id = (int)$_GET['idnews'];
    if($id) {
        $news = new News();
        if($news->deleteNews($id)) {$mess="Новость id: $id удалена!";
            header('Location: '.$_SERVER['PHP_SELF']);
            exit;
        }else { $mess = "Новость не удалена."; }
    }
}
 $url = $_SERVER['PHP_SELF'];
//var_dump($_SERVER);


?>
<!doctype html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <title>Delete news TEST</title>
</head>
<body>
<?php
echo $mess."<br>";
$arr = News::get_AllNews();
echo "Количество новостей: ".count($arr);
echo "<hr>";
foreach($arr as $item){
    ?>
    <h1><?php echo $item->title; ?></h1><a href="<? echo $url."?action=del&idnews=".$item->get_idNews()?>">удалить новость</a> <br>
    <p><?php echo $item->Text; ?></p><br>
    <p><?php echo $item->Pic; ?></p><br>
    <hr>
<?php
}



?>
</body>
</html>