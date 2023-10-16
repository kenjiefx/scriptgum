<?php 
// This template becomes part of the Router component
Kenjiefx\StrawberryScratch\Registry\ComponentsRegistry::register('LoginForm');
?>

<div class="width-24 device-height-21 display-flex align-items-center">
    <div class="width-24 display-flex align-items-center align-items-center justify-content-center">
        <div class="max-width-9 width-24">
            <?php snippet('Heading/Title',['title'=>'Hello, there!','subtitle'=>'To continue, please login to your account.']); ?>
            <div class="margin-top-17"></div>
            <section xcomponent="@LoginForm"></section>
        </div>
    </div>
</div>