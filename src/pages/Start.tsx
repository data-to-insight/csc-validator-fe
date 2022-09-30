import React, { Dispatch } from "react";
import { ReportAction } from "reducers/ReportReducer";
import { RouteValue } from "Router";
import { Box, Grid } from "@mui/material";

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
    <Box flexGrow={1}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <button onClick={handleButtonClick}>Next Page</button>
        </Grid>
        <Grid item xs={6}>
          This is the start page
        </Grid>
      </Grid>
    </Box>
  );
};

export default Start;
