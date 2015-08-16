<?php
/**
 * Created by PhpStorm.
 * User: aek
 * Date: 12.08.2015
 * Time: 11:42
 */
function img_resize( $tmpname, $wr, $hr, $save_dir, $save_name, $maxisheight = 0 )
{
    function kvadrator ($ratio, $width_sour, $height_sour, $trim_percent){

        $arrOut = null;
        if(($width_sour > 0)&&($height_sour > 0)&& ($trim_percent > 0)){

            if($width_sour <= $height_sour) {

                $x1 = $width_sour * $trim_percent / 100;
                $x2 = $width_sour - $x1;
                $width_tmp = $x2 - $x1;
                $height_tmp =  $width_tmp / $ratio ;
                $y1 = $height_sour / 2 - $height_tmp / 2;
                $y2 = $y1 + $height_tmp;

            } else {
                $y1 = $height_sour * $trim_percent / 100;
                $y2 = $height_sour - $y1;
                $height_tmp = $y2 - $y1;
                $width_tmp =  $height_tmp * $ratio;
                $x1 = $width_sour / 2 - $width_tmp / 2;
                $x2 = $x1 + $width_tmp;
            }
            $arrOut['x1'] = (int)$x1;
            $arrOut['x2'] = (int)$x2;
            $arrOut['y1'] = (int)$y1;
            $arrOut['y2'] = (int)$y2;
            $arrOut['width'] = (int)$width_tmp;
            $arrOut['height'] = (int)$height_tmp;
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

    if(!isset($kvad)) return false;

    $im = imagecreatetruecolor($wr,$hr);
    if (imagecopyresampled($im,$imorig , 0,0,$kvad['x1'],$kvad['y1'],$wr,$hr,$kvad['width'],$kvad['height']))
        if (imagejpeg($im, $save_dir.$save_name))
            return true;
        else
            return false;
}
function print_form(){
    ?><form action="#" method="post" enctype="multipart/form-data">
        <h1>Добавление новости</h1>
        <label for="title">Введите заголовок новости:</label>
        <input type="text" name="title" id="title">
        <label for="Text">Текст новости:</label>
        <textarea name="Text" id="Text"></textarea>
        <input type="submit" value="Добавить новость">
        <input type="reset" value="Очистить поля">
        <input type="file" id="filepath" value="Загрузите файл">
    </form>
    <?php
}
function showNews(){
    $sql = 'select * from news;';
    $row = mysqlQwery($sql);
    foreach($row as $item){
        ?>
        <div class="news">
    <?php if(empty($item['Pic'])){
            echo '<div class="img"></div>';
            } else {echo '<img src="./smallimg/'.$item['Pic'].'">'; }
             ?>
            <a href="#"> <?php echo $item['title']; ?></a>
            <div class="textnews">
                <p> <?php echo $item['Text']; ?></p>
            </div>
        </div>
    <?php
    }
}
function addNews($title, $text, $farr){

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
function delNews(){

}