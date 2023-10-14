import { PatchHelper, ScopeObject, app } from "../../strawberry/app"
import { StateManagerInterface } from "../../strawberry/factories/StateManager"

/** States of the component */
export type PreviewPaneState = 'loading' | 'active' | 'error'

/** Component Object */
type ComponentScope = {
    state: PreviewPaneState
}

/** Exportables */
export interface PreviewPane {
    render:(html:string)=>Promise<void>
}

/** Component declarations */
app.component<PreviewPane>('PreviewPane',(
    $scope: ScopeObject<ComponentScope>,
    $patch: PatchHelper,
    StateManager: StateManagerInterface<PreviewPaneState>
)=>{
    StateManager.setScope($scope).setPatcher($patch).register('active').register('error').register('loading')
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
                if (iframeDocument) {
                    iframeDocument.open();
                    iframeDocument.write('<html><head><title>ScriptGum Preview</title></head><body>')
                    iframeDocument.write(html)
                    iframeDocument.write('</body></html>')
                    iframeDocument.close()
                } else {
                    console.error('Failed to access the iframe document.')
                }

            })
        }
    }
})