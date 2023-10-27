<?php 
Kenjiefx\StrawberryScratch\Registry\ComponentsRegistry::register('Header');
Kenjiefx\StrawberryScratch\Registry\ComponentsRegistry::register('LoadBarAnimation');
?>

<template xcomponent="@Router">
    <div xif="state=='loading'" class="width-24 height-21 display-flex align-items-center justify-content-center">
        <div id="page_loader"></div>
    </div>
    <div xif="state=='active'">
        <section xcomponent="@Header"></section>
        <section xcomponent="@LoadBarAnimation"></section>
        <?php template_content(); ?>
    </div>
    <div xif="state=='error'"></div>
</template>