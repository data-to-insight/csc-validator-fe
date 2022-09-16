import { LoadStatus } from "enums/LoadStatus";
import { useState, useEffect } from "react";
import { APIControl, APITransport } from "./api";

interface AppProps {
  apiTransport: APITransport;
  apiConfig?: any;
}

let api: null | APIControl = null;

function App(props: AppProps) {
  const { apiTransport, apiConfig } = props;
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
      "endpoint",
      {
        value: "hello, world",
        method: "PROCESS_ONE",
      },
      apiConfig
    );
  };

  /**
   * Rendering
   */

  return (
    <div>
      {data && <p>{data}</p>}
      {ready ? (
        <button onClick={handleClick}>Call API</button>
      ) : (
        <span>loading API transport ({apiTransport})...</span>
      )}
    </div>
  );
}

export default App;
