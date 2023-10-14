<?php 
$button = [
    'xclick' => $snippet['xclick'] ?? null,
    'type' => $snippet['type'] ?? 'primary',
    'text' => $snippet['text'],
    'class' => ''
];
$class = 'background-color-'.$button['type'].' '.$button['class'];
?>

<button class="text-3 cursor-pointer border-style-none padding-x-7 padding-y-5 color-white border-radius-extra-small-5 <?php echo $class; ?>" <?php if (null!==$button['xclick']) echo 'xclick="'.$button['xclick'].'"'; ?>>
    <?php echo $button['text']; ?>
</button>