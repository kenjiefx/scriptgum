import { PatchHelper, ScopeObject, app } from "../../strawberry/app"
import { StateManagerInterface } from "../../strawberry/factories/StateManager"

/** States of the component */
export type LoadBarAnimationState = 'loading' | 'active' | 'error' | 'empty'

/** Component Object */
type ComponentScope = {
    state: LoadBarAnimationState
}

/** Exportables */
export interface LoadBarAnimation {
    activate:()=>Promise<void>,
    hide:()=>Promise<void>
}

/** Component declarations */
app.component<LoadBarAnimation>('LoadBarAnimation',(
    $scope: ScopeObject<ComponentScope>,
    $patch: PatchHelper,
    StateManager: StateManagerInterface<LoadBarAnimationState>
)=>{
    StateManager.setScope($scope).setPatcher($patch).register('active').register('error').register('loading').register('empty')
    return {
        activate:()=>{
            return new Promise(async (resolve,reject)=>{
                await StateManager.switch('active')
                resolve()
            })
        },
        hide:()=>{
            return new Promise(async (resolve,reject)=>{
                await StateManager.switch('empty')
                resolve()
            })
        }
    }
})