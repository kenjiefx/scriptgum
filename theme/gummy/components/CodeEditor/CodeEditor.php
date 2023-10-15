<?php 
Kenjiefx\StrawberryScratch\Registry\ComponentsRegistry::register('PaneResizeButton');
Kenjiefx\StrawberryScratch\Registry\ComponentsRegistry::register('PreviewPane');
?>

<template xcomponent="@CodeEditor">
    <div xif="state=='active'" class="width-24">
        <div xblock="/CodeEditor/Header" class="width-24 padding-top-19 display-flex align-items-center">
            <?php include __dir__.'/Header/UserProfile/ProfileCard.php'; ?>
            <div class="padding-x-17 display-flex align-items-center flex-grow-1 flex-direction-row-reverse">
                <?php include __dir__.'/ToolsPane/Tools.php'; ?>
            </div>
        </div>
        <div xblock="/CodeEditor/Body" class="width-24">
            <div class="display-flex padding-x-14 padding-y-14 height-24 width-24">
                <div xblock="/CodeEditor/EditorPane" class="width-12">
                    <div id="code_editor_wrapper">
                        <div xblock="/CodeEditor/EditorPane/ResizeButton" class="cursor-pointer" xcomponent="@PaneResizeButton"></div>
                        <div id="code_editor" class="text-3"></div>
                    </div>
                </div>
                <div xblock="/CodeEditor/PreviewPane" class="width-12 height-24">
                    <section xcomponent="@PreviewPane" class="height-24"></section>
                </div>
            </div>
        </div>
    </div>
    
    <div xif="state=='loading'" class="width-24 height-21 display-flex align-items-center justify-content-center">
        <div id="page_loader"></div>
    </div>
    <div xif="state=='error'"></div>

    
</template>