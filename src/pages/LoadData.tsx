import React, { Dispatch } from "react";

import Uploader from "components/inputs/uploader";
import { FileList } from "components/inputs/uploader/Upload";
import { ReportAction } from "reducers/ReportReducer";
import { RouteValue } from "Router";
import { FileAction, FileActionType } from "reducers/FileReducer";

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
      <Uploader onUploadReady={onUploadReady} />
      {renderNextButton()}
    </div>
  );
};

export default LoadData;
