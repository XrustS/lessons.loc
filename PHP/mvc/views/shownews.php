    <section>
        <?php
        if(isset($data)):
            foreach($data as $item): ?>
                <div class="news">
                    <?php if(!empty($item->Pic)): ?>
                        <a href="http://lessons.loc/mvc/upload/bigimg/<?php echo $item->Pic;?>">
                            <img class="img" src="http://lessons.loc//mvc/upload/smallimg/<?php echo $item->Pic;?>">
                        </a>
                    <?php else: ?>
                        <div class="img"></div>
                    <?php endif; ?>
                    <a href=""><?php echo $item->title; ?></a>
                    <div class="textnews">
                        <p><?php echo $item->Text; ?></p>
                    </div>
                </div>
            <?php endforeach;
        else:
            echo "Новостей нет.";
        endif;
        ?>
    </section>
