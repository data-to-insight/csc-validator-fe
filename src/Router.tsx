import React, { useState } from "react";

import { Start, LoadData, Report } from "pages";

export enum RouteValue {
  START = "START",
  LOAD_DATA = "LOAD_DATA",
  REPORT = "REPORT",
}

const Router = () => {
  const [route, setRoute] = useState(RouteValue.START);

  const handleRouteChange = (newRoute: RouteValue): void => {
    setRoute(newRoute);
  };

  const renderRoute = () => {
    if (route === RouteValue.START) {
      return <Start handleRouteChange={handleRouteChange} />;
    }

    if (route === RouteValue.LOAD_DATA) {
      return <LoadData />;
    }

    if (route === RouteValue.REPORT) {
      return <Report />;
    }
  };

  return <div>{renderRoute()}</div>;
};

export default Router;
