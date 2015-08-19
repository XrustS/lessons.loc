<?php
/* Upload files*/
define('CHARSET', 'UTF-8');
echo ini_get("default_charset");
 if(isset($_POST)){
     //echo ord($_POST['ord']);
     echo htmlspecialchars($_POST['ord']);//'\39\34\96');
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

</body>
</html>