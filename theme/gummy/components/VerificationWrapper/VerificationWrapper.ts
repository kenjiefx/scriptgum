import { AppInstance, PatchHelper, ScopeObject, StrawberryElement, app } from "../../strawberry/app"
import { StateManagerInterface } from "../../strawberry/factories/StateManager"
import { AjaxSvcHandler } from "../../strawberry/services/AjaxSvcHandler"
import { ServiceDomains } from "../../strawberry/services/ServiceDomains"

/** States of the component */
export type VerificationWrapperState = 'loading' | 'active' | 'error' | 'verification_ready'

/** Component Object */
type ComponentScope = {
    state: VerificationWrapperState,
    emailNeedsVerification: string,
    userId: string
    fireauthToken: string
    resendEmail:(button:StrawberryElement<HTMLButtonElement>)=>void
    status: 'ready' | 'email_sent'
}

/** Exportables */
export interface VerificationWrapper {
    render:()=>Promise<void>
}

/** Component declarations */
app.component<VerificationWrapper>('VerificationWrapper',(
    $scope: ScopeObject<ComponentScope>,
    $patch: PatchHelper,
    StateManager: StateManagerInterface<VerificationWrapperState>,
    $app: AppInstance,
    AjaxSvcHandler: AjaxSvcHandler,
    ServiceDomains: ServiceDomains
)=>{
    StateManager.setScope($scope).setPatcher($patch).register('active').register('error').register('loading').register('verification_ready')
    const baseUrl = ServiceDomains.get().functions+'/users/'+ServiceDomains.get().tenant+'/verify'
    $scope.resendEmail=(button)=>{
        button.addClass('is-button-loading')
        AjaxSvcHandler.post({
            url: baseUrl,
            data: {
                intent: 'send_email',
                id: $scope.userId,
                token: $scope.fireauthToken,
                api_key: 'AIzaSyDjrT3tdacUfrezcKH3D2lCq41-qvvc5Ro'
            }
        }).then(()=>{
            $scope.status = 'email_sent'
            $patch('/EmailSentStatus')
        })
    }
    $app.onReady(()=>{
        StateManager.switch('loading')
        const url = new URL(location.href)
        const queryParams = new URLSearchParams(url.search)
        const userId = queryParams.get('id')
        $scope.userId = userId
        $scope.fireauthToken = queryParams.get('token')
        AjaxSvcHandler.post({
            url: baseUrl,
            data: {intent:'verify',id:userId}
        }).then((result:{isValidated:boolean,username:string,email:string})=>{
            if (!result.isValidated) {
                $scope.status = 'ready'
                $scope.emailNeedsVerification = result.email
                StateManager.switch('verification_ready')
                return
            }
            location.href = '/'+result.username+'/create'
        })
    })
    return {
        render:()=>{
            return new Promise((resolve,reject)=>{

            })
        }
    }
})