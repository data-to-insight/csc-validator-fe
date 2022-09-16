import { LoadStatus } from "../enums/LoadStatus";

export enum APITransport {
  PYODIDE = "pyodide",
  WEB = "web",
  STATIC = "static",
}

export type API = {
  handler: (endpoint: string, payload: any) => Promise<string>;
  init: (onResponse: Response) => Promise<LoadStatus>;
};

export type APIPayload = {
  method: string;
  value: string;
};

export type Response = (response: any) => void;

interface IAPIControl {
  api: any;
  loadStatus: LoadStatus;
  loadTransport: (
    apiMethod: APITransport,
    onResponse: Response
  ) => Promise<LoadStatus>;
  callAPI: (endpoint: string, payload: any, config: any) => Promise<string>;
}

export class APIControl implements IAPIControl {
  api: any = null;

  constructor() {
    this.api = null;
  }

  loadStatus = LoadStatus.IDLE;

  loadTransport = async (apiTransport: APITransport, onResponse: Response) => {
    this.api = await import(`./${apiTransport}`);
    const apiReady = await this.api.api.init(onResponse);

    return apiReady;
  };

  getMethod = () => {
    return this.api;
  };

  callAPI = async (endpoint: string, payload: APIPayload, config: any) => {
    const startup = await this.api.api.handler(endpoint, payload, config);
    return startup;
  };
}
