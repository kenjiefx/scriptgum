<template xcomponent="@RegisterForm">
    <div xif="state=='loading'"></div>
    <div xif="state=='active'">
        <form xblock="Register/Form" onsubmit="blockAutoSubmit(event)" class="width-24">
            <div class="width-24 display-flex align-items-center">
                <div class="width-12 padding-right-3">
                    <label class="color-label-gray margin-bottom-5 text-1" style="display:block;">First Name</label>
                    <?php snippet('/Form/Input/Text',[
                        'model' => 'firstName',
                        'placeholder' => 'John'
                    ]); ?>
                </div>
                <div class="width-12">
                    <label class="color-label-gray margin-bottom-5 text-1" style="display:block;">Last Name</label>
                    <?php snippet('/Form/Input/Text',[
                        'model' => 'lastName',
                        'placeholder' => 'Doe'
                    ]); ?>
                </div>
            </div>
            <div class="margin-top-13"></div>
            <div class="width-24">
                <label class="color-label-gray margin-bottom-5 text-1" style="display:block;">Username</label>
                <?php snippet('/Form/Input/Text',[
                    'model' => 'username',
                    'placeholder' => 'johndoe1993'
                ]); ?>
            </div>
            <div class="margin-top-13"></div>
            <div class="width-24">
                <label class="color-label-gray margin-bottom-5 text-1" style="display:block;">Email Address</label>
                <?php snippet('/Form/Input/Text',[
                    'model' => 'email',
                    'disabled_attr_value' => '{{isAutoRegister}}',
                    'placeholder' => 'johndoe1993@example.com'
                ]); ?>
            </div>
            <div class="margin-top-19"></div>
            <div class="width-24 display-flex align-items-center">
                <div class="margin-right-7">
                    <input type="checkbox" xmodel="hasAcceptedTermsAndConditions">
                </div>
                <div class="text-1 color-bored-gray">
                    By creating a new account, I accept ScriptGum's Terms and Conditions.
                </div>
            </div>

            <div class="margin-top-19"></div>
            <div class="display-flex flex-direction-row-reverse align-items-center">
                <div>
                    <?php snippet('Form/Button',[
                        'text' => 'Create Account',
                        'class' => 'btn-loadable'
                    ]); ?>
                </div>
                <div class="text-1 font-weight-300 margin-right-6">
                    Already have an account? 
                    <a href="/login">
                        Login Here
                    </a>
                </div>
            </div>
        </form>
    </div>
    <div xif="state=='error'"></div>
</template>