import {API} from './'
import { LoadStatus } from '../enums/LoadStatus'

export const api:API = {
    handler: async (cmd:any):Promise<string> => {
        return 'called the Pyodide API'
    },

    init: async () => {
        return LoadStatus.READY
    }
}