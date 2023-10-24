import { app } from "../app";
import { AjaxSvcHandler } from "./AjaxSvcHandler";
import { ServiceDomains } from "./ServiceDomains";

export type UserModel = {
    email: string,
    firstName: string,
    id: string,
    lastName: string,
    profilePhoto: null|string,
    provider: 'firebase'|'oauth',
    username: string,
    isValidated: boolean
}

export type UserCreateResponse = {
    next: 'account_page' | 'email_verification_page',
    user: UserModel 
}
export interface UserRegistryService {
    createUser:(user:{
        first_name: string,
        last_name: string,
        token: string,
        provider: 'firebase'|'oauth',
        username: string,
        api_key: string
    })=>Promise<UserCreateResponse>
}

app.service<UserRegistryService>('UserRegistryService',(
    AjaxSvcHandler: AjaxSvcHandler,
    ServiceDomains: ServiceDomains
)=>{
    const fnUrl = ServiceDomains.get().functions
    const tenantId = ServiceDomains.get().tenant
    return {
        createUser:(user)=>{
            return new Promise(async(resolve,reject)=>{
                try {
                    const response = await AjaxSvcHandler.post<UserCreateResponse>({
                        url:fnUrl+'/users/'+tenantId+'/create',
                        data: user
                    })
                    resolve(response)
                } catch (error) {
                    reject(error)
                }
            })
        }
    }
})