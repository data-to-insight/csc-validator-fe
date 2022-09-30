import { APIControl } from "api";
import { FileList } from "components/inputs/uploader/Upload";
import React, { Dispatch, useEffect, useContext } from "react";
import { ReportAction } from "reducers/ReportReducer";
import { RouteValue } from "Router";
import { APIConfigContext } from "App";
import { Box, Grid } from "@mui/material";

interface ReportPageProps {
  handleRouteChange: (newRoute: RouteValue) => void;
  dispatch: Dispatch<ReportAction>;
  fileData: FileList;
  data?: unknown;
  api: APIControl;
}

const Report = (props: ReportPageProps) => {
  const apiConfig = useContext(APIConfigContext);
  const { handleRouteChange, api, data } = props;

  useEffect(() => {
    if (apiConfig && Object.values(data as Object).length < 1) {
      api.callAPI(
        {
          method: "UPLOAD",
          value: props.fileData,
        },
        apiConfig
      );
    }
  }, []);

  const handleButtonClick = () => {
    handleRouteChange(RouteValue.START);
  };

  return (
    <Box flexGrow={1}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <button onClick={handleButtonClick}>Next Page</button>
        </Grid>
        <Grid item xs={6}>
          This is the report page
        </Grid>
      </Grid>
    </Box>
  );
};

export default Report;
