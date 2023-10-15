<template xcomponent="@PaneResizeButton">
    <div xclick="resizePane()" class="width-24">
        <div xif="state=='expandable'">
            <?php snippet('Icon/SVG',[
                'class' => 'small-width-5',
                'path'=> '<path stroke-linecap="round" stroke-linejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />'
            ]); ?>
        </div>
        <div xif="state=='closable'">
            <?php snippet('Icon/SVG',[
                'class' => 'small-width-5',
                'path'=> '<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />'
            ]); ?>
        </div>
    </div>
</template>