import React, { useState, useEffect, useReducer } from "react";

import { LoadStatus } from "enums/LoadStatus";
import { APIControl, APITransport } from "./api";

import Loader from "./components/loader";
import { Container } from "./components/layout";
import Router from "./Router";

import { reportReducer, ReportActionType } from "reducers/ReportReducer";

interface AppProps {
  apiTransport: APITransport;
  apiConfig?: any;
  apiEndpoint: string;
}

let api: null | APIControl = null;

function App(props: AppProps) {
  const { apiTransport } = props;
  const [ready, setReady] = useState(false);
  const [reportState, reportDispatch] = useReducer(reportReducer, {});

  /**
   * Lifecycle methods
   */

  useEffect(() => {
    const init = async () => {
      console.log("init...");
      api = new APIControl();
      await api.loadTransport(apiTransport, handleAPIResponse);

      reportDispatch({
        type: ReportActionType.UPDATE,
        payload: { value: "hello, world" },
      });
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
    }
  };

  /**
   * Rendering
   */

  console.log(reportState);

  return <Container>{ready ? <Router /> : <Loader />}</Container>;
}

export default App;
