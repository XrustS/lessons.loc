<?php
    class NewsCon {
        private $view;
        function __construct(){
            $this->view = new View();
        }
        public function index(){
            $listnews=News::get_AllNews();
            if($listnews){
                $this->view->generate("header.tpl","footer.tpl","shownews.php",$listnews);
            }
        }
        public function shownewsdetail($idnews=null){
            $content = "Function not relize $idnews";
            $this->view->generate("header.tpl","footer.tpl",$content);
        }
        public function delnews($idnews=null){
            $content = "Не указан id новости.";
            if(!empty($idnews)){
                $content = "Новость \$idnews=$idnews удалена.";
            }
            $this->view->generate("header.tpl","footer.tpl",$content);
        }
        public function addnews(){
            if(isset($_POST)){
                $content = "Новость добавлена!";
                $this->view->generate("header.tpl","footer.tpl",$content);
            }
        }
    }


