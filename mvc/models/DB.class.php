<?php
// Класс отвечающий за работу с базой данных;
class DB {
    protected $host;
    protected $userdb;
    protected $passdb;
    protected $dbname;
    protected $_result = false;

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
           try{
               $result = mysql_query($sql);
               throw new Exception($sql);

           } catch(Exception $e){
               $log = new Log('DB'.date("d-m-Y",time()).'.log');
               $log->set_log("Ошибка выполнения запроса: ".$e->getMessage());
           };
             if($result === false){
                 $this->_result = false;
                 return $this;
             }
            $this->_result = $result;
            return $this;
        }
    }
    public function execute($sql){
        if($this->initDB()){
            try{
                $result = mysql_query($sql);
                throw new Exception($sql);
            } catch (Exception $e){
                $log = new Log('DB'.date("d-m-Y",time()).'.log');
                $log->set_log("Ошибка выполнения запроса: ".$e->getMessage());
            };

           if($result === false) {

               return false;
           }
           return true;
        }
    }
    function fetchArr(){
        if($this->_result !== false){
            $arrRes = [];
            try{
                while($row = mysql_fetch_array($this->_result)){
                    $arrRes[] = $row;
                }
                throw new Exception("_result");
            } catch (Exception $e){
                $log = new Log('DB'.date("d-m-Y",time()).'.log');
                $log->set_log("Ошибка вывода результата запроса fetchArray: ".$e->getMessage());
            };
            return $arrRes;
        } return false;
    }
    function fetchObj($class){
        if($this->_result !== false){
            $arrRes = [];
            try{

                while($row = mysql_fetch_object($this->_result,$class)){
                    $arrRes[] = $row;
                }

            } catch (Exception $e){
                $log = new Log('DB'.date("d-m-Y",time()).'.log');
                $log->set_log("Ошибка вывода результата запроса fetchObj class - ".$class.": ".$e->getMessage());
            };
            return $arrRes;
        } return false;
    }
    function fetchAssoc(){
        if($this->_result !== false){
            $arrRes = [];
            try{
                while($row = mysql_fetch_assoc($this->_result)){
                            $arrRes[] = $row;
                        }
                throw new Exception('_result');
            } catch (Exception $e){
                $log = new Log('DB'.date("d-m-Y",time()).'.log');
                $log->set_log("Ошибка вывода результата запроса fetchAssoc: ".$e->getMessage());
            };
            return $arrRes;
        } return false;
    }
    function countRow(){
        if($this->_result !== false){
            try{
                $count = count(mysql_fetch_array($this->_result));
                throw new Exception('_result');
            } catch (Exception $e){
                $log = new Log('DB'.date("d-m-Y",time()).'.log');
                $log->set_log("Ошибка подсчета количества строк в выборке: ".$e->getMessage());
            }
            return $count;
        } return false;
    }


}