import { LoadStatus } from "enums/LoadStatus";
import React, { useState, useEffect, ChangeEvent } from "react";
import { APIControl, APITransport } from "./api";
import { APIMethods } from "enums/APIMethods";
import TestForm from "./components/TestForm";

interface AppProps {
  apiTransport: APITransport;
  apiConfig?: any;
  apiEndpoint: string;
}

let api: null | APIControl = null;

function App(props: AppProps) {
  const { apiTransport, apiConfig, apiEndpoint } = props;
  const [ready, setReady] = useState(false);
  const [data, setData] = useState(null);

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
    } else {
      setData(data.data);
    }
  };

  const handleClick = async () => {
    await api?.callAPI(
      apiEndpoint,
      {
        value: "hello, world",
        method: APIMethods.PROCESS_ONE,
      },
      apiConfig
    );
  };

  const handleUpload = async (evt: ChangeEvent<HTMLInputElement>) => {
    if (evt.target.files && evt.target.files.length > 0) {
      const file = evt.target.files[0];

      await api?.callAPI(
        apiEndpoint,
        {
          method: APIMethods.UPLOAD,
          value: file,
        },
        apiConfig
      );
    }
  };

  /**
   * Rendering
   */

  return (
    <div>
      {data && <p>{data}</p>}
      {ready ? (
        <TestForm onClick={handleClick} onUpload={handleUpload} />
      ) : (
        <span>loading API transport ({apiTransport})...</span>
      )}
    </div>
  );
}

export default App;
