import { app } from "../app";

export type OAuthProvider = 'google' | 'facebook'
export type OAuthSession = {
    provider: OAuthProvider
    createdAt: number
}

export interface OAuthSvc {
    createSession:(provider:OAuthProvider)=>void
    getSession:()=>null|OAuthSession
}

app.service<OAuthSvc>('OAuthSvc',()=>{
    const BASE_URL = 'http://localhost:3000'
    return {
        createSession:(provider:OAuthProvider)=>{
            const session:OAuthSession = {
                provider: provider,
                createdAt: Date.now()
            }
            localStorage.setItem('oauth_session',JSON.stringify(session))
            const redirectUri = BASE_URL+'/oauth'
            location.href=`https://accounts.google.com/o/oauth2/v2/auth?scope=https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email&include_granted_scopes=true&response_type=token&state=state_parameter_passthrough_value&redirect_uri=${redirectUri}&client_id=774354288302-vcpvvn1sd6hv9vof9mfvrt7do6kfui9a.apps.googleusercontent.com`
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