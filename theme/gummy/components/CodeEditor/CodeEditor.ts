import { AppInstance, BlockElement, BlockElements, ParentComponent, PatchHelper, ScopeObject, StrawberryElement, app } from "../../strawberry/app"
import { StateManagerInterface } from "../../strawberry/factories/StateManager"
import { UserModel } from "../../strawberry/factories/UserModelFactory"
import { HTMLBuilder } from "../../strawberry/services/HTMLBuilder"
import { IdentityProviderSvc } from "../../strawberry/services/IdentityProviderSvc"
import { PaneResizeButtonParentHooks } from "../PaneResizeButton/PaneResizeButton"
import { PreviewPane, PreviewPaneParentHooks } from "../PreviewPane/PreviewPane"
import { RouterLoadbarHooks } from "../Router/Router"

/** States of the component */
export type CodeEditorState = 'loading' | 'active' | 'error'

/** Component Object */
type ComponentScope = {
    state: CodeEditorState,
    tools: {
        run:()=>void,
        download:()=>void,
        share:{
            open:()=>void,
            close:()=>void,
            generateLink:(button:StrawberryElement<HTMLButtonElement>)=>void
        },
        save:(button:StrawberryElement<HTMLButtonElement>)=>void
    },
    user: UserModel,
    states:{
        modals:{
            share:string
        }
    },
    content: {
        title: string,
        code: string
    }
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
    $block:(name:string,callback:(element:StrawberryElement<Element>)=>void)=>void,
    HTMLBuilder: HTMLBuilder,
    IdentityProviderSvc: IdentityProviderSvc,
    $parent: ParentComponent<RouterLoadbarHooks>
)=>{
    class ModalController {
        private name: string 
        private data: {[key:string]:any}
        constructor({name,data}:{name:string,data:{[key:string]:any}}) {
            this.name = name,
            this.data = {}
        }
        open(){
            $block(this.name,(modal:StrawberryElement<HTMLDialogElement>)=>modal.$element.showModal())
        }
        close(){
            $block(this.name,(modal:StrawberryElement<HTMLDialogElement>)=>modal.$element.close())
        }
        setData(key:string,value:any){
            this.data[key] = value
        }
        getData(){
            return this.data
        }
    }
    const modals = {
        share: new ModalController({name:'/Modal/Dialog/Share',data:{link:null}})
    }
    $scope.states = {
        modals: {
            share: ''
        }
    }
    StateManager.setScope($scope).setPatcher($patch).register('active').register('error').register('loading')
    const setEditorBodyHeight=()=>{
        const workspaceHeight = document.documentElement.clientHeight - document.querySelector('#site_header').getBoundingClientRect().height
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
        },
        share:{
            open:()=>{
                $scope.states.modals.share = modals.share.getData().link ?? ''
                $patch('/Modal/Dialog/Share/Link')
                modals.share.open()
            },
            close:()=>{
                modals.share.close()
            },
            generateLink:(button)=>{
                button.addClass('is-button-loading')
                setTimeout(()=>{
                    $scope.states.modals.share = 'https://scriptgum.com/public/h8uY6GvdBst'
                    modals.share.setData('link','https://scriptgum.com/public/h8uY6GvdBst')
                    $patch('/Modal/Dialog/Share/Link')
                },1000)
            }
        },
        save:(button)=>{
            button.addClass('is-button-loading')
            $parent.get().hooks().loadBar.activate().then(()=>{
                setTimeout(()=>{
                    $parent.get().hooks().loadBar.hide()
                    button.removeClass('is-button-loading')
                },2000)
            })
        }
    }
    $app.onReady(()=>{
        $scope.content = {
            title: '',
            code: ''
        }
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