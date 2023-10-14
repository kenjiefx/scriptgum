<?php 
Kenjiefx\StrawberryScratch\Registry\ComponentsRegistry::register('Header');
?>

<template xcomponent="@Router">
    <div xif="state=='loading'"></div>
    <div xif="state=='active'">
        <section xcomponent="@Header"></section>
        <?php template_content(); ?>
    </div>
    <div xif="state=='error'"></div>
</template>