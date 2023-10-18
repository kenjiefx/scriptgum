import { AppInstance, ParentComponent, PatchHelper, ScopeObject, app } from "../../strawberry/app"
import { StateManagerInterface } from "../../strawberry/factories/StateManager"
import { AjaxSvcHandler } from "../../strawberry/services/AjaxSvcHandler"
import { OAuthSvc } from "../../strawberry/services/OAuthSvc"
import { RouterLoadbarHooks } from "../Router/Router"

/** States of the component */
export type OAuthWrapperState = 'loading' | 'active' | 'error'

/** Component Object */
type ComponentScope = {
    state: OAuthWrapperState
}

/** Exportables */
export interface OAuthWrapper {
    render:()=>Promise<void>
}

/** Component declarations */
app.component<OAuthWrapper>('OAuthWrapper',(
    $scope: ScopeObject<ComponentScope>,
    $patch: PatchHelper,
    StateManager: StateManagerInterface<OAuthWrapperState>,
    $app: AppInstance,
    $parent: ParentComponent<RouterLoadbarHooks>,
    OAuthSvc: OAuthSvc,
    AjaxSvcHandler: AjaxSvcHandler
)=>{
    //const oauthHandlerUri = 'https://7ry5682dnf.execute-api.ap-southeast-1.amazonaws.com/test_deploy_stage/oauth'
    const oauthHandlerUri = 'http://localhost:5454/auth'
    StateManager.setScope($scope).setPatcher($patch).register('active').register('error').register('loading')
    $app.onReady(()=>{
        $parent.get().hooks().loadBar.activate()
        StateManager.switch('loading')
        const session = OAuthSvc.getSession()
        if (session===null) {
            $parent.get().hooks().loadBar.hide()
            StateManager.switch('error')
            return
        }
        const provider = session.provider
        if (provider==='google') {
            const queryParams = new URLSearchParams(location.href)
            const token = queryParams.get('access_token')
            if (token===null) {
                $parent.get().hooks().loadBar.hide()
                StateManager.switch('error')
                return 
            }
            AjaxSvcHandler.get({
                url: oauthHandlerUri+'?provider=google&token='+token
            }).then((response:{next:'register',token:string,user:{firstName:string,lastName:string,email:string}})=>{
                if (response.next==='register') {
                    location.href = `/register?token=${response.token}&firstname=${response.user.firstName}&lastname=${response.user.lastName}&email=${response.user.email}`
                }
            })
        }
        setTimeout(()=>{
            $parent.get().hooks().loadBar.hide()
            //StateManager.switch('error')
        },2000)
    })
    return {
        render:()=>{
            return new Promise((resolve,reject)=>{

            })
        }
    }
})