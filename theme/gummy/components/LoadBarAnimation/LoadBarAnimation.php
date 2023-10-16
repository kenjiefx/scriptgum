<template xcomponent="@LoadBarAnimation">
    <div xif="state=='loading'"></div>
    <div xif="state=='active'">
        <div class="load-bar">
            <div class="load-bar-bar"></div>
            <div class="load-bar-bar"></div>
            <div class="load-bar-bar"></div>
        </div>
    </div>
    
    <div xif="state=='error'"></div>
</template>