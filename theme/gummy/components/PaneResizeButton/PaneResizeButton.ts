import { AppInstance, ParentComponent, PatchHelper, ScopeObject, app } from "../../strawberry/app"
import { StateManagerInterface } from "../../strawberry/factories/StateManager"

/** States of the component */
export type PaneResizeButtonState = 'expandable' | 'closable'

/** Component Object */
type ComponentScope = {
    state: PaneResizeButtonState,
    resizePane:()=>void
}

/** Exportables */
export interface PaneResizeButton {
    render:()=>Promise<void>
}

export type PaneResizeButtonParentHooks = {
    hooks:()=> {
        resizeButton: {
            toExpand:()=>void,
            toClose:()=>void
        }
    }
}

/** Component declarations */
app.component<PaneResizeButton>('PaneResizeButton',(
    $scope: ScopeObject<ComponentScope>,
    $patch: PatchHelper,
    StateManager: StateManagerInterface<PaneResizeButtonState>,
    $app: AppInstance,
    $parent: ParentComponent<PaneResizeButtonParentHooks>
)=>{
    StateManager.setScope($scope).setPatcher($patch).register('expandable').register('closable')
    $scope.resizePane=()=>{
        if (StateManager.getCurrentState()==='expandable') {
            StateManager.switch('closable')
            $parent.get().hooks().resizeButton.toExpand()
            return
        }
        StateManager.switch('expandable')
        $parent.get().hooks().resizeButton.toClose()
        return
    }
    $app.onReady(()=>{
        StateManager.switch('expandable')
    })
    return {
        render:()=>{
            return new Promise((resolve,reject)=>{

            })
        }
    }
})