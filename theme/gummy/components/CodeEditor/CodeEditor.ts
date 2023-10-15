import { AppInstance, BlockElement, BlockElements, PatchHelper, ScopeObject, StrawberryElement, app } from "../../strawberry/app"
import { StateManagerInterface } from "../../strawberry/factories/StateManager"
import { UserModel } from "../../strawberry/factories/UserModelFactory"
import { HTMLBuilder } from "../../strawberry/services/HTMLBuilder"
import { IdentityProviderSvc } from "../../strawberry/services/IdentityProviderSvc"
import { PaneResizeButtonParentHooks } from "../PaneResizeButton/PaneResizeButton"
import { PreviewPane, PreviewPaneParentHooks } from "../PreviewPane/PreviewPane"

/** States of the component */
export type CodeEditorState = 'loading' | 'active' | 'error'

/** Component Object */
type ComponentScope = {
    state: CodeEditorState,
    tools: {
        run:()=>void,
        download:()=>void
    },
    user: UserModel
}

/** Exportables */
export interface CodeEditor {
    render:()=>Promise<void>
}

/** Component declarations */
app.component<CodeEditor&PaneResizeButtonParentHooks&PreviewPaneParentHooks>('CodeEditor',(
    $scope: ScopeObject<ComponentScope>,
    $patch: PatchHelper,
    StateManager: StateManagerInterface<CodeEditorState>,
    $app: AppInstance,
    PreviewPane: PreviewPane,
    $block:(name:string,callback:(element:StrawberryElement)=>void)=>void,
    HTMLBuilder: HTMLBuilder,
    IdentityProviderSvc: IdentityProviderSvc
)=>{
    StateManager.setScope($scope).setPatcher($patch).register('active').register('error').register('loading')
    const setEditorBodyHeight=()=>{
        const workspaceHeight = document.documentElement.clientHeight - document.querySelector('header').getBoundingClientRect().height
        const headerHeight = document.querySelector('[xblock="/CodeEditor/Header"]').getBoundingClientRect().height
        const bodyHeight = (workspaceHeight - headerHeight) - 200
        $block('/CodeEditor/Body',(element)=>{
            element.$element.setAttribute('style',`height:${bodyHeight}px;`)
        })
    }
    let editor
    $scope.tools = {
        run:()=>{
            const html = editor.getValue()
            PreviewPane.render(html)
        },
        download:()=>{
            const html = HTMLBuilder.run(editor.getValue())
            const el = document.createElement('a')
            el.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(html))
            el.setAttribute('download','export.html')
            el.style.display = 'none'
            document.body.appendChild(el)
            el.click()
            document.body.removeChild(el)
        }
    }
    $app.onReady(()=>{
        StateManager.switch('loading')
        IdentityProviderSvc.getUser()
        .then((user)=>{
            $scope.user = user
            StateManager.switch('active').then(()=>{
                setEditorBodyHeight()
                // @ts-ignore
                editor = ace.edit('code_editor')
                editor.setValue("<!-- Start Coding Here -->\n")
                editor.session.setMode('ace/mode/html')
            })
        })
    })
    return {
        render:()=>{
            return new Promise((resolve,reject)=>{

            })
        },
        hooks:()=>{
            return {
                resizeButton: {
                    toExpand:()=>{
                        $block('/CodeEditor/EditorPane',element=>element.$element.setAttribute('style','width:100%;'))
                        $block('/CodeEditor/PreviewPane',element=>element.$element.setAttribute('style','display:none'))
                    },
                    toClose:()=>{
                        $block('/CodeEditor/EditorPane',element=>element.$element.removeAttribute('style'))
                        $block('/CodeEditor/PreviewPane',element=>element.$element.removeAttribute('style'))
                    }
                },
                previewPane: {
                    expand:()=>{
                        $block('/CodeEditor/EditorPane',element=>element.$element.setAttribute('style','width:0%;'))
                        $block('/CodeEditor/PreviewPane',element=>element.$element.setAttribute('style','width:100%;'))
                    },
                    minimize:()=>{
                        $block('/CodeEditor/PreviewPane',element=>element.$element.removeAttribute('style'))
                        $block('/CodeEditor/EditorPane',element=>element.$element.removeAttribute('style'))
                    }
                }
            }
        }
    }
})