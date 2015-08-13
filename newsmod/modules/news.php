<?php
/**
 * Created by PhpStorm.
 * User: aek
 * Date: 12.08.2015
 * Time: 11:42
 */
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
    $type_img = array("");
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
function delNews(){

}