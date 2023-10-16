import { AppInstance, PatchHelper, ScopeObject, app } from "../../strawberry/app"
import { StateManagerInterface } from "../../strawberry/factories/StateManager"
import { LoadBarAnimation } from "../LoadBarAnimation/LoadBarAnimation"

/** States of the component */
export type RouterState = 'loading' | 'active' | 'error'

/** Component Object */
type ComponentScope = {
    state: RouterState
}

/** Exportables */
export interface Router {
    render:()=>Promise<void>
}

export type RouterLoadbarHooks = {
    hooks:()=>{
        loadBar: {
            activate:()=>Promise<void>,
            hide:()=>Promise<void>
        }
    }
}

/** Component declarations */
app.component<Router&RouterLoadbarHooks>('Router',(
    $scope: ScopeObject<ComponentScope>,
    $patch: PatchHelper,
    StateManager: StateManagerInterface<RouterState>,
    $app: AppInstance,
    LoadBarAnimation: LoadBarAnimation
)=>{
    StateManager.setScope($scope).setPatcher($patch).register('active').register('error').register('loading')
    $app.onReady(()=>{
        StateManager.switch('active')
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
                            resolve()
                        })
                    },
                    hide:()=>{
                        return new Promise(async (resolve,reject)=>{
                            await LoadBarAnimation.hide()
                            resolve()
                        })
                    }
                }
            }
        }
    }
})