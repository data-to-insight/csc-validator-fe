import React, { useState, useEffect, useReducer, createContext } from "react";

import { LoadStatus } from "enums/LoadStatus";
import { APIControl, APITransport, APIConfig } from "./api";

import Loader from "./components/loader";
import { Container } from "./components/layout";
import Router from "./Router";

import { reportReducer, ReportActionType } from "reducers/ReportReducer";
import { fileReducer } from "reducers/FileReducer";

interface AppProps {
  apiTransport: APITransport;
  apiConfig: APIConfig;
}

let api: null | APIControl = null;

export const APIConfigContext = createContext<APIConfig | null>(null);

function App(props: AppProps) {
  const { apiTransport, apiConfig } = props;
  const [ready, setReady] = useState(false);
  const [reportState, reportDispatch] = useReducer(reportReducer, {});
  const [fileState, fileDispatch] = useReducer(fileReducer, {});

  /**
   * Lifecycle methods
   */

  useEffect(() => {
    const init = async () => {
      api = new APIControl();
      await api.loadTransport(apiTransport, handleAPIResponse);
    };

    if (!api) {
      init();
    }
  }, [apiTransport]);

  /**
   * Handlers
   */

  const handleAPIResponse = (data: any) => {
    if (data.data === LoadStatus.READY) {
      setReady(true);
    } else {
      reportDispatch({
        type: ReportActionType.UPDATE,
        payload: data.data,
      });
    }
  };

  /**
   * Rendering
   */

  console.log(reportState);

  return (
    <APIConfigContext.Provider value={apiConfig}>
      <Container>
        {ready && api ? (
          <Router
            data={reportState}
            fileData={fileState}
            dispatch={reportDispatch}
            fileDispatch={fileDispatch}
            api={api}
          />
        ) : (
          <Loader />
        )}
      </Container>
    </APIConfigContext.Provider>
  );
}

export default App;
