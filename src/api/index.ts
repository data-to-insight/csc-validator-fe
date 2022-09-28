import { FileList } from "components/inputs/uploader/Upload";
import { LoadStatus } from "../enums/LoadStatus";

export enum APITransport {
  PYODIDE = "pyodide",
  WEB = "web",
  STATIC = "static",
}

export type API = {
  handler: (payload: any, config: APIConfig) => Promise<string>;
  init: (onResponse: Response) => Promise<LoadStatus>;
};

export type APIPayload = {
  method: string;
  value: string | FileList;
};

export type Response = (response: any) => void;

export type APIConfig = {
  wheelPath: string;
  endPoint: string;
};

interface IAPIControl {
  api: any;
  loadStatus: LoadStatus;
  loadTransport: (
    apiMethod: APITransport,
    onResponse: Response
  ) => Promise<LoadStatus>;
  callAPI: (payload: any, config: any) => Promise<string>;
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

  callAPI = async (payload: APIPayload, config: APIConfig) => {
    console.log(config);
    const startup = await this.api.api.handler(payload, config);
    return startup;
  };
}
