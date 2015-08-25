<?php
require_once __DIR__."/DB.class.php";

class News {
    protected $id;
    public $title;
    public $Text;
    public $Pic;

    public function __construct(){


}


   public function set_news($title,$text,$images = null){
       // Устанавливаем значения полей новости
       $this->title = htmlspecialchars($title);
       $this->Text  = htmlspecialchars($text);
       $this->Pic = htmlspecialchars($images);
   }
   public function get_news($idnews=null){

    }
   public static function get_AllNews(){
       $sql = " SELECT *
              FROM news ";
       $db = new DataBase();
       $res = $db->query($sql);
       while( $row = mysql_fetch_object($res,News)){
           $objarr[] = $row;
       }
       if(empty($objarr)){
           return false;
       }
       return $objarr;



   }
}