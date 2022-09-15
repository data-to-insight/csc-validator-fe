import { LoadStatus } from "../enums/LoadStatus"

export enum APIMethod{
    PYODIDE = 'pyodide',
    WEB = 'web',
    STATIC = 'static'
}

export type API = {
    handler: (endpoint: string, payload:any) => Promise<string>
    init: () => Promise<LoadStatus>
}

interface IAPIControl {
    api: any,
    loadStatus: LoadStatus,
    loadMethod: (apiMethod: APIMethod) => Promise<LoadStatus>,
    callAPI: (endpoint:string, payload:any) => Promise<string>
}

export class APIControl implements IAPIControl {
    api:any = null

    constructor() {
        this.api = null
    }

    loadStatus = LoadStatus.IDLE

    loadMethod = async (apiMethod: APIMethod) => {
        this.api = await import(`./${apiMethod}`);
        const apiReady = await this.api.api.init();

        return apiReady;
    }

    getMethod = () => {
        return this.api
    }

    callAPI = async (endpoint:string, payload:any) => {
        const response = await this.api.api.handler(endpoint, payload);
        return response;
    }

}