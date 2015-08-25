<?php
// Класс отвечающий за работу с базой данных;
class DataBase {
    protected $host;
    protected $userdb;
    protected $passdb;
    protected $dbname;

    public function __construct(){
        $db = array();
        require_once __DIR__."/../init/db.init.php";
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
            return $result;
        }
    }
    public function execute($sql){
        if($this->initDB()){
           $result = mysql_query($sql);
           if($result === false) return false;
           return true;
        }
    }
}