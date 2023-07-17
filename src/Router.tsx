import React, { Dispatch, useState } from 'react';
import { ReportAction, Report } from 'reducers/ReportReducer';
import { FileAction } from 'reducers/FileReducer';

import { LoadData, Report as ReportPage } from 'pages';
import { Body } from '@sfdl/sf-mui-components';
import { IAPI } from '@sfdl/prpc';

export enum RouteValue {
  LOAD_DATA = 'LOAD_DATA',
  REPORT = 'REPORT',
}

export enum Tool {
  Tool903 = 'Tool903',
  ToolCIN = 'ToolCIN',
}

export interface RouteProps {
  data: Report;
  dispatch: Dispatch<ReportAction>;
  fileState: any;
  fileDispatch: Dispatch<FileAction>;
  api: IAPI;
  APIName?: string;
  tool: Tool;
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

  const renderTitle = () => {
    return `${props.tool === Tool.Tool903 ? '903' : 'CIN'} Validator`;
  };

  return (
    <Body title={renderTitle()} chip={props.APIName || 'Sample'}>
      {renderRoute()}
    </Body>
  );
};

export default Router;
