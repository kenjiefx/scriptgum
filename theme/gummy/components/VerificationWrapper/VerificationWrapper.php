<template xcomponent="@VerificationWrapper">
    <div xif="state=='loading'" class="width-24 height-21 display-flex align-items-center justify-content-center">
        <div id="page_loader"></div>
    </div>
    <div xif="state=='active'"></div>
    <div xif="state=='verification_ready'">
        <?php snippet('Heading/Title',['title'=>'Oops! We still need to verify your email']); ?>
        <div class="text-4 margin-top-11 line-height-19">
            We've sent verification email to your email address <strong>{{emailNeedsVerification}}</strong> to complete the registration of your account.
            If you haven't received any email, you can re-send the verification email below.
        </div>
        <div class="margin-top-15"></div>
        <div xblock="/EmailSentStatus">
            <div xif="status=='ready'">
                <?php snippet('Form/Button',[
                    'xclick'=> 'resendEmail()',
                    'text' => 'Resend Verification Email',
                    'class' => 'btn-loadable'
                ]); ?>
            </div>
            <div xif="status=='email_sent'" class="color-success text-2">
                Email Sent ✓
            </div>
        </div>
    </div>
    <div xif="state=='error'"></div>
</template>