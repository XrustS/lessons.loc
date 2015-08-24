<?php
// Класс отвечающий за работу с базой данных;
class DataBase {
    protected $host;
    protected $userdb;
    protected $passdb;
    protected $dbname;

    public function __construct($host, $userdb, $passdb, $dbname){
        $this->host = $host;
        $this->userdb = $userdb;
        $this->passdb = $passdb;
        $this->dbname = $dbname;
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
            while($row=mysql_fetch_assoc($result)){
                $arr[] = $row;
            }
            return $arr;
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