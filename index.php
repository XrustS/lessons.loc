<?php
// Экронирование вводимой ниформацииша
if(isset($_POST)){
    $strout = $_POST['ord'];
    define('REPLACE_FLAGS', ENT_QUOTES|ENT_SUBSTITUTE );
    $fh = fopen('htmlout.txt',"a+");
    $str = $strout."  ----  ".htmlspecialchars($strout,REPLACE_FLAGS,'UTF-8')."/n";
    fwrite($fh,$str);
    fclose($fh);
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
        <input type="text" name="ord">
        <input type="submit" value="Upload">

    </form>
    &quot;
    <?php


    ?>

</body>
</html>