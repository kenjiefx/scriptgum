import { app } from "../app";
import { ServiceDomains } from "./ServiceDomains";

export type OAuthProvider = 'google' | 'facebook' | 'fireauth'
export type OAuthSession = {
    provider: OAuthProvider
    createdAt: number
}

export interface OAuthSvc {
    createSession:(provider:OAuthProvider,token?:string,email?:string)=>void
    getSession:()=>null|OAuthSession
}

app.service<OAuthSvc>('OAuthSvc',(
    ServiceDomains: ServiceDomains
)=>{
    const BASE_URL = ServiceDomains.get().baseDomiain
    return {
        createSession:(provider:OAuthProvider,token?:string,email?:string)=>{
            const session:OAuthSession = {
                provider: provider,
                createdAt: Date.now()
            }
            localStorage.setItem('oauth_session',JSON.stringify(session))
            const redirectUri = BASE_URL+'/oauth'
            if (provider==='google') {
                location.href=`https://accounts.google.com/o/oauth2/v2/auth?scope=https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email&include_granted_scopes=true&response_type=token&state=state_parameter_passthrough_value&redirect_uri=${redirectUri}&client_id=774354288302-vcpvvn1sd6hv9vof9mfvrt7do6kfui9a.apps.googleusercontent.com`
            }
            if (provider==='fireauth') {
                if (token!==undefined&&token!==null) {
                    location.href = redirectUri+'?fireauth=true&token='+token+'&email='+email
                }
            }
        },
        getSession:()=>{
            const savedSession = localStorage.getItem('oauth_session')
            if (savedSession===undefined||savedSession===null) return null 
            const session = JSON.parse(savedSession)
            if (!session.hasOwnProperty('provider')) return null 
            if (!session.hasOwnProperty('createdAt')) return null 
            return {
                provider: session.provider,
                createdAt: session.createdAt
            }
        }
    }
})