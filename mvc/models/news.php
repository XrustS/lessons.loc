<?php

abstract class News {
    protected $title;
    protected $text;
    protected $images;


   public function set_news($title,$text,$images = null){
       $this->title = $title;
       $this->text  = $text;
       $this->images = $images;
   }
   public function get_news($idnews=null){

    }



}