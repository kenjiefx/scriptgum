import { AppInstance, PatchHelper, ScopeObject, app } from "../../strawberry/app"
import { StateManagerInterface } from "../../strawberry/factories/StateManager"
import { AjaxSvcHandler } from "../../strawberry/services/AjaxSvcHandler"
import { ServiceDomains } from "../../strawberry/services/ServiceDomains"

/** States of the component */
export type ConfirmEmailWrapperState = 'loading' | 'active' | 'error'

/** Component Object */
type ComponentScope = {
    state: ConfirmEmailWrapperState
}

/** Exportables */
export interface ConfirmEmailWrapper {
    render:()=>Promise<void>
}

/** Component declarations */
app.component<ConfirmEmailWrapper>('ConfirmEmailWrapper',(
    $scope: ScopeObject<ComponentScope>,
    $patch: PatchHelper,
    StateManager: StateManagerInterface<ConfirmEmailWrapperState>,
    $app: AppInstance,
    AjaxSvcHandler: AjaxSvcHandler,
    ServiceDomains: ServiceDomains
)=>{
    const baseUrl = ServiceDomains.get().functions+'/users/'+ServiceDomains.get().tenant+'/verify'
    StateManager.setScope($scope).setPatcher($patch).register('active').register('error').register('loading')
    $app.onReady(()=>{
        StateManager.switch('loading')
        const url = new URL(location.href)
        const queryParams = new URLSearchParams(url.search)
        const oobCode = queryParams.get('oobCode')
        const apiKey = queryParams.get('apiKey')
        if (apiKey===null||oobCode===null) {
            StateManager.switch('error')
            return
        }
        AjaxSvcHandler.post({
            url: baseUrl,
            data: {
                intent: 'confirm_email',
                id: 'unknown',
                oob_code: oobCode,
                api_key: apiKey
            }
        }).then((response)=>{
            console.log(response)
            StateManager.switch('active')
        })
    })
    return {
        render:()=>{
            return new Promise((resolve,reject)=>{

            })
        }
    }
})