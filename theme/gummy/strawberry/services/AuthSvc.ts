import { app } from "../app";
import { AuthTokenManager } from "./AuthTokenManager";

export interface AuthSvc {
    hasActiveToken:()=>Promise<boolean>,
    saveAuthToken:(token:string)=>void,
    getCurrentToken:()=>string,
    forgetToken:()=>void,
    startRefreshingToken:()=>void
}

app.service('AuthSvc',(
    AuthTokenManager: AuthTokenManager
)=>{
    return {
        hasActiveToken: function(){
            return new Promise(async (resolve,reject)=>{
                let token = localStorage.getItem('auth_token')
                if (token===null) {
                    resolve(false)
                    return
                }
                AuthTokenManager.refreshAuthToken(token)
                .then((token)=>{
                    localStorage.setItem('auth_token',token);
                    resolve(true)
                })
                .catch(()=>{
                    resolve(false)
                })
            })
        },
        saveAuthToken:function(token){
            localStorage.setItem('auth_token',token);
        },
        getCurrentAuthToken:function(){
            return localStorage.getItem('auth_token');
        },
        forgetToken:function(){
            localStorage.removeItem('auth_token');
        },
        startRefreshingToken(){
            setInterval(function(){
                let token = localStorage.getItem('auth_token')
                AuthTokenManager.refreshAuthToken(token)
                .then(function(newToken){
                    localStorage.setItem('auth_token',newToken);
                })
                .catch(function(){
                })
            },300000)
        }
    }
});