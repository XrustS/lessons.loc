<?php

/***
 * Подключаем основные модели и запускаем контроллер
 */
function __autoload($class){
    include BASE_DIR."/models/$class.class.php";
}
require_once BASE_DIR."/controllers/Route.class.php";
Route::start();

