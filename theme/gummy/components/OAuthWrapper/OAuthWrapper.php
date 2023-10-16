<?php 
Kenjiefx\StrawberryScratch\Registry\ComponentsRegistry::register('LoginForm');
?>

<template xcomponent="@OAuthWrapper">
    <div xif="state=='loading'" class="position-absolute width-24">
        <div id="oauth_overlay_wrapper">
            <div id="oauth_overlay"></div>
        </div>
        <div class="width-24 device-height-21 display-flex align-items-center ">
            <div class="width-24 display-flex align-items-center align-items-center justify-content-center">
                <div class="max-width-9 width-24">
                    <?php snippet('Heading/Title',['title'=>'Hello, there!','subtitle'=>'To continue, please login to your account.']); ?>
                    <div class="margin-top-17"></div>
                    <section xcomponent="@LoginForm"></section>
                </div>
            </div>
        </div>
    </div>
    <div xif="state=='active'"></div>
    <div xif="state=='error'">
        <div class="width-24 device-height-21 display-flex align-items-center ">
            <div class="width-24 display-flex align-items-center align-items-center justify-content-center">
                <div class="max-width-9 width-24">
                    <?php snippet('Heading/Title',['title'=>'Sorry, we are unable to sign you in.']); ?>
                    <div class="margin-top-6">
                        <div class="margin-top-1 color-bored-gray font-weight-300 text-4 line-height-18">
                            We encountered error while trying to log you in. Please try again later. If the issue persists, please let us know.
                        </div>
                    </div>
                    <div class="margin-top-17"></div>
                    
                </div>
            </div>
        </div>
    </div>
</template>