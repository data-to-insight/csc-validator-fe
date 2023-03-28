import React, { useState, useEffect, useReducer } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import queryString from "query-string";

import { IAPI, APITransport, LoadStatus, createApi } from "@sfdl/prpc";

import { Loader, Container, theme as SFTheme } from "@sfdl/sf-mui-components";

import Router from "./Router";
import { GatedProps } from "@sfdl/sf-cookie-gate";

import { reportReducer } from "reducers/ReportReducer";
import { fileReducer, initialData } from "reducers/FileReducer";
import Version from "components/version";

const CINTheme = { ...SFTheme };

CINTheme.components.MuiContainer.styleOverrides.maxWidthLg[
  "&.MuiContainer-maxWidthLg"
].maxWidth = 1600;

const theme = createTheme(CINTheme);

interface AppProps extends GatedProps {
  APIName?: string;
}

let api: IAPI | undefined = undefined;
let initial: boolean = true;

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
          appName: "rpc_main:app",
        },
      };
      if (parsed.url) {
        apiConfig.transport = APITransport.WEB;
        apiConfig.options.url = parsed.url;
      } else {
        apiConfig.transport = APITransport.PYODIDE;
        apiConfig.options.nativePackages = ["numpy", "pandas"];
        apiConfig.options.packages = parsed.packages
          ? parsed.packages
          : [
              process.env.PUBLIC_URL +
                "/bin/dist/cin_validator-0.1.0-py3-none-any.whl",
              "rpc-wrap",
              "fs",
              "plotly",
              "prpc_python",
            ];
      }

      api = await createApi(apiConfig, handleAPIResponse);
    };

    if (initial) {
      initial = false;
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
          <>
            <Router
              data={reportState}
              fileState={fileState}
              dispatch={reportDispatch}
              fileDispatch={fileDispatch}
              api={api}
              APIName={props.APIName}
            />
            <Version
              versionNumber={process.env.REACT_APP_VERSION || ""}
              sourceLink="https://github.com/data-to-insight/cin-validator-fe"
            />
          </>
        ) : (
          <Loader type="cover" label="Loading Python API" />
        )}
      </Container>
    </ThemeProvider>
  );
}

export default App;
