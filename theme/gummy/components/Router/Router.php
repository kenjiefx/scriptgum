<?php 
Kenjiefx\StrawberryScratch\Registry\ComponentsRegistry::register('Header');
Kenjiefx\StrawberryScratch\Registry\ComponentsRegistry::register('LoadBarAnimation');
?>

<template xcomponent="@Router">
    <div xif="state=='loading'"></div>
    <div xif="state=='active'">
        <section xcomponent="@Header"></section>
        <section xcomponent="@LoadBarAnimation"></section>
        <?php template_content(); ?>
    </div>
    <div xif="state=='error'"></div>
</template>