<?php
require_once __DIR__."/./modules/news.php";
if(isset($_POST)&& isset($_FILES)){
    addNews($_POST['title'], $_POST['Text'], $_FILES['Pic']);
}
?>
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <link href='http://fonts.googleapis.com/css?family=PT+Sans:400,700&subset=latin,cyrillic' rel='stylesheet' type='text/css'>
    <!--<link rel="stylesheet" href="css/normalize.css">-->
    <link rel="stylesheet" href="css/style.css">
    <title>Новостная лента</title>
</head>
<body>
<div class="wrapper">
    <header>
        <h1>Новости</h1>
        <a href="index.php?action=addnews">Добавить новость</a>
    </header>

        <?php
       /*  if($_GET['action']=='addnews')   print_form();
        elseif ($_GET['action']=='viewnews' && $_GET['id']!='') showNews($_GET['id']);
            else */showNews('21');

        ?>
    </section>
</div>
</body>
</html>