/* eslint-disable no-restricted-globals */
// need this because workers need access to the self pseudo-global scope

import { PyodideInterface } from "pyodide";
import { PyodideWorkerAction } from "../enums/WorkerActions";
import { LoadStatus } from "../enums/LoadStatus";

if (typeof importScripts === "function") {
  importScripts("https://cdn.jsdelivr.net/pyodide/v0.21.2/full/pyodide.js");
}

let pyodideInst: PyodideInterface;

const initializePyodide = async () => {
  pyodideInst = await self.loadPyodide();
  self.postMessage(LoadStatus.READY);
};

const runPyodideCode = async (endpoint: string, payload: any) => {
  await pyodideInst.loadPackage(
    "http://localhost:3000/bin/dist/main-0.0.0-py3-none-any.whl"
  );
  await pyodideInst.runPythonAsync(`from main import ${endpoint}`);

  const val = await pyodideInst.runPythonAsync(
    `${endpoint}(${JSON.stringify(payload)})`
  );
  self.postMessage(val.get("val"));
};

onmessage = async (evt: any) => {
  if (evt.data.action === PyodideWorkerAction.INIT) {
    initializePyodide();
  }

  if (evt.data.action === PyodideWorkerAction.RUN) {
    const { endpoint, payload } = evt.data.body;
    runPyodideCode(endpoint, payload);
  }
};

export {};
