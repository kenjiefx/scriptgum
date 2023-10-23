<?php 
// This template becomes part of the Router component
Kenjiefx\StrawberryScratch\Registry\ComponentsRegistry::register('RegisterForm');
?>

<div class="width-24 device-height-21 display-flex align-items-center">
    <div class="width-24 display-flex align-items-center align-items-center justify-content-center">
        <div class="max-width-9 width-24">
            <?php snippet('Heading/Title',['title'=>'Register','subtitle'=>'Create a new ScriptGum account.']); ?>
            <div class="margin-top-17"></div>
            <section xcomponent="@RegisterForm"></section>
        </div>
    </div>
</div>