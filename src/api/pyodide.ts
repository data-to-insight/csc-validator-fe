
import { API, Response } from './'
import { LoadStatus } from '../enums/LoadStatus'

let worker:Worker;

export const api:API = {
    handler: async (endpoint:string, payload:any):Promise<string> => {
       /* await pyodideInst.loadPackage("http://localhost:3000/bin/dist/main-0.0.0-py3-none-any.whl");
        await pyodideInst.runPythonAsync(`from main import ${endpoint}`)

        const val = await pyodideInst.runPythonAsync(`${endpoint}(${JSON.stringify(payload)})`);
        return val.get('val');*/
        worker.postMessage({
            action: 'run',
            body: {
                endpoint,
                payload
            }
        });

        return 'running code...'
    },

    init: async (onResponse:Response) => {
        worker = new Worker(
            new URL('../workers/pyodide.worker.ts', import.meta.url)
        )

        worker.onmessage = (rec:any) => {
            onResponse(rec)
        }

        worker.postMessage({
            action: 'init'
        })


        /*pyodideInst = await window.loadPyodide();
        await pyodideInst.loadPackage("http://localhost:3000/bin/dist/main-0.0.0-py3-none-any.whl");*/
       
        return LoadStatus.READY
    }
}