import { LoadStatus } from "enums/LoadStatus";
import React, { useState, useEffect } from "react";
import { APIControl, APITransport } from "./api";

import Loader from "./components/loader";
import Router from "./Router";

interface AppProps {
  apiTransport: APITransport;
  apiConfig?: any;
  apiEndpoint: string;
}

let api: null | APIControl = null;

function App(props: AppProps) {
  const { apiTransport } = props;
  const [ready, setReady] = useState(false);

  /**
   * Lifecycle methods
   */

  useEffect(() => {
    const init = async () => {
      console.log("init...");
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
    }
  };

  /**
   * Rendering
   */

  return <div>{ready ? <Router /> : <Loader />}</div>;
}

export default App;
