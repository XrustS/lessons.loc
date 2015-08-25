
    <?php foreach($listnews as $item): ?>
        <div class="news">
            <h1><?php echo $item->title; ?></h1>
            <p><?php echo $item->Text; ?></p>
        </div>
    <?php endforeach;?>


