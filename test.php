<?php
/*
ob_start();
echo 'Hello askdev';
$myStr = ob_get_contents();
ob_end_clean();
 echo $myStr;
*/
//var_dump(curl_version());
// test work curl
$uname="admin";
$upass="ld0tBpkjhwf33";
$url = 'https://192.168.2.1:9900/index.php';// http://testphp.ru/auto.php/;
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
//curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, "usernamefld=$uname&passwordfld=$upass");
curl_setopt($ch, CURLOPT_HEADER, 1);
curl_setopt($ch, CURLOPT_NOBODY, 0);

$result = curl_exec($ch);
curl_close($ch);
if(empty($result)){
    $result = "Ничего не получилось :(((";
};
echo "<pre>".$result."</pre>";