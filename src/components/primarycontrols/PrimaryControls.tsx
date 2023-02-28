import React from "react";
import { Button } from "@mui/material";

interface PrimaryControlsProps {
  disableButtons?: boolean;
  disableDownload?: boolean;
  disableUserReport?: boolean;
  onClearClick: () => void;
  onValidateClick: () => void;
  onGenerateClick: () => void;
  onReportClick: () => void;
}

const PrimaryControls = (props: PrimaryControlsProps): JSX.Element => {
  const {
    disableButtons,
    disableDownload,
    disableUserReport,
    onClearClick,
    onValidateClick,
    onGenerateClick,
    onReportClick,
  } = props;

  return (
    <>
      <Button
        variant="contained"
        disabled={disableButtons}
        onClick={onValidateClick}
      >
        Validate
      </Button>
      <Button
        disabled={disableButtons}
        variant="contained"
        onClick={onClearClick}
      >
        Clear Data And Start Again
      </Button>
      {/*<Button disabled={disableButtons} variant="contained">
        Download Error Reports
     </Button>*/}
      <Button
        disabled={disableButtons || disableDownload}
        onClick={onGenerateClick}
        variant="contained"
      >
        Download CSVs
      </Button>
      <Button
        disabled={disableButtons || disableUserReport}
        variant="contained"
        onClick={onReportClick}
      >
        Download Report
      </Button>
    </>
  );
};

export default PrimaryControls;
