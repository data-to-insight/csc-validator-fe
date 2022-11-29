import React, { useState, useEffect, useReducer } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import queryString from "query-string";

import { APIControl, APITransport, LoadStatus } from "@sfdl/prpc";

import { Loader, Container, theme as SFTheme } from "@sfdl/sf-mui-components";

import Router from "./Router";
import { GatedProps } from "@sfdl/sf-cookie-gate";

import { reportReducer } from "reducers/ReportReducer";
import { fileReducer, initialData } from "reducers/FileReducer";

const theme = createTheme(SFTheme);

interface AppProps extends GatedProps {}

let api: null | APIControl = null;

function App(props: AppProps) {
  const [ready, setReady] = useState(false);

  const [reportState, reportDispatch] = useReducer(reportReducer, {});
  const [fileState, fileDispatch] = useReducer(fileReducer, { ...initialData });

  /**
   * Lifecycle methods
   */

  useEffect(() => {
    const init = async () => {
      const parsed = queryString.parse(window.location.search);
      const apiConfig: any = {
        options: {
          appName: "sfdl-sample-pyodide.rpc:app",
        },
      };
      if (parsed.url) {
        apiConfig.transport = APITransport.WEB;
        apiConfig.options.url = parsed.url;
      } else {
        apiConfig.transport = APITransport.STATIC;
        apiConfig.options.nativePackages = ["numpy", "pandas"];
        apiConfig.options.packages = parsed.packages
          ? parsed.packages
          : [
              process.env.PUBLIC_URL + "/bin/dist/main-0.0.0-py3-none-any.whl",
              "rpc-wrap",
              "plotly",
            ];
      }
      api = new APIControl();
      console.log("API Config", apiConfig);
      await api.loadTransport(apiConfig, handleAPIResponse);
    };

    if (!api) {
      init();
    }
  }, []);

  /**
   * Handlers
   */

  const handleAPIResponse = (data: any) => {
    if (data?.error) {
      console.error("Failed to initialise API", data.error);
      alert("Failed to load pyodide");
    } else if (data === LoadStatus.READY) {
      setReady(true);
    } else {
      console.log("Unknown API response", data);
    }
  };

  /**
   * Rendering
   */

  return (
    <ThemeProvider theme={theme}>
      <Container>
        {ready && api ? (
          <Router
            data={reportState}
            fileState={fileState}
            dispatch={reportDispatch}
            fileDispatch={fileDispatch}
            api={api}
          />
        ) : (
          <Loader type="cover" />
        )}
      </Container>
    </ThemeProvider>
  );
}

export default App;
