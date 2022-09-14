import { useState, useEffect } from "react";
import { APIControl, APIMethod } from "./api";

interface AppProps {
  apiMethod: APIMethod;
}

let api: null | APIControl = null;

function App(props: AppProps) {
  const { apiMethod } = props;
  const [ready, setReady] = useState(false);

  /**
   * Lifecycle methods
   */

  useEffect(() => {
    const init = async () => {
      console.log("init...");
      api = new APIControl();
      await api.loadMethod(apiMethod);

      setReady(true);
    };

    if (!api) {
      init();
    }
  }, [apiMethod]);

  /**
   * Handlers
   */

  const handleClick = async () => {
    const response = await api?.callAPI("hello world");
    console.log(response);
  };

  /**
   * Rendering
   */

  return <div>{ready && <button onClick={handleClick}>Call API</button>}</div>;
}

export default App;
