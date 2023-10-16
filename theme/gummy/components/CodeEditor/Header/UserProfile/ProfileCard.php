<div class="display-flex align-items-center">
    <div xif="user.type=='public'" class="medium-square-2 border-radius-extra-large-1 background-color-extra-gray padding-x-3 padding-y display-flex align-items-center justify-content-center">
        <div class="width-18 height-18" style="background:url({{user.profilePhoto}});background-size:cover;background-position:center;"></div>
    </div>
    <div xif="user.type=='private'" class="medium-square-2 border-radius-extra-large-1 background-color-extra-gray" style="background-color: #d6d6d6!important;background:url({{user.profilePhoto}});background-size:cover;background-position:center;"></div>
    <div class="margin-left-7 display-flex align-items-center">
        <div class="text-2 font-weight-600">{{user.firstName}} {{user.lastName}}</div>
        <div class="text-1 font-weight-300 margin-left-6">@{{user.username}}</div>
    </div>
</div>