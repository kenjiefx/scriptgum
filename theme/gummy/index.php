<html>
    <head>
        <title><?php page_title(); ?></title>
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Fira+Code&family=Inter:wght@300;400;500;600;800&display=swap" rel="stylesheet">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.4/jquery.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.29.4/moment.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/ace-builds@1.30.0/src-min-noconflict/ace.min.js"></script>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/ace-builds@1.30.0/css/ace.min.css">
        <script type="text/javascript" src="https://cdn.jsdelivr.net/gh/kenjiefx/strawberry-js/dist/strawberry.0.9.4.min.js"></script>
        <script type="text/javascript">const blockAutoSubmit=e=>e.preventDefault();</script>
        <?php template_assets(); ?>
    </head>
    <body class="width-24">
        <app xstrawberry="app" class="width-24"></app>
        <template xstrawberry="app">
            <section xcomponent="@Router" class="width-24"></section>
        </template>
        <?php component('Router'); ?>
        <?php Kenjiefx\StrawberryScratch\Registry\ComponentsRegistry::export(); ?>
    </body>
</html>