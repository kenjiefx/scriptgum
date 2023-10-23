<template xcomponent="@RegisterForm">
    <div xif="state=='loading'"></div>
    <div xif="state=='active'">
        <form xblock="Register/Form" onsubmit="blockAutoSubmit(event)" class="width-24">
            <div xblock="/RegisterForm/Names">
                <div class="width-24 display-flex align-items-center">
                    <div class="width-12 padding-right-3">
                        <label class="color-label-gray margin-bottom-5 text-1" style="display:block;">First Name</label>
                        <?php snippet('/Form/Input/Text',[
                            'model' => 'firstName',
                            'placeholder' => 'John',
                            'block_name' => 'RegisterForm/FirstName',
                            'change' => 'validate.names()',
                            'fieldset_class'=> 'form-input-{{validate.status.names}}'
                        ]); ?>
                    </div>
                    <div class="width-12">
                        <label class="color-label-gray margin-bottom-5 text-1" style="display:block;">Last Name</label>
                        <?php snippet('/Form/Input/Text',[
                            'model' => 'lastName',
                            'placeholder' => 'Doe',
                            'block_name' => 'RegisterForm/LastName',
                            'change' => 'validate.names()',
                            'fieldset_class'=> 'form-input-{{validate.status.names}}'
                        ]); ?>
                    </div>
                </div>
                <div xif="validate.status.names=='error'">
                    <div class="margin-top-4 color-error text-1 font-weight-500">{{validate.error.names}}</div>
                </div>        
            </div>
            <div class="margin-top-13"></div>
            <div class="width-24">
                <label class="color-label-gray margin-bottom-5 text-1" style="display:block;">Username</label>
                <div xblock="/RegisterForm/Username">
                    <fieldset xenable="/RegisterForm/Username/Fieldset" class="form-input-{{validate.status.username}} display-flex align-items-center fieldset__input padding-x-7 background-color-extra-gray:disabled padding-y-9 text-4 font-weight-300 border-radius-extra-small-2">
                        <input xmodel="username" xchange="validate.username()" placeholder="johndoe1993" class="border-style-none width-24 background-color-transparent"/>
                        <div xblock="/RegisterForm/Username/Status">
                            <div xif="validate.status.username=='loading'">
                                <div class="btn-loadable is-button-loading small-width-3"></div>
                            </div>
                            <div xif="validate.status.username=='success'">
                                <?php snippet('Icon/SVG',[
                                    'path'=>'<path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />',
                                    'class'=>'small-width-4 color-success svg-fill-none',
                                    'icon_stroke_width'=>'1.5'
                                ]) ?>
                            </div>
                            <div xif="validate.status.username=='error'">
                                <?php snippet('Icon/SVG',[
                                    'path'=>'<path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />',
                                    'class'=>'small-width-4 color-error svg-fill-none',
                                    'icon_stroke_width'=>'1.5'
                                ]) ?>
                            </div>
                        </div>
                    </fieldset>
                    <div xif="validate.status.username=='error'">
                        <div class="margin-top-4 color-error text-1 font-weight-500">{{validate.error.username}}</div>
                    </div>
                </div>
            </div>

            


            <div class="margin-top-13"></div>
            <div class="width-24">
                <label class="color-label-gray margin-bottom-5 text-1" style="display:block;">Email</label>
                <div xblock="/RegisterForm/Email">
                    <fieldset xenable="/RegisterForm/Email/Fieldset" class="form-input-{{validate.status.email}} display-flex align-items-center fieldset__input padding-x-7 background-color-extra-gray:disabled padding-y-9 text-4 font-weight-300 border-radius-extra-small-2">
                        <input xmodel="email" xchange="validate.email()" placeholder="johndoe1993@example.com" class="border-style-none width-24 background-color-transparent"/>
                        <div xblock="/RegisterForm/Email/Status">
                            <div xif="validate.status.email=='loading'">
                                <div class="btn-loadable is-button-loading small-width-3"></div>
                            </div>
                            <div xif="validate.status.email=='success'">
                                <?php snippet('Icon/SVG',[
                                    'path'=>'<path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />',
                                    'class'=>'small-width-4 color-success svg-fill-none',
                                    'icon_stroke_width'=>'1.5'
                                ]) ?>
                            </div>
                            <div xif="validate.status.email=='error'">
                                <?php snippet('Icon/SVG',[
                                    'path'=>'<path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />',
                                    'class'=>'small-width-4 color-error svg-fill-none',
                                    'icon_stroke_width'=>'1.5'
                                ]) ?>
                            </div>
                        </div>
                    </fieldset>
                    <div xif="validate.status.email=='error'">
                        <div class="margin-top-4 color-error text-1 font-weight-500">{{validate.error.email}}</div>
                    </div>
                </div>
            </div>

            <div xif="isAutoRegister==false" class="width-24 margin-top-13">
                <div xblock="/RegisterForm/Password" class="width-24">
                    <label class="color-label-gray margin-bottom-5 text-1" style="display:block;">Password</label>
                    <?php snippet('/Form/Input/Text',[
                        'model' => 'password',
                        'type' => 'password',
                        'placeholder' => '••••••••••••••••••',
                        'block_name' => 'RegisterForm/Password',
                        'change' => 'validate.password()',
                        'fieldset_class'=> 'form-input-{{validate.status.password}}'
                    ]); ?>
                    <div class="margin-top-13"></div>
                    <label class="color-label-gray margin-bottom-5 text-1" style="display:block;">Confirm Password</label>
                    <?php snippet('/Form/Input/Text',[
                        'model' => 'confirmPassword',
                        'type' => 'password',
                        'placeholder' => '••••••••••••••••••',
                        'block_name' => 'RegisterForm/Password',
                        'change' => 'validate.password()',
                        'fieldset_class'=> 'form-input-{{validate.status.password}}'
                    ]); ?>
                    <div xif="validate.status.password=='error'">
                        <div class="margin-top-4 color-error text-1 font-weight-500">{{validate.error.password}}</div>
                    </div>
                </div>
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
                        'xclick'=> 'submit()',
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