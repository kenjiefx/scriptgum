import { PatchHelper, ScopeObject, app } from "../../strawberry/app"
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
        }
    }
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
    $scope.signinWith = {
        google:{
            viaFirebase: ()=>{
                // @ts-ignore
                const firebaseAuth = window.FIREBASE.auth
                // @ts-ignore
                const signinWithPopup = window.FIREBASE.signInWith.popup
                // @ts-ignore
                const provider = window.FIREBASE.providers.google
                // @ts-ignore 
                const GoogleAuthProvider = window.FIREBASE.imports.GoogleAuthProvider
                signinWithPopup(firebaseAuth,provider)
                .then((result)=>{
                    // This gives you a Google Access Token. You can use it to access the Google API.
                    const credential = GoogleAuthProvider.credentialFromResult(result)
                    const token = credential.accessToken
                    // The signed-in user info.
                    const user = result.user
                    console.log(user)
                    console.log(token)
                }).catch((error) => {
                    // Handle Errors here.
                    const errorCode    = error.code;
                    const errorMessage = error.message;
                    // The email of the user's account used.
                    const email = error.customData.email;
                    // The AuthCredential type that was used.
                    const credential = GoogleAuthProvider.credentialFromError(error);
                    // ...
                });
            },
            viaNative:()=>{
                OAuthSvc.createSession('google')
            }
        }
    }
    return {
        render:()=>{
            return new Promise((resolve,reject)=>{

            })
        }
    }
})