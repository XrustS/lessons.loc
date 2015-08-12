<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
    <link rel="stylesheet" href="css/normalize.css">
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
<form action="" method="post" enctype="multipart/form-data">
    <input type="file" name="pic">
    <input type="submit" value="Upload">
    <input type="text" name="rrr">
</form>
<?php
/* Upload files*/


var_dump($_POST);
var_dump($_FILES);

?>
</body>
</html>
