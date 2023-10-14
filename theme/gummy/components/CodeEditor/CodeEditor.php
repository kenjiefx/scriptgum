<template xcomponent="@CodeEditor">
    <div xblock="/CodeEditor/Header">
        Hi, this is the code editor!!
        <button xclick="tools.run()">Run Code</button>
        <button xclick="tools.fullScreen.disable()">Exit Full Screen</button>
    </div>
    <div xblock="/CodeEditor/Body">
        <div class="display-flex padding-x-14 padding-y-14 height-24">
            <div xblock="/CodeEditor/EditorPane" class="width-12">
                <div id="code_editor_wrapper">
                    <div xclick="tools.fullScreen.editorPane()" xblock="/CodeEditor/EditorPane/ResizeButton" class="cursor-pointer">
                        <div xif="states.resizeButton('expand')">
                            <?php snippet('Icon/SVG',[
                                'class' => 'small-width-5',
                                'path'=> '<path stroke-linecap="round" stroke-linejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />'
                            ]); ?>
                        </div>
                        <div xif="states.resizeButton('close')">
                            <?php snippet('Icon/SVG',[
                                'class' => 'small-width-5',
                                'path'=> '<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />'
                            ]); ?>
                        </div>

                    </div>
                    <div id="code_editor" class="text-3"></div>
                </div>
            </div>
            <div xblock="/CodeEditor/PreviewPane" class="width-12 height-24">
                <section xcomponent="@PreviewPane" class="height-24"></section>
            </div>
        </div>
    </div>
    
    <div xif="state=='loading'"></div>
    <div xif="state=='active'"></div>
    <div xif="state=='error'"></div>

    
</template>