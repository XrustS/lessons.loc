<?php
/* Upload files*/
function img_resize( $tmpname, $size, $save_dir, $save_name, $maxisheight = 0 )
{
    $save_dir     .= ( substr($save_dir,-1) != "/") ? "/" : "";
    $gis        = getimagesize($tmpname);
    $type        = $gis[2];
    switch($type)
    {
        case "1": $imorig = imagecreatefromgif($tmpname); break;
        case "2": $imorig = imagecreatefromjpeg($tmpname);break;
        case "3": $imorig = imagecreatefrompng($tmpname); break;
        default:  $imorig = imagecreatefromjpeg($tmpname);
    }

    $x = imagesx($imorig);
    $y = imagesy($imorig);

    $woh = (!$maxisheight)? $gis[0] : $gis[1] ;

    if($woh <= $size)
    {
        $aw = $x;
        $ah = $y;
    }
    else
    {
        if(!$maxisheight){
            $aw = $size;
            $ah = $size * $y / $x;
        } else {
            $aw = $size * $x / $y;
            $ah = $size;
        }
    }
    $im = imagecreatetruecolor($aw,$ah);
    if (imagecopyresampled($im,$imorig , 0,0,0,0,$aw,$ah,$x,$y))
        if (imagejpeg($im, $save_dir.$save_name))
            return true;
        else
            return false;
}

if(isset($_FILES['pic'])){
    if($_FILES['pic']['name'] == ''){
        echo "Не выбран файл.";
        die();
    }
    $fname =time().".jpg";
    $tmpf = $_FILES['pic']['tmp_name'];
    if(!img_resize($tmpf,200,'./thumsimg/',$fname)){
        echo "Произошла ошибка img_resize</br>";
        var_dump($_FILES);
    }else {

    header('Location: index.php');
    exit();
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
        <input type="file" name="pic">
        <input type="submit" value="Upload">

    </form>

</body>
</html>