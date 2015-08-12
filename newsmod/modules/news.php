<?php
/**
 * Created by PhpStorm.
 * User: aek
 * Date: 12.08.2015
 * Time: 11:42
 */
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
    if($title!="" && $text!=""){
        if(isset($farr)&&($farr['name']!='')){
        //upload
        //resize img
        //

        }
    }else return false;

}
function delNews(){

}