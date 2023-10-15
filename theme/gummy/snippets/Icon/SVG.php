<?php 
    $icon_stroke_width = $snippet['icon_stroke_width'] ?? '0.5';
?>

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-width="<?php echo $icon_stroke_width; ?>" stroke="currentColor" class="<?php echo $snippet['class']; ?>">
    <?php echo $snippet['path']; ?>"
</svg>