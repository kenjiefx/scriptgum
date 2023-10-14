<?php 
    $dialog = [
        'namespace' => $snippet['namespace'],
        'content_path' => $snippet['content'] ?? null
    ];
?>

<dialog xblock="/Modal/Dialog/<?php echo $dialog['namespace']; ?>" class="width-24 border-style-none">
    <?php
        if ($dialog['content_path']!==null) {
            include $dialog['content_path'];
        }
    ?>
</dialog>