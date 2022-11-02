import React, { useState, useEffect, useReducer, createContext } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { LoadStatus } from "enums/LoadStatus";
import { APIControl, APITransport, APIConfig } from "./api";

import Loader from "./components/loader";
import { Container } from "./components/layout";
import Router from "./Router";
import { GatedProps } from "@sfdl/sf-cookie-gate";

import { reportReducer } from "reducers/ReportReducer";
import { fileReducer } from "reducers/FileReducer";

import { theme as SFTheme } from "./theme/theme";

const theme = createTheme(SFTheme);

interface AppProps extends GatedProps {
  apiTransport: APITransport;
  apiConfig: APIConfig;
}

type DataResponse = {
  data: LoadStatus | unknown;
};

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

  const handleAPIResponse = (data: DataResponse) => {
    if (data.data === LoadStatus.READY) {
      setReady(true);
    }
  };

  /**
   * Rendering
   */

  return (
    <APIConfigContext.Provider value={apiConfig}>
      <ThemeProvider theme={theme}>
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
            <Loader type="cover" />
          )}
        </Container>
      </ThemeProvider>
    </APIConfigContext.Provider>
  );
}

export default App;
