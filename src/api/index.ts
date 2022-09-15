import { LoadStatus } from "../enums/LoadStatus"

export enum APIMethod{
    PYODIDE = 'pyodide',
    WEB = 'web',
    STATIC = 'static'
}

export type API = {
    handler: (endpoint: string, payload:any) => Promise<string>
    init: (onResponse:Response) => Promise<LoadStatus>
}

export type Response = (response:any) => void

interface IAPIControl {
    api: any,
    loadStatus: LoadStatus,
    loadMethod: (apiMethod: APIMethod, onResponse:Response) => Promise<LoadStatus>,
    callAPI: (endpoint:string, payload:any) => Promise<string>
}

export class APIControl implements IAPIControl {
    api:any = null

    constructor() {
        this.api = null
    }

    loadStatus = LoadStatus.IDLE

    loadMethod = async (apiMethod: APIMethod, onResponse:Response) => {
        this.api = await import(`./${apiMethod}`);
        const apiReady = await this.api.api.init(onResponse);

        return apiReady;
    }

    getMethod = () => {
        return this.api
    }

    callAPI = async (endpoint:string, payload:any) => {
        const startup = await this.api.api.handler(endpoint, payload);
        return startup;
    }

}