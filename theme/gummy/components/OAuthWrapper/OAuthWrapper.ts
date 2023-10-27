import { AppInstance, ParentComponent, PatchHelper, ScopeObject, app } from "../../strawberry/app"
import { StateManagerInterface } from "../../strawberry/factories/StateManager"
import { AjaxSvcHandler } from "../../strawberry/services/AjaxSvcHandler"
import { AuthSvc } from "../../strawberry/services/AuthSvc"
import { OAuthSvc } from "../../strawberry/services/OAuthSvc"
import { ServiceDomains } from "../../strawberry/services/ServiceDomains"
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
    AjaxSvcHandler: AjaxSvcHandler,
    ServiceDomains: ServiceDomains,
    AuthSvc: AuthSvc
)=>{
    //const oauthHandlerUri = 'https://7ry5682dnf.execute-api.ap-southeast-1.amazonaws.com/test_deploy_stage/oauth'
    const oauthHandlerUri = ServiceDomains.get().functions+'/oauth/scriptgum'
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
            }).then((response:{next:'register',token:string,user:{firstName:string,lastName:string,email:string,username:string}})=>{
                if (response.next==='register') {
                    location.href = `/register?token=${response.token}&firstname=${response.user.firstName}&lastname=${response.user.lastName}&email=${response.user.email}`
                    return
                }
                if (response.next==='account_page') {
                    AuthSvc.saveAuthToken(response.token)
                    location.href = `/${response.user.username}/create`
                    return
                }
            })
        }
        if (provider==='fireauth') {
            const url = new URL(location.href)
            const queryParams = new URLSearchParams(url.search)
            const token = queryParams.get('token')
            if (token===null) {
                $parent.get().hooks().loadBar.hide()
                StateManager.switch('error')
                return 
            }
            AjaxSvcHandler.get({
                url: oauthHandlerUri+'?provider=firebase&token='+token
            }).then((response:{next:'register'|'account_page'|'email_verification_page',token:string,user:{firstName:string,lastName:string,email:string,username:string,id:string,firebaseIdToken:string}})=>{
                if (response.next==='register') {
                    $parent.get().hooks().loadBar.hide()
                    StateManager.switch('error')
                    return
                }
                if (response.next==='account_page') {
                    AuthSvc.saveAuthToken(response.token)
                    location.href = `/${response.user.username}/create`
                    return
                }
                if (response.next==='email_verification_page') {
                    location.href = 'checkpoint?id='+response.user.id+'&token='+response.user.firebaseIdToken
                }
            })
        }
    })
    return {
        render:()=>{
            return new Promise((resolve,reject)=>{

            })
        }
    }
})