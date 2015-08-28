<?php


class Log {
    protected $flogname;
    protected $logdir;

    function __construct($logfile){
        $this->flogname = $logfile;
        $this->logdir = __DIR__."/../logs/";
        if(!is_dir($this->logdir)){ mkdir($this->logdir); }

    }
    function set_log($message){
        $fhandle = fopen($this->logdir.$this->flogname, "a+");
        $dtime = date("d-m-Y H:i:s",time());
        fwrite($fhandle,"$dtime - ".$message);
        fclose($fhandle);
    }

}