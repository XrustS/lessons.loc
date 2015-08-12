<?php
/* Upload files*/
if(isset($_FILES['pic'])){
    if($_FILES['pic']['name'] == ''){
        echo "Не выбран файл.";
        die();
    }
    $fname = __DIR__."/".time().".jpeg";
    if (!copy($_FILES['pic']['tmp_name'], $fname)) {
        echo "не удалось скопировать $file...\n";
    }
    header('Location: index.php');
    exit();
}else {var_dump($_FILES);
    var_dump($_POST);}
?>
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
</head>
<body>
    <form action="" method="post" enctype="multipart/form-data">
        <input type="file" name="pic">
        <input type="submit" value="Upload">

    </form>

</body>
</html>