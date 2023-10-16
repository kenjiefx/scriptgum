<?php 
$button = [
    'xclick' => $snippet['xclick'] ?? null,
    'type' => $snippet['type'] ?? 'primary',
    'text' => $snippet['text'],
    'class' => $snippet['class'] ?? '',
    'icon_stroke_width' => $snippet['icon_stroke_width'] ?? '0.5',
    'color_mode' => $snippet['color_mode'] ?? 'stroke_color',
    'icon_color' => $snippet['icon_color'] ?? 'primary',
    'icon'  => $snippet['icon'] ?? null
];
if ($button['type']==='primary') {
    if ($button['color_mode']==='stroke_color') {
        $icon_color = 'color-white svg-fill-none';
    } else {
        $icon_color = 'svg-fill-white';
    }
} else {
    if ($button['color_mode']==='stroke_color') {
        $icon_color = 'svg-fill-none color-'.$button['icon_color'];
    } else {
        $icon_color = 'svg-fill-'.$button['icon_color'];
    }
}
if ($button['type']==='primary') {
    $text_color = 'white';
} else {
    $text_color = 'elegant-black';
}


if ($button['type']==='primary') {
    $hover_style = 'background-color-elegant-black:hover';
} else {
    $hover_style = 'background-color-extra-gray:hover';
}

$class = 'background-color-'.$button['type'].' '.$button['class'].' color-'.$text_color.' '.$hover_style;
?>

<button class="text-3 cursor-pointer border-style-none padding-x-7 padding-y-5 border-radius-extra-small-5 display-flex align-items-center <?php echo $class; ?>" <?php if (null!==$button['xclick']) echo 'xclick="'.$button['xclick'].'"'; ?>>
    <?php 
    if ($button['icon']!==null) snippet('Icon/SVG',['path'=>$button['icon'],'class'=>'small-width-4 margin-right-8 '.$icon_color,'icon_stroke_width'=>$button['icon_stroke_width']])
    ?>
    <?php echo $button['text']; ?>
</button>