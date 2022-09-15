import "https://cdn.jsdelivr.net/pyodide/v0.21.2/full/pyodide.js";
import { API } from './'
import { LoadStatus } from '../enums/LoadStatus'
import {PyodideInterface} from 'pyodide';


let pyodideInst:PyodideInterface;

export const api:API = {
    handler: async (endpoint:string, payload:any):Promise<string> => {
        await pyodideInst.loadPackage("http://localhost:3000/bin/dist/main-0.0.0-py3-none-any.whl");
        await pyodideInst.runPythonAsync(`from main import ${endpoint}`)

        const val = await pyodideInst.runPythonAsync(`${endpoint}(${JSON.stringify(payload)})`);
        return val.get('val');
    },

    init: async () => {
        pyodideInst = await window.loadPyodide();
        await pyodideInst.loadPackage("http://localhost:3000/bin/dist/main-0.0.0-py3-none-any.whl");
       
        return LoadStatus.READY
    }
}