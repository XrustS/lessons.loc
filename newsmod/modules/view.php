<?php
$errlog =  false;
if($errlog){
    error_reporting(E_ALL);
    ini_set("display_errors", 1);
}
require_once __DIR__.'/../functions/sql.php';
$sql = 'select * from news;';
$row = mysqlQwery($sql);
/**
 * Generating menu
 */
echo '<div class="nav">';
$url=$_SERVER['PHP_SELF'];
for($i=0; $i<=count($row);$i++){
    $o=$i+1;
   echo '<a href="'.$url.'?id='.$o.'&action=detail">'.$row[$i]['title'].'</a><a id="dell" href="'.$url.'?action=del&id='.$o.'">dell</a>';
};
echo '</div>';

$id=htmlspecialchars($_GET['id']);
if (isset($_GET])&&($_GET['action']==="detail")&&($id<=count($row)&&$id>0))
{
    ?>
    <div class="news">
        <h1><?php echo $row[$id-1]['title']; ?></h1>
        <p><?php echo $row[$id-1]['Text']; ?></p>
    </div>
<?php

}else{
foreach($row as $item){
    ?>
    <div class="news">
        <h1><?php echo $item['title']; ?></h1>
        <p><?php echo $item['Text']; ?></p>
    </div>
    <?php
    }
};
