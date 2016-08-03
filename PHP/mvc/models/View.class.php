<?php

class View {

    function generate($tpl_header_file,$tpl_footer_file, $tpl_content=null, $data=null){

        if(is_array($data)){
            //extract($data);
            //echo "Yes \$data is array";
        }
        include BASE_DIR."/views/".$tpl_header_file;
        if (is_file(BASE_DIR."/views/".$tpl_content)) include BASE_DIR."/views/".$tpl_content;
        elseif (!empty($tpl_content)) echo $tpl_content;
        include BASE_DIR."/views/".$tpl_footer_file;

    }

}