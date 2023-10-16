<div class="width-24 padding-x-14 max-width-11">
    <div class="background-color-white padding-top-24 padding-bottom-24">
        <div class="padding-x-24 display-flex align-items-center">
            <div class="margin-right-11">
                <?php snippet('Icon/SVG',[
                    'class' => 'small-width-4 color-primary svg-fill-none',
                    'icon_stroke_width' => '1.5',
                    'path' => '<path stroke-linecap="round" stroke-linejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />'
                ]); ?>
            </div>
            <?php snippet('Heading/CardTitle',['title'=>'Share this gum']); ?>
        </div>
        <div class="padding-x-24 margin-top-13">
            <div class="text-2">Generate a link and share your work everywhere!</div>
            <div xblock="/Modal/Dialog/Share/Link" class="margin-top-19">
                <?php snippet('/Form/Input/Text',[
                    'placeholder' => '{{states.modals.share}}',
                    'is_disabled' => true
                ]); ?>
                <div class="margin-top-15 display-flex flex-direction-row-reverse">
                    <div class="margin-left-5">
                        <div xif="states.modals.share==''">
                            <?php snippet('Form/Button',[
                                'xclick' => 'tools.share.generateLink()',
                                'text' => 'Generate Link',
                                'class' => 'btn-loadable'
                            ]); ?>
                        </div>
                        <div xif="states.modals.share!==''">
                            <?php snippet('Form/Button',[
                                'xclick' => 'tools.share.copyLink()',
                                'text' => 'Copy Link'
                            ]); ?>
                        </div>
                    </div>
                    <?php snippet('Form/Button',[
                        'xclick' => 'tools.share.close()',
                        'type' => 'transparent',
                        'text' => 'Close',
                    ]); ?>
                </div>
            </div>
        </div>
        
    </div>
</div>