<?php

class View {

    function generate($temlate_file, $content, $data){

        if(is_array($data)){
            extract($data);
        }
        include BASE_DIR."/views/".$temlate_file;

    }

}