import React, { Dispatch } from "react";

import Uploader from "components/inputs/uploader";
import { FileList } from "components/inputs/uploader/Upload";
import { ReportAction } from "reducers/ReportReducer";
import { RouteValue } from "Router";
import { FileAction, FileActionType } from "reducers/FileReducer";
import { Box, Grid } from "@mui/material";

interface LoadDataPageProps {
  handleRouteChange: (newRoute: RouteValue) => void;
  dispatch: Dispatch<ReportAction>;
  data?: unknown;
  fileDispatch: Dispatch<FileAction>;
  fileData: FileList;
}

const LoadData = (props: LoadDataPageProps) => {
  const { handleRouteChange, fileData, fileDispatch } = props;

  const handleButtonClick = () => {
    handleRouteChange(RouteValue.REPORT);
  };

  const onUploadReady = (files: FileList) => {
    fileDispatch({ type: FileActionType.SET_FILES, payload: files });
  };

  const renderNextButton = () => {
    if (Object.keys(fileData).length > 0) {
      return <button onClick={handleButtonClick}>Process files</button>;
    }

    return null;
  };

  return (
    <div>
      <Box flexGrow={1}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Uploader onUploadReady={onUploadReady} />
          </Grid>
          <Grid item xs={6}>
            {renderNextButton()}
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default LoadData;
