import { AppInstance, PatchHelper, ScopeObject, app } from "../../strawberry/app"
import { StateManagerInterface } from "../../strawberry/factories/StateManager"
import { UserModel } from "../../strawberry/factories/UserModelFactory"
import { AuthSvc } from "../../strawberry/services/AuthSvc"
import { IdentityProviderSvc } from "../../strawberry/services/IdentityProviderSvc"
import { LoadBarAnimation } from "../LoadBarAnimation/LoadBarAnimation"

/** States of the component */
export type RouterState = 'loading' | 'active' | 'error'

/** Component Object */
type ComponentScope = {
    state: RouterState,
    user: UserModel,
    events: {
        page: {
            ready: Array<()=>void>
        }
    }
}

/** Exportables */
export interface Router {
    render:()=>Promise<void>
}

export type RouterLoadbarHooks = {
    hooks:()=>{
        loadBar: {
            activate:()=>Promise<null>,
            hide:()=>Promise<null>
        }
    }
}

export type RouterEventHooks = {
    hooks:()=>{
        events: {
            isPageReady:()=>Promise<null>
        }
    }
}

export type MetaPage = {
    user: {
        username: string
    },
    page: {
        type: 'public' | 'private'
    }
}

export type RouterHooks = RouterLoadbarHooks | RouterEventHooks
/** Component declarations */
app.component<Router&RouterHooks>('Router',(
    $scope: ScopeObject<ComponentScope>,
    $patch: PatchHelper,
    StateManager: StateManagerInterface<RouterState>,
    $app: AppInstance,
    LoadBarAnimation: LoadBarAnimation,
    AuthSvc: AuthSvc,
    IdentityProviderSvc: IdentityProviderSvc
)=>{
    $scope.events = {
        page: {
            ready: []
        }
    }
    StateManager.setScope($scope).setPatcher($patch).register('active').register('error').register('loading')
    $app.onReady(async ()=>{
        StateManager.switch('loading')
        const metapage: MetaPage = window['__METAPAGE']
        let token: string
        
        if (await AuthSvc.hasActiveToken()) {
            token = AuthSvc.getCurrentToken()
        } else {
            if (metapage.user.username==='public') {
                $scope.user = await IdentityProviderSvc.getUser('public')
                StateManager.switch('active')
            }
        }
        //StateManager.switch('active')
    })
    return {
        render:()=>{
            return new Promise((resolve,reject)=>{

            })
        },
        hooks:()=>{
            return {
                loadBar: {
                    activate:()=>{
                        return new Promise(async (resolve,reject)=>{
                            await LoadBarAnimation.activate()
                            resolve(null)
                        })
                    },
                    hide:()=>{
                        return new Promise(async (resolve,reject)=>{
                            await LoadBarAnimation.hide()
                            resolve(null)
                        })
                    }
                },
                events: {
                    isPageReady:()=>{
                        return new Promise(async (resolve,reject)=>{
                            resolve(null)
                        })
                    }
                }
            }
        }
    }
})