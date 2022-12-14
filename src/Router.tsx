import React, { Dispatch, useState } from "react";
import { ReportAction, Report } from "reducers/ReportReducer";
import { FileAction } from "reducers/FileReducer";

import { LoadData, Report as ReportPage } from "pages";
import { Body } from "@sfdl/sf-mui-components";
import { APIControl } from "@sfdl/prpc";

export enum RouteValue {
  LOAD_DATA = "LOAD_DATA",
  REPORT = "REPORT",
}

export interface RouteProps {
  data: Report;
  dispatch: Dispatch<ReportAction>;
  fileState: any;
  fileDispatch: Dispatch<FileAction>;
  api: APIControl;
}

const Router = (props: RouteProps) => {
  const [route, setRoute] = useState(RouteValue.LOAD_DATA);

  const handleRouteChange = (newRoute: RouteValue): void => {
    setRoute(newRoute);
  };

  const pageProps = {
    handleRouteChange,
    ...props,
  };

  const renderRoute = () => {
    if (route === RouteValue.LOAD_DATA) {
      return <LoadData {...pageProps} />;
    }

    if (route === RouteValue.REPORT) {
      return <ReportPage {...pageProps} />;
    }
  };

  return (
    <Body title="CIN Validator" chip="Using: Pyodide (sample) API">
      {renderRoute()}
    </Body>
  );
};

export default Router;
