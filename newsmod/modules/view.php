<?php

error_reporting(E_ALL);
ini_set("display_errors", 1);

include_once __DIR__.'/../functions/sql.php';
$sql = 'select * from news;';
$row = mysql_fetchAll($sql);
$id=htmlspecialchars($_GET['id']);
if ($id<=count($row)&&$id>0)
{?>
    <div class="news">
        <h1><?php echo $row[$id-1]['title']; ?></h1>
        <p><?php echo $row[$id-1]['Text']; ?></p>
    </div>
<?php

} else{
foreach($row as $item){
    ?>
    <div class="news">
        <h1><?php echo $item['title']; ?></h1>
        <p><?php echo $item['Text']; ?></p>
    </div>
    <?php
}};