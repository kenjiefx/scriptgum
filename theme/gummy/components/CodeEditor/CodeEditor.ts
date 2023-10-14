import { AppInstance, BlockElement, BlockElements, PatchHelper, ScopeObject, StrawberryElement, app } from "../../strawberry/app"
import { StateManagerInterface } from "../../strawberry/factories/StateManager"
import { PreviewPane } from "../PreviewPane/PreviewPane"

/** States of the component */
export type CodeEditorState = 'loading' | 'active' | 'error'

/** Component Object */
type ComponentScope = {
    state: CodeEditorState,
    tools: {
        run:()=>void,
        fullScreen:{
            editorPane:()=>void
        }
    }
    states: {
        resizeButton:(state:string)=>boolean
    }
}

/** Exportables */
export interface CodeEditor {
    render:()=>Promise<void>
}

/** Component declarations */
app.component<CodeEditor>('CodeEditor',(
    $scope: ScopeObject<ComponentScope>,
    $patch: PatchHelper,
    StateManager: StateManagerInterface<CodeEditorState>,
    $app: AppInstance,
    PreviewPane: PreviewPane,
    $block:(name:string,callback:(element:StrawberryElement)=>void)=>void
)=>{
    StateManager.setScope($scope).setPatcher($patch).register('active').register('error').register('loading')
    const setEditorBodyHeight=()=>{
        const workspaceHeight = document.documentElement.clientHeight - document.querySelector('header').getBoundingClientRect().height
        const headerHeight = document.querySelector('[xblock="/CodeEditor/Header"]').getBoundingClientRect().height
        const bodyHeight = (workspaceHeight - headerHeight) - 100
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
        fullScreen: {
            editorPane:()=>{
                if (editorResizeButton.getState()==='expand') {
                    editorResizeButton.toState().close()
                    $block('/CodeEditor/EditorPane',element=>element.$element.setAttribute('style','width:100%;'))
                    $block('/CodeEditor/PreviewPane',element=>element.$element.setAttribute('style','display:none'))
                    return
                }
                editorResizeButton.toState().expand()
                $block('/CodeEditor/EditorPane',element=>element.$element.removeAttribute('style'))
                $block('/CodeEditor/PreviewPane',element=>element.$element.removeAttribute('style'))
                return
            }
        }
    }

    class EditorResizeButton {
        namespace = '/CodeEditor/EditorPane/ResizeButton'
        state = 'expand'
        constructor(){

        }
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
    const editorResizeButton = new EditorResizeButton()
    $app.onReady(()=>{
        setTimeout(()=>{
            setEditorBodyHeight()
            // @ts-ignore
            editor = ace.edit('code_editor')
            editor.setValue("<!-- Start Coding Here -->\n")
            editor.session.setMode('ace/mode/html')
        },100)
    })

    $scope.states={
        resizeButton:(state)=> {
            return editorResizeButton.getState() === state
        }
    }
    return {
        render:()=>{
            return new Promise((resolve,reject)=>{

            })
        }
    }
})