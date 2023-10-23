import { app } from "../app"

export interface ServiceDomains {
    get:()=>{
        baseDomiain: string,
        functions: string,
        tenant: string
    }
}

app.service<ServiceDomains>('ServiceDomains',()=>{
    return {
        get:()=>{
            return {
                baseDomiain: 'http://localhost:3000',
                functions: 'http://localhost:7544',
                tenant: 'scriptgum'
            }
        }
    }
})