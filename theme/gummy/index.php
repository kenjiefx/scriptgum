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
        <script type="text/javascript" src="https://cdn.jsdelivr.net/gh/kenjiefx/strawberry-js/dist/strawberry.0.9.5.min.js"></script>
        <script type="module">
            // Import the functions you need from the SDKs you need
            import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
            import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-analytics.js";
            import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword  } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";
            // TODO: Add SDKs for Firebase products that you want to use
            // https://firebase.google.com/docs/web/setup#available-libraries

            const googleAuthProvider = new GoogleAuthProvider();
            googleAuthProvider.addScope('https://www.googleapis.com/auth/contacts.readonly');

            // Your web app's Firebase configuration
            // For Firebase JS SDK v7.20.0 and later, measurementId is optional
            const firebaseConfig = {
                apiKey: "AIzaSyDjrT3tdacUfrezcKH3D2lCq41-qvvc5Ro",
                authDomain: "scriptgum-b15d5.firebaseapp.com",
                projectId: "scriptgum-b15d5",
                storageBucket: "scriptgum-b15d5.appspot.com",
                messagingSenderId: "346375746215",
                appId: "1:346375746215:web:eb0d3e3a5934c2a43c6182",
                measurementId: "G-QS0SRXS8XS"
            };

            // Initialize Firebase
            const app = initializeApp(firebaseConfig);
            // const analytics = getAnalytics(app);
            // const auth = getAuth(app);  
            window.FIREBASE = {
                analytics: getAnalytics(app),
                auth: getAuth(app),
                signInWith: {
                    emailAndPassword: signInWithEmailAndPassword,
                    popup: signInWithPopup
                },
                imports: {
                    GoogleAuthProvider: GoogleAuthProvider
                },
                providers: {
                    google: googleAuthProvider
                },
                registerWith: {
                    emailAndPassword: createUserWithEmailAndPassword
                }
            }
            
        </script> 
        <script>
            window['__METAPAGE'] = {
                user: {
                    username: 'USERNAME_METAPAGE_PLACEHOLDER'
                },
                page: {
                    type: 'PAGE_METAPAGE_PLACEHOLDER'
                }
            }
        </script>
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