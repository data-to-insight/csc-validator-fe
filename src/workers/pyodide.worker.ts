/* eslint-disable no-restricted-globals */
// need this because workers need access to the self pseudo-global scope

import { PyodideInterface } from "pyodide";
import { PyodideWorkerAction } from "../enums/WorkerActions";
import { LoadStatus } from "../enums/LoadStatus";

//importScripts is a global. Only run it if it is available (ignore if the module is loaded onto window)
if (typeof importScripts === "function") {
  importScripts("https://cdn.jsdelivr.net/pyodide/v0.21.2/full/pyodide.js");
}

let pyodideInst: PyodideInterface;

const initializePyodide = async () => {
  pyodideInst = await self.loadPyodide();
  self.postMessage(LoadStatus.READY);
};

const runPyodideCode = async (endpoint: string, payload: any, config: any) => {
  await pyodideInst.loadPackage(config.wheelPath);
  await pyodideInst.runPythonAsync(`from main import ${endpoint}`);

  if (payload.method === "UPLOAD") {
    const fileReader = new FileReader();
    fileReader.onload = async () => {
      const withRaw = { ...payload };
      withRaw.value = fileReader.result;

      const val = await pyodideInst.runPythonAsync(
        `${endpoint}(${JSON.stringify(withRaw)})`
      );
      self.postMessage(val.get("val"));
    };

    fileReader.readAsText(payload.value);

    return;
  }

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
    const { endpoint, payload, config } = evt.data.body;
    runPyodideCode(endpoint, payload, config);
  }
};

export {};
