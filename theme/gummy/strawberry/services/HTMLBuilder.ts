import { app } from "../app";

export interface HTMLBuilder {
    run:(content:string)=>string
}

app.service<HTMLBuilder>('HTMLBuilder',()=>{
    return {
        run:(content:string)=>{
            let html = '<html><head><title>ScriptGum Preview</title></head><body>'
            html += content 
            html += '</body></html>'
            return html
        }
    }
})