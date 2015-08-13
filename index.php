<?php
/* Upload files*/
function img_resize( $tmpname, $wr, $hr, $save_dir, $save_name, $maxisheight = 0 )
{
    function kvadrator ($ratio, $width_sour, $height_sour, $trim_percent){

        $arrOut = null;
        if(($width_sour > 0)&&($height_sour > 0)&& ($trim_percent > 0)){

            $width_sour = abs($width_sour);
            $height_sour = abs($height_sour);

        if($width_sour <= $height_sour) {

            $x1 = $width_sour * $trim_percent / 100;
            $x2 = $width_sour - $x1;
            $width_tmp = $x2 - $x1;
            $height_tmp = abs($ratio * $width_tmp);
            $y1 = $height_sour / 2 - $height_tmp / 2;
            $y2 = $y1 + $height_tmp;

        } else {
            $y1 = $height_sour * $trim_percent / 100;
            $y2 = $height_sour - $y1;
            $height_tmp = $y2 - $y1;
            $width_tmp = abs($ratio * $height_tmp);
            $x1 = $width_sour / 2 - $width_tmp / 2;
            $x2 = $x1 + $width_tmp;
        }
        $arrOut['x1'] = (int)$x1;
        $arrOut['x2'] = $x2;
        $arrOut['y1'] = $y1;
        $arrOut['y2'] = $y2;
        $arrOut['width'] = $width_tmp;
        $arrOut['height'] = $height_tmp;
        }
        return $arrOut;
    }

    if (($wr <= 0 ) || ($hr <= 0))
        return false;
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

    $ratio =$wr/$hr;

    $kvad = kvadrator($ratio,$x,$y,10);
    var_dump($kvad);
    if(!isset($kvad)) return false;

    $im = imagecreatetruecolor($wr,$hr);
    if (imagecopyresampled($im,$imorig , 0,0,$kvad['x1'],$kvad['y1'],$kvad['width'],$kvad['height'],$wr,$hr))
//imagecopyresampled($dst_image, $src_image ,$dst_x ,$dst_y ,$src_x ,$src_y ,$dst_w ,$dst_h ,$src_w ,$src_h )
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
    if(!img_resize($tmpf,200,150,'./thumsimg/',$fname)){
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