import { ParentComponent, PatchHelper, ScopeObject, app } from "../../strawberry/app"
import { StateManagerInterface } from "../../strawberry/factories/StateManager"
import { HTMLBuilder } from "../../strawberry/services/HTMLBuilder"
import { PaneResizeButtonParentHooks } from "../PaneResizeButton/PaneResizeButton"

/** States of the component */
export type PreviewPaneState = 'loading' | 'active' | 'error'

/** Component Object */
type ComponentScope = {
    state: PreviewPaneState,
    tools: {
        fullScreen: {
            previewPane:()=>void
        }
    },
    states: {
        resizeButton:(state:string)=>boolean
    }
}

export type PreviewPaneParentHooks = {
    hooks:()=>{
        previewPane: {
            expand:()=>void,
            minimize:()=>void
        }
    }
}

/** Exportables */
export interface PreviewPane {
    render:(html:string)=>Promise<void>
}

/** Component declarations */
app.component<PreviewPane&PaneResizeButtonParentHooks>('PreviewPane',(
    $scope: ScopeObject<ComponentScope>,
    $patch: PatchHelper,
    StateManager: StateManagerInterface<PreviewPaneState>,
    $parent: ParentComponent<PreviewPaneParentHooks>,
    HTMLBuilder: HTMLBuilder
)=>{
    StateManager.setScope($scope).setPatcher($patch).register('active').register('error').register('loading')
    class PreviewResizeButton {
        namespace = '/PreviewPane/ResizeButton'
        state = 'expand'
        constructor(){}
        toState(){
            return {
                close:()=>{
                    this.state = 'close'
                    $patch(this.namespace)
                },
                expand:()=>{
                    this.state = 'expand'
                    $patch(this.namespace)
                }
            }
        }
        getState(){
            return this.state
        }
    }
    const previewResizeButton = new PreviewResizeButton()
    return {
        render:(html:string)=>{
            return new Promise((resolve,reject)=>{
                const previewer = document.getElementById('preview_pane')
                previewer.innerHTML = ''
                const wrapper = document.implementation.createHTMLDocument()
                wrapper.body.innerHTML = html

                const iframe = document.createElement('iframe')
                iframe.width = '100%'
                iframe.height = '100vh'
                iframe.frameBorder = '0'
                iframe.id = 'myIframe'

                previewer.appendChild(iframe)
                const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
                const iframeContent = HTMLBuilder.run(html)
                if (iframeDocument) {
                    iframeDocument.open()
                    iframeDocument.write(iframeContent)
                    iframeDocument.close()
                } else {
                    console.error('Failed to access the iframe document.')
                }

            })
        },
        hooks:()=>{
            return {
                resizeButton:{
                    toExpand:()=>{
                        $parent.get().hooks().previewPane.expand()
                    },
                    toClose:()=>{
                        $parent.get().hooks().previewPane.minimize()
                    }
                }
            }
        }
    }
})