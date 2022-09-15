import { useState, useEffect } from "react";
import { APIControl, APIMethod } from "./api";

interface AppProps {
  apiMethod: APIMethod;
}

let api: null | APIControl = null;

function App(props: AppProps) {
  const { apiMethod } = props;
  const [ready, setReady] = useState(false);
  const [data, setData] = useState(null);

  /**
   * Lifecycle methods
   */

  useEffect(() => {
    const init = async () => {
      console.log("init...");
      api = new APIControl();
      await api.loadMethod(apiMethod, handleAPIResponse);

      setReady(true);
    };

    if (!api) {
      init();
    }
  }, [apiMethod]);

  /**
   * Handlers
   */

  const handleAPIResponse = (data: any) => {
    setData(data.data);
  };

  const handleClick = async () => {
    const response = await api?.callAPI("endpoint", {
      val: "hello, world",
      resource: "PROCESS_ONE",
    });
    console.log(response);
  };

  /**
   * Rendering
   */

  return (
    <div>
      {data && <p>{data}</p>}
      {ready && <button onClick={handleClick}>Call API</button>}
    </div>
  );
}

export default App;
