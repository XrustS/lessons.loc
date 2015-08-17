<?php
/**
 * Created by PhpStorm.
 * User: aek
 * Date: 12.08.2015
 * Time: 11:42
 */
require_once __DIR__."/../functions/sql.php";
function img_resize( $tmpname, $wr, $hr, $save_dir, $save_name )
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
    ?>
    <section>
     <form action="index.php" method="post" enctype="multipart/form-data">
        <h1>Добавление новости</h1>
        <label for="title">Введите заголовок новости:</label>
        <input type="text" name="title" id="title">
        <label for="Text">Текст новости:</label>
        <textarea name="Text" id="Text"></textarea>
        <input type="submit" value="Добавить новость">
        <input type="reset" value="Очистить поля">
        <input type="file" id="filepath" name="Pic" value="Загрузите файл">
     </form>
    </section>
    <?php
}
function showNews($idNews){
    $sql = 'select * from news;';
    $row = mysqlQwery($sql);
    if(count($row)){
        if($row['id'] == $idNews){?>

                <section>
                    <div class="news">
                        <?php if(empty($item['Pic'])){
                            echo '<div class="img"></div>';
                        } else {echo '<img class="img" src="./smallimg/'.$item['Pic'].'">'; }
                        ?>
                        <a href="#"> <?php echo $item['title']; ?></a>
                        <div class="textnews">
                            <p> <?php echo $item['Text']; ?></p>
                        </div>
                    </div>
                </section>
            <?php
        }else {
            echo "<section>";
            foreach($row as $item){
              ?>
                  <div class="news">
                      <?php if(empty($item['Pic'])){
                            echo '<div class="img"></div>';
                          } else {echo '<img class="img" src="./smallimg/'.$item['Pic'].'">'; }
                        ?>
                         <a href="index.php?action=viewnews&id=<?php echo $item['id']?>"> <?php echo $item['title']; ?></a>
                        <div class="textnews">
                            <p> <?php echo $item['Text']; ?></p>
                        </div>
                  </div>
                 <?php
            }
        echo "</section>";}
    } else echo "Новостей нет.";

}
function addNews($title, $text, $farr){

    if ($title!=''&&$text!=''&&isset($farr)){
        $filtrType = array('image/gif','image/jpeg','image/png');
        if (in_array($farr['type'],$filtrType)) {
            $fname = time() . ".jpg";
            $tmpf = $farr['tmp_name'];
            $dirSmall = './smallimg/';
            $dirBig = './bigimg/';
            if (!is_dir($dirSmall)) mkdir($dirSmall,0777);
            if (!is_dir($dirBig)) mkdir($dirBig,0777);
            copy($farr['tmp_name'],$dirBig.$fname);
            if (!img_resize($tmpf, 200, 150, $dirSmall, $fname)) {
                echo "Произошла ошибка img_resize</br>";
                var_dump($_FILES);
                $fname = null;
                }
        }
        $sql = "INSERT INTO news ".
               "(title, Text, Pic )".
               "VALUES ('$title', '$text', '$fname')";
        mysqlQwery($sql,1);
    }

}
function delNews($idNews){
    if(!empty($idNews)){
        $sql = "DELETE FROM news".
                "WHERE id='$idNews'";
        mysqlQwery($sql,1);
        return true;
    }return false;
}