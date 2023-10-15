<?php 
Kenjiefx\StrawberryScratch\Registry\ComponentsRegistry::register('PaneResizeButton');
?>

<template xcomponent="@PreviewPane">
    <div id="preview_pane_wrapper" class="height-24">
        <div xblock="/PreviewPane/ResizeButton" class="cursor-pointer" xcomponent="@PaneResizeButton"></div>
        <div id="preview_pane" class="height-24">
            <div class="display-flex align-items-center justify-content-center height-24">
                <div class="display-flex flex-direction-column align-items-center">
                    <div>
                        <img class="small-height-11" src="https://cdn.shopify.com/s/files/1/0560/7466/6159/files/scriptgum_logo_bw.png?v=1697314721" alt="">
                    </div>
                    <div class="margin-top-4">
                        <div class="color-label-gray">Click "Run" to preview your code</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>