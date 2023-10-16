<template xcomponent="@LoginForm">
    <form xblock="Login/Form" onsubmit="blockAutoSubmit(event)" class="width-24">
        <label class="color-label-gray margin-bottom-5 text-1" style="display:block;">Email Address</label>
        <?php snippet('/Form/Input/Text',[
            'placeholder' => 'johndoe@example.com'
        ]); ?>
        <div class="margin-top-13"></div>
        <label class="color-label-gray margin-bottom-5 text-1" style="display:block;">Password</label>
        <?php snippet('/Form/Input/Text',[
            'placeholder' => '•••••••••••••••••',
            'type' => 'password'
        ]); ?>
        <div class="margin-top-19"></div>
        <div class="display-flex flex-direction-row-reverse align-items-center">
            <div>
                <?php snippet('Form/Button',[
                    'text' => 'Login',
                    'class' => 'btn-loadable'
                ]); ?>
            </div>
            <div class="text-1 font-weight-300 margin-right-6">
                Don't have an account yet? 
                <a href="/register.html">
                    Register Here
                </a>
            </div>
        </div>
    </form>
    <div class="margin-top-17"></div>
    <div class="...Separator.item_separator--bottom"></div>
    <div class="margin-top-24"></div>
    <div class="margin-top-24"></div>
    <div class="margin-top-24"></div>
    <div class="width-24 display-flex justify-content-center">
        <div xclick="signinWith.google.viaNative()" class="display-flex align-items-center width-static-max-content border-style-solid background-color-extra-gray:hover border-width-1 padding-x-11 padding-y-7 border-color-extra-gray border-radius-extra-small-5 cursor-pointer">
            <img class="extra-small-height-22 margin-right-9" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/1024px-Google_%22G%22_Logo.svg.png" />
            <div>Sign in with Google</div>
        </div>
    </div>
    <div xif="state=='loading'"></div>
    <div xif="state=='active'">
        
    </div>
    <div xif="state=='error'"></div>
</template>