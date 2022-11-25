import React, { Dispatch, useState } from "react";
import { ReportAction, ReportErrors } from "reducers/ReportReducer";
import { FileAction } from "reducers/FileReducer";
import { FileList } from "components/inputs/uploader/Upload";

import { LoadData, Report } from "pages";
import { Body } from "components/layout";
import { APIControl } from "@sfdl/prpc";

export enum RouteValue {
  LOAD_DATA = "LOAD_DATA",
  REPORT = "REPORT",
}

export interface RouteProps {
  data: ReportErrors;
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
      return <Report {...pageProps} />;
    }
  };

  return <Body>{renderRoute()}</Body>;
};

export default Router;
