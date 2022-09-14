import { LoadStatus } from "../enums/LoadStatus"

export enum APIMethod{
    PYODIDE = 'pyodide',
    WEB = 'web',
    STATIC = 'static'
}

export type API = {
    handler: (cmd:any) => Promise<string>
    init: () => Promise<LoadStatus>
}

interface IAPIControl {
    api: any,
    loadStatus: LoadStatus,
    loadMethod: (apiMethod: APIMethod) => Promise<LoadStatus>,
    callAPI: (comd: string) => Promise<string>
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

    callAPI = async (cmd: string) => {
        const response = await this.api.api.handler(cmd);
        return response;
    }

}