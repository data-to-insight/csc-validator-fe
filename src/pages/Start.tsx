import React from "react";
import { RouteValue } from "Router";

interface StartPageProps {
  handleRouteChange: (newRoute: RouteValue) => void;
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
