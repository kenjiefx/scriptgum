export interface StrawberryApp {

    /**
     * Registers a component in your application. You can pass the type or interface of the 
     * component `<TComponent>`.
     * @param name - The name of the component
     * @param callback - The callback function that returns methods and properties implemented by `TComponent`
     */
    component:<TComponent>(name:string,callback:CallbackFunction<unknown[],TComponent>)=>void

    /**
     * Registers a service in your application. You can pass the type or interface
     * of the service `<TService>`
     * @param name  - The name of the service
     * @param callback - The callback function that returns methods and properties implemented by `TService`
     */
    service:<TService>(name:string,callback:CallbackFunction<unknown[],TService>)=>void
    
    /**
     * Registers a factory in your application. You can pass the type or interface
     * of the factory `<TFactory>` 
     * @param name - The name of the factory
     * @param callback - The callback function that returns methods and properties implemented by `TFactory`
     */
    factory:<TFactory>(name:string,callback:FactoryCallbackFunction<unknown[]>)=>void
}

type CallbackFunction<TDependecies extends unknown[],TObject> = (...args: TDependecies) => TObject
type FactoryCallbackFunction<TDependecies extends unknown[]> = (...args: TDependecies) => new (...args: any[]) => any

export type InjectableDependency = {[key:string]: any} | (()=>void)

export type ParentComponent<TComponent> = {
    get:()=>TComponent
}

export type ScopeObject<TScope extends {[key: string]: any}> = TScope 
export type PatchHelper = (blockName?:string) => Promise<null>
export type AppInstance = {
    /**
     * Registers a function that executes when the App is ready
     * @param callback - Function to call after the app is set to ready
     */
    onReady:(callback:()=>unknown)=>void
}

/** An element represented by xblock="@name" */
export type BlockElement=<TElement>(
    elementName: string,
    callbackFunction:(element:StrawberryElement<TElement>)=>unknown
)=>void

/** An HTML element wrapped inside Strawberry-defined object */
/** An HTML element wrapped inside Strawberry-defined object */
export type StrawberryElement<TElement> = {
    constructor:(element:TElement,treeCount:null)=>void
    addClass:(className:string)=>void
    removeClass:(className:string)=>void
    $element: TElement
}

/** 
 * A wrapper to a DOM query function that selects only element with xblock attribute,
 * and name defined by the name of the TBlockElement passed into this function
 */
export type BlockElements<TBlockElement extends BlockElement> = (blockElement:TBlockElement) => void;

export const app:StrawberryApp = {
    component:()=>{},
    service:()=>{},
    factory:()=>{}
}