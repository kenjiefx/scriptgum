<template xcomponent="@ConfirmEmailWrapper">
    <div xif="state=='loading'" class="width-24 height-21 display-flex align-items-center justify-content-center">
        <div id="page_loader"></div>
    </div>
    <div xif="state=='active'">
        <?php snippet('Heading/Title',['title'=>'Hooray! Thank you for confirming']); ?>
        <div class="text-4 margin-top-11 line-height-19">
            Welcome aboard! 🚀 We've successfully confirmed your email. 
            Get ready for exclusive updates, special offers, and more exciting surprises coming your way. 🎁
        </div>
        <div class="margin-top-15"></div>
        <?php snippet('Form/Button',[
            'xclick'=> 'goToProfile()',
            'text' => 'Go To My Homepage',
            'class' => 'btn-loadable'
        ]); ?>
    </div>
    <div xif="state=='error'"></div>
</template>