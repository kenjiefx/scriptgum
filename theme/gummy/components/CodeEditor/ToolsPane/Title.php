<div class="display-flex align-items-center">
    <div class="padding-left-9 padding-y-6">/</div>
    <div class="script-title">
        <?php snippet('/Form/Input/Text',[
            'model' => 'content.title',
            'change' => 'tools.save()',
            'placeholder' => 'Add your script title here'
        ]); ?>
    </div>
</div>