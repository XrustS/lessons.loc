<?php
// Класс отвечающий за работу с базой данных;
class DB {
    protected $host;
    protected $userdb;
    protected $passdb;
    protected $dbname;
    protected $_result;

    public function __construct(){
        $db = [];
        include  __DIR__."/../init/db.init.php";
        $this->host = $db['hostdb'];
        $this->userdb = $db['userdb'];
        $this->passdb = $db['passdb'];
        $this->dbname = $db['dbname'];
    }
    protected function initDB(){
       if(mysql_connect($this->host,$this->userdb,$this->passdb)) {
           if(mysql_select_db($this->dbname)) return true;
       }
        return false;
    }
    public function query($sql){
        if($this->initDB()){
           $result = mysql_query($sql);
           if($result === false) return false;
            $this->_result = $result;
            return $this;

        }
    }
    public function execute($sql){
        if($this->initDB()){
           $result = mysql_query($sql);
           if($result === false) return false;
           return true;
        }
    }
    function fetchArr(){
        if(!empty($this->_result)){
            $arrRes = [];
           while($row = mysql_fetch_array($this->_result)){
               $arrRes[] = $row;
           } return $arrRes;
        } return false;
    }
    function fetchObj($class){
        if(!empty($this->_result)){
            $arrRes = [];
            while($row = mysql_fetch_object($this->_result,$class)){
                $arrRes[] = $row;
            } return $arrRes;
        } return false;
    }
    function fetchAssoc(){
        if(!empty($this->_result)){
            $arrRes = [];
            while($row = mysql_fetch_assoc($this->_result)){
                $arrRes[] = $row;
            } return $arrRes;
        } return false;
    }

}