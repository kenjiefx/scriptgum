import { PatchHelper, ScopeObject, StrawberryElement, app } from "../../strawberry/app"
import { StateManagerInterface } from "../../strawberry/factories/StateManager"
import { OAuthSvc } from "../../strawberry/services/OAuthSvc"

/** States of the component */
export type LoginFormState = 'loading' | 'active' | 'error'

/** Component Object */
type ComponentScope = {
    state: LoginFormState,
    signinWith: {
        google:{
            viaFirebase:()=>void,
            viaNative:()=>void
        },
        fireAuth:(button:StrawberryElement<HTMLButtonElement>)=>void
    },
    hasError: boolean,
    errorMessage: string,
    email: string,
    password: string
}

/** Exportables */
export interface LoginForm {
    render:()=>Promise<void>
}

/** Component declarations */
app.component<LoginForm>('LoginForm',(
    $scope: ScopeObject<ComponentScope>,
    $patch: PatchHelper,
    StateManager: StateManagerInterface<LoginFormState>,
    OAuthSvc: OAuthSvc
)=>{
    StateManager.setScope($scope).setPatcher($patch).register('active').register('error').register('loading')

    // Populating data, if wrapper by OAuthWrapper 
    const url = new URL(location.href)
    const queryParams = new URLSearchParams(url.search)
    const hasFireAuth = queryParams.get('fireauth')
    if (hasFireAuth!==null) {
        $scope.email = queryParams.get('email') ?? null
        $scope.password = '•••••••••••••••••'
    }

    $scope.signinWith = {
        google:{
            viaFirebase: ()=>{
                
            },
            viaNative:()=>{
                OAuthSvc.createSession('google')
            }
        },
        fireAuth:(button)=>{
            let email = ($scope.email!==undefined) ? $scope.email.trim() : ''
            let password = ($scope.password!==undefined) ? $scope.password.trim() : ''
            const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
            if (email.length<8||email.length>64) {
                $scope.hasError = true
                $scope.errorMessage = 'Email must be more than 8 characters'
                $patch('/Login/Form/Error')
                return
            }
            if (!emailRegex.test(email)) {
                $scope.hasError = true
                $scope.errorMessage = 'Email must be valid'
                $patch('/Login/Form/Error')
                return
            }
            if (password.length<12||password.length>64) {
                $scope.hasError = true
                $scope.errorMessage = 'Password must be more than 12 characters'
                $patch('/Login/Form/Error')
                return
            }
            $scope.hasError = false
            $scope.errorMessage = ''
            $patch('/Login/Form/Error')
            button.addClass('is-button-loading')
            window['FIREBASE'].signInWith.emailAndPassword(window['FIREBASE'].auth,email,password)
            .then(async (userCredential)=>{
                const idToken = userCredential._tokenResponse.idToken
                OAuthSvc.createSession('fireauth',idToken,email)
            }).catch((error)=>{
                $scope.hasError = true
                $scope.errorMessage = 'Sorry, your credentials are invalid'
                $patch('/Login/Form/Error')
                button.removeClass('is-button-loading')
                return
            })
        }
    }
    $scope.hasError = false
    return {
        render:()=>{
            return new Promise((resolve,reject)=>{

            })
        }
    }
})