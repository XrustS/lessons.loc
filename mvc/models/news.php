<?php
require_once "./DB.class.php";

abstract class News {
    protected $idnews;
    protected $title;
    protected $text;
    protected $images;


   public function set_news($title,$text,$images = null){
       // Устанавливаем значения полей новости
       $this->title = htmlspecialchars($title);
       $this->text  = htmlspecialchars($text);
       $this->images = htmlspecialchars($images);




   }
   public function get_news($idnews=null){

    }
   public function get_AllNews(){

   }



}