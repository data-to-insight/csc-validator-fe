import React, { Dispatch } from "react";
import { ReportAction } from "reducers/ReportReducer";
import { RouteValue } from "Router";

interface StartPageProps {
  handleRouteChange: (newRoute: RouteValue) => void;
  dispatch: Dispatch<ReportAction>;
  data?: unknown;
}

const Start = (props: StartPageProps) => {
  const { handleRouteChange } = props;

  const handleButtonClick = () => {
    handleRouteChange(RouteValue.LOAD_DATA);
  };

  return (
    <div>
      <button onClick={handleButtonClick}>Next Page</button>
    </div>
  );
};

export default Start;
