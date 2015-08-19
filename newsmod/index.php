<?php
require_once __DIR__."/./modules/news.php";
if(isset($_POST)){
    if(isset($_FILES)){
       addNews(htmlspecialchars($_POST['title']),htmlspecialchars($_POST['Text']), $_FILES['Pic']);
    }
    if($_POST['choise']==="success"){
        delNews($_POST['idnews']);
    }
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
       if(isset($_GET))
           switch($_GET['action']){
               case "addnews":
                   print_Addform(); break;
               case "viewnews":
                   if($_GET['id']!='') showNews($_GET['id']); break;
               case "delnews":
                   if(!empty($_GET['id'])) print_Delform($_GET['id']);break;
               default:
                   showNews("All");
           }


        ?>
    </section>
</div>

<script src="js/jquery-1.11.3.min.js"></script>
<script src="js/jquery.plainmodal.min.js"></script>
</body>
</html>