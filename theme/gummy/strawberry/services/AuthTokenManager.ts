import { app } from "../app";
import { AjaxSvcHandler } from "./AjaxSvcHandler";
import { ServiceDomains } from "./ServiceDomains";

export interface AuthTokenManager {
    exchangeIdTokenWithAuthToken:(idToken:string)=>Promise<string>
    refreshAuthToken:(existingToken:string)=>Promise<string>
}
app.service<AuthTokenManager>('AuthTokenManager',(
    ServiceDomains: ServiceDomains,
    AjaxSvcHandler: AjaxSvcHandler
)=>{
    return {
        exchangeIdTokenWithAuthToken:(idToken)=>{
            return new Promise(function(resolve,reject){
                AjaxSvcHandler.post({
                    url: ServiceDomains.get().functions+'/exchange/provider/token?id='+idToken
                }).then((response:{token:string})=>{
                    resolve(response.token)
                }).catch(reject);
            })
        },
        refreshAuthToken:(existingToken)=>{
            return new Promise((resolve,reject)=>{
                AjaxSvcHandler.get({
                    url: ServiceDomains.get().functions+'/auth/'+ServiceDomains.get().tenant+'/token?intent=refresh&token='+existingToken
                }).then((response:{token:string})=>{
                    resolve(response.token)
                }).catch(reject)
            });
        }
    }
});