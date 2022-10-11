import React, { Dispatch, useState } from "react";
import { ReportAction } from "reducers/ReportReducer";
import { FileAction } from "reducers/FileReducer";
import { FileList } from "components/inputs/uploader/Upload";

import { Start, LoadData, Report } from "pages";
import { Body } from "components/layout";
import { APIControl } from "api";

export enum RouteValue {
  START = "START",
  LOAD_DATA = "LOAD_DATA",
  REPORT = "REPORT",
}

interface RouteProps {
  data?: unknown;
  dispatch: Dispatch<ReportAction>;
  fileData: FileList;
  fileDispatch: Dispatch<FileAction>;
  api: APIControl;
}

const Router = (props: RouteProps) => {
  const [route, setRoute] = useState(RouteValue.REPORT);

  const handleRouteChange = (newRoute: RouteValue): void => {
    console.log("route value", newRoute);
    setRoute(newRoute);
  };

  const pageProps = {
    handleRouteChange,
    ...props,
  };

  const renderRoute = () => {
    if (route === RouteValue.START) {
      return <Start {...pageProps} />;
    }

    if (route === RouteValue.LOAD_DATA) {
      return <LoadData {...pageProps} />;
    }

    if (route === RouteValue.REPORT) {
      return <Report {...pageProps} />;
    }
  };

  return <Body>{renderRoute()}</Body>;
};

export default Router;
