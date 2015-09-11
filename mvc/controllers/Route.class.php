<?php
/**
 * Created by PhpStorm.
 * User: aek
 * Date: 09.09.2015
 * Time: 13:02
 */

class Route {
    static function start(){
        $routurl= explode('/', $_SERVER['REQUEST_URI']);
        $cont_name = null;
        $action = 'index';

        // Разбор пришедшей url
        var_dump($routurl);

        if(!empty($routurl[1])){
            $cont_name = trim($routurl[1]);
            $cont_path = BASE_DIR."/controllers/".$cont_name.".php";
            if(is_file($cont_path)){
                include $cont_path;
                $controller = new $cont_name;

                $action_name = trim($routurl[2]);
                if(!empty($action_name)){
                    $action = $action_name;
                }
                if(method_exists($controller,$action)){
                    $controller->$action();

                }
            }
        }else self::err404();
    }
    static function err404(){
        $host = 'http://'.$_SERVER['HTTP_HOST'].'/';
        header('HTTP/1.1 404 Not Found');
        header("Status: 404 Not Found");
        header('Location:'.$host.'404');
    }

}