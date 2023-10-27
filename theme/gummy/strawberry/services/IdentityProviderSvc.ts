import { app } from "../app";
import { UserModel } from "../factories/UserModelFactory";

export interface IdentityProviderSvc {
    getUser:(token:string)=>Promise<UserModel>
}


app.service<IdentityProviderSvc>('IdentityProviderSvc',()=>{
    return {
        getUser:(token:string)=>{
            return new Promise((resolve,reject)=>{
                if (token==='public') {
                    resolve({
                        id: 'a',
                        firstName: 'Anonymous',
                        lastName: 'User',
                        profilePhoto: 'https://cdn.shopify.com/s/files/1/0560/7466/6159/files/profile-icon-9.png?v=1697373078',
                        username: 'anonymous',
                        type: 'public'
                    })
                    return
                }
                setTimeout(()=>{
                    resolve({
                        id: 'a',
                        firstName: 'Anonymous',
                        lastName: 'User',
                        profilePhoto: 'https://cdn.shopify.com/s/files/1/0560/7466/6159/files/profile-icon-9.png?v=1697373078',
                        username: 'anonymous',
                        type: 'public'
                    })
                },2000)
            })
        }
    }
})