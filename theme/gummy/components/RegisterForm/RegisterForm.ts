import { AppInstance, PatchHelper, ScopeObject, StrawberryElement, app } from "../../strawberry/app"
import { StateManagerInterface } from "../../strawberry/factories/StateManager"
import { AjaxSvcHandler } from "../../strawberry/services/AjaxSvcHandler"
import { ServiceDomains } from "../../strawberry/services/ServiceDomains"
import { UserCreateResponse, UserRegistryService } from "../../strawberry/services/UserRegistryService"

/** States of the component */
export type RegisterFormState = 'loading' | 'active' | 'error'

type FormItemState = 'loading' | 'default' | 'error' | 'success'

/** Component Object */
type ComponentScope = {
    state: RegisterFormState
    firstName: string 
    lastName: string
    email: string
    password: string
    providerToken: string
    confirmPassword: string
    username: string
    type: 'autoregister' | 'new'
    isAutoRegister: boolean
    hasAcceptedTermsAndConditions: boolean
    validate:{
        username:()=>void,
        names:(enforce?:boolean)=>void,
        email:()=>void,
        password:(enforce?:boolean)=>void
        status: {
            username: FormItemState,
            names: FormItemState,
            email: FormItemState,
            password: FormItemState
        },
        error: {
            username: string,
            names: string,
            email: string,
            password: string
        }
    },
    submit:(button:StrawberryElement<HTMLButtonElement>)=>void
}

/** Exportables */
export interface RegisterForm {
    render:()=>Promise<void>
}

/** Component declarations */
app.component<RegisterForm>('RegisterForm',(
    $scope: ScopeObject<ComponentScope>,
    $patch: PatchHelper,
    StateManager: StateManagerInterface<RegisterFormState>,
    $app: AppInstance,
    $block:(name:string,callback:(element:StrawberryElement<Element>)=>void)=>void,
    $disable:(name:string)=>void,
    $enable:(name:string)=>void,
    AjaxSvcHandler: AjaxSvcHandler,
    UserRegistryService: UserRegistryService,
    ServiceDomains: ServiceDomains
)=>{
    const existsUrl = ServiceDomains.get().functions+'/users/'+ServiceDomains.get().tenant+'/exist'
    StateManager.setScope($scope).setPatcher($patch).register('active').register('error').register('loading')
    const checkpoints = {
        isValidUsername: false
    }
    const handleCreateUserResponse=(createUserResponse:UserCreateResponse)=>{
        if (createUserResponse.next==='account_page') {
            location.href = '/'+createUserResponse.user.username+'/create'
            return 
        }
        if (createUserResponse.next==='email_verification_page') {
            location.href = '/checkpoint?id='+createUserResponse.user.id
            return
        }
    }
    $scope.validate = {
        username:()=>{
            const regex = /^[a-zA-Z0-9]+$/
            if ($scope.username===undefined||$scope.username===null) {
                $scope.validate.status.username = 'error'
                $scope.validate.error.username = 'Username must not be empty'
                $patch('/RegisterForm/Username')
                return
            }
            if ($scope.username.trim().length<5||$scope.username.trim().length>18) {
                $scope.validate.status.username = 'error'
                $scope.validate.error.username = 'Username must be 5 to 18 characters'
                $patch('/RegisterForm/Username')
                return
            }
            if (!regex.test($scope.username.trim())) {
                $scope.validate.status.username = 'error'
                $scope.validate.error.username = 'Username must not contain invalid characters'
                $patch('/RegisterForm/Username')
                return
            }
            $scope.validate.status.username = 'loading'
            $patch('/RegisterForm/Username')
            $disable('/RegisterForm/Username/Fieldset')
            AjaxSvcHandler.get({url:existsUrl+'?type=username&value='+$scope.username.trim()})
            .then((response:{doesExist:boolean})=>{
                if (!response.doesExist) {
                    $scope.validate.status.username = 'success'
                    $scope.validate.error.username = ''
                } else {
                    $scope.validate.status.username = 'error'
                    $scope.validate.error.username = 'Username already exists'
                }
                $patch('/RegisterForm/Username')
                $enable('/RegisterForm/Username/Fieldset')
            })
        },
        names:(enforce?)=>{
            const enforceValidation = (typeof enforce==='boolean') ? enforce : false
            const regex = /^[A-Za-z\s\-']+$/i
            if ($scope.firstName!==null&&$scope.lastName!==null) {
                if ($scope.firstName.trim().length<2||$scope.lastName.trim().length<2) {
                    $scope.validate.status.names = 'error'
                    $scope.validate.error.names = 'Names must be 2 or more characters'
                    $patch('/RegisterForm/Names')
                    return
                }
                if (regex.test($scope.firstName)&&regex.test($scope.lastName)) {
                    $scope.validate.status.names = 'success'
                    $scope.validate.error.names = ''
                } else {
                    $scope.validate.status.names = 'error'
                    $scope.validate.error.names = 'Names must contain only valid characters'
                }
                $patch('/RegisterForm/Names')
            } else {
                if (enforceValidation) {
                    $scope.validate.status.names = 'error'
                    $scope.validate.error.names = 'Name fields must not be empty'
                    $patch('/RegisterForm/Names')
                }
            }
        },
        password:(enforce?)=>{
            if ($scope.isAutoRegister) return
            const enforceValidation = (typeof enforce==='boolean') ? enforce : false
            if ($scope.password!==null&&$scope.confirmPassword!==null) {
                if ($scope.password.trim().length<12||$scope.password.trim().length>64) {
                    $scope.validate.status.password = 'error'
                    $scope.validate.error.password = 'Password must be more than 12 characters'
                    $patch('/RegisterForm/Password')
                    return
                }
                if ($scope.password!==$scope.confirmPassword) {
                    $scope.validate.status.password = 'error'
                    $scope.validate.error.password = 'Password does not match'
                    $patch('/RegisterForm/Password')
                    return
                }
                $scope.validate.status.password = 'success'
                $scope.validate.error.password = ''
                $patch('/RegisterForm/Password')
            } else {
                if (enforceValidation) {
                    $scope.validate.status.password = 'error'
                    $scope.validate.error.password = 'Password fields must not be empty'
                    $patch('/RegisterForm/Password')
                }
            }
        },
        email:()=>{
            if ($scope.isAutoRegister) return
            const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
            if ($scope.email===undefined||$scope.email===null) {
                $scope.validate.status.email = 'error'
                $scope.validate.error.email = 'Email must not be empty'
                $patch('/RegisterForm/Email')
                return
            }
            if ($scope.email.trim().length<8||$scope.email.trim().length>64) {
                $scope.validate.status.email = 'error'
                $scope.validate.error.email = 'Email must be more than 8 characters'
                $patch('/RegisterForm/Email')
                return
            }
            if (!regex.test($scope.email.trim())) {
                $scope.validate.status.email = 'error'
                $scope.validate.error.email = 'Email must be valid'
                $patch('/RegisterForm/Email')
                return
            }
            $scope.validate.status.email = 'loading'
            $patch('/RegisterForm/Email')
            $disable('/RegisterForm/Email/Fieldset')
            AjaxSvcHandler.get({url:existsUrl+'?type=email&value='+$scope.email.trim()})
            .then((response:{doesExist:boolean})=>{
                if (!response.doesExist) {
                    $scope.validate.status.email = 'success'
                    $scope.validate.error.email = ''
                } else {
                    $scope.validate.status.email = 'error'
                    $scope.validate.error.email = 'Email already exists'
                }
                $patch('/RegisterForm/Email')
                $enable('/RegisterForm/Email/Fieldset')
            })
        },
        status: {
            username: 'default',
            names: 'default',
            email: 'default',
            password: 'default'
        },
        error: {
            username: '',
            names: '',
            email: '',
            password: ''
        }
    }
    $scope.submit=(button)=>{
        if ($scope.validate.status.names === 'success' && 
            $scope.validate.status.email === 'success' &&
            $scope.validate.status.username === 'success' &&
            $scope.validate.status.password === 'success' &&
            $scope.hasAcceptedTermsAndConditions
        ) {
            button.addClass('is-button-loading')
            if ($scope.isAutoRegister) {
                UserRegistryService.createUser({
                    first_name: $scope.firstName.trim(),
                    last_name: $scope.lastName.trim(),
                    token: $scope.providerToken,
                    provider: 'oauth',
                    username: $scope.username
                })
                .then(response=>handleCreateUserResponse(response))
                .catch((error)=>{
                    console.log(error)
                })  
                return
            }
            // Sign up with Firebase
            window['FIREBASE'].registerWith.emailAndPassword(window['FIREBASE'].auth,$scope.email,$scope.password)
            .then((userCredential)=>{
                console.log(userCredential)
            }).catch((error)=>{
                console.log(error)
            })
        } else {
            if ($scope.validate.status.names!=='success') $scope.validate.names(true)
            if ($scope.validate.status.email!=='success')  $scope.validate.email()
            if ($scope.validate.status.username!=='success') $scope.validate.username()
            if ($scope.validate.status.password!=='success') $scope.validate.password()
        }
    }
    $app.onReady(()=>{
        const url = new URL(location.href)
        const queryParams = new URLSearchParams(url.search)
        const token = queryParams.get('token')
        $scope.firstName = queryParams.get('firstname')
        $scope.lastName  = queryParams.get('lastname')
        $scope.email     = queryParams.get('email')
        $scope.password  = null
        $scope.confirmPassword = null
        if (token!==null) {
            $scope.type = 'autoregister'
            $scope.validate.status.email = 'success'
            $scope.validate.status.password = 'success'
            $scope.providerToken = token
        }
        $scope.hasAcceptedTermsAndConditions = false
        $scope.isAutoRegister = ($scope.type==='autoregister')
        StateManager.switch('active')
        setTimeout(()=>{
            $scope.validate.names()
            if ($scope.isAutoRegister) {
                $disable('/RegisterForm/Email/Fieldset')
            }
        },100)
    })
    return {
        render:()=>{
            return new Promise((resolve,reject)=>{

            })
        }
    }
})