import {PyodideInterface} from 'pyodide';
importScripts("https://cdn.jsdelivr.net/pyodide/v0.21.2/full/pyodide.js");

let pyodideInst:PyodideInterface;

const initializePyodide = async () => {
    //eslint-disable-next-line no-restricted-globals
    pyodideInst = await self.loadPyodide();
}

const runPyodideCode = async (endpoint:string, payload: any) => {
    //eslint-disable-next-line no-restricted-globals
    await pyodideInst.loadPackage("http://localhost:3000/bin/dist/main-0.0.0-py3-none-any.whl");
    await pyodideInst.runPythonAsync(`from main import ${endpoint}`)

    const val = await pyodideInst.runPythonAsync(`${endpoint}(${JSON.stringify(payload)})`);
    //eslint-disable-next-line no-restricted-globals
    self.postMessage(val.get('val'));
}

onmessage = async (evt:any) => {
    console.log(evt);
    if(evt.data.action === 'init') {
        initializePyodide();
    }   

    if(evt.data.action === 'run') {
        const {endpoint, payload} = evt.data.body;
        runPyodideCode(endpoint, payload);
    }
}

export {};