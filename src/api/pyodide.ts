import { API, APIPayload, Response } from "./";
import { LoadStatus } from "../enums/LoadStatus";
import { PyodideWorkerAction } from "enums/WorkerActions";

export type PyodideWorkerDTO = {
  action: PyodideWorkerAction;
  body?: any;
};

let worker: Worker;

export const api: API = {
  handler: async (
    endpoint: string,
    payload: APIPayload,
    config?: any
  ): Promise<string> => {
    const message: PyodideWorkerDTO = {
      action: PyodideWorkerAction.RUN,
      body: {
        endpoint,
        payload,
        config: config || {},
      },
    };

    worker.postMessage(message);

    return "running code...";
  },

  init: async (onResponse: Response) => {
    worker = new Worker(
      new URL("../workers/pyodide.worker.ts", import.meta.url)
    );

    worker.onmessage = (rec: any) => {
      onResponse(rec);
    };

    const message: PyodideWorkerDTO = {
      action: PyodideWorkerAction.INIT,
    };

    worker.postMessage(message);

    return LoadStatus.READY;
  },
};
