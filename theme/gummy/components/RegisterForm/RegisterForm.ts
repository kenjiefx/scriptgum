import { AppInstance, PatchHelper, ScopeObject, app } from "../../strawberry/app"
import { StateManagerInterface } from "../../strawberry/factories/StateManager"

/** States of the component */
export type RegisterFormState = 'loading' | 'active' | 'error'

/** Component Object */
type ComponentScope = {
    state: RegisterFormState
    firstName: string 
    lastName: string
    email: string
    password: string
    confirmationPassword: string
    username: string
    type: 'autoregister' | 'new'
    isAutoRegister: boolean
    hasAcceptedTermsAndConditions: boolean
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
)=>{
    StateManager.setScope($scope).setPatcher($patch).register('active').register('error').register('loading')
    $app.onReady(()=>{
        const queryParams = new URLSearchParams(location.href)
        const token = queryParams.get('token')
        $scope.firstName = queryParams.get('firstname')
        $scope.lastName  = queryParams.get('lastname')
        $scope.email     = queryParams.get('email')
        if (token!==null) {
            $scope.type = 'autoregister'
        }
        $scope.hasAcceptedTermsAndConditions = false
        $scope.isAutoRegister = ($scope.type==='autoregister')
        StateManager.switch('active')
    })
    return {
        render:()=>{
            return new Promise((resolve,reject)=>{

            })
        }
    }
})