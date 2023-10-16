import { app } from "../app";

export type AjaxRequestConfig = Pick<AjaxRequiredConfig,'contentType'|'data'|'url'|'withAuthToken'>

type RequestMethod = 'POST'|'GET'|'PATCH'|'PUT'

type AjaxRequiredConfig = {
    contentType?: 'application/json'
    data?: {[key:string]:any}
    url: string,
    method: RequestMethod
    withAuthToken?: boolean
}

export interface AjaxSvcHandler {
    post:<TResponse>(config:AjaxRequestConfig)=>Promise<TResponse>,
    get:<TResponse>(config:AjaxRequestConfig)=>Promise<TResponse>,
    patch:<TResponse>(config:AjaxRequestConfig)=>Promise<TResponse>
    put:<TResponse>(config:AjaxRequestConfig)=>Promise<TResponse>
}

app.service<AjaxSvcHandler>('AjaxSvcHandler',()=>{
    const normalizeConfig=(method:RequestMethod,config:AjaxRequestConfig):AjaxRequiredConfig=>{
        return {
            withAuthToken: config.withAuthToken ?? true,
            contentType: config.contentType ?? 'application/json',
            data: config.data ?? [],
            url: config.url ?? '/',
            method: method
        }
    }
    const runAjax=<TResponse>(config:AjaxRequiredConfig):Promise<TResponse>=>{
        return new Promise((resolve,reject)=>{
            const ajaxData = {
                method: config.method,
                url: config.url,
                contentType: config.contentType,
                success: resolve,
                error: reject
            }
            if (config.method!=='GET') {
                ajaxData['data'] = JSON.stringify(config.data)
            }
            if (config.withAuthToken) {
                ajaxData['headers'] = {'X-Krypton-Token':localStorage.getItem('auth_token')}
            }
            $.ajax(ajaxData)
            .then((data)=>resolve(data))
            .catch((error)=>reject(error))
        });
    }
    return {
        post:(rawConfig:AjaxRequestConfig)=>{
            const config = normalizeConfig('POST',rawConfig)
            return runAjax(config)
        },
        get:(rawConfig)=>{
            const config = normalizeConfig('GET',rawConfig)
            return runAjax(config)
        },
        patch:(rawConfig)=>{
            const config = normalizeConfig('PATCH',rawConfig)
            return runAjax(config)
        },
        put:(rawConfig)=>{
            const config = normalizeConfig('PUT',rawConfig)
            return runAjax(config)
        }
    }
});