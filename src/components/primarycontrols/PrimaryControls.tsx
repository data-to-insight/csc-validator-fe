import React from "react";
import { Button } from "@mui/material";

interface PrimaryControlsProps {
  disableButtons?: boolean;
  onClearClick: () => void;
  onValidateClick: () => void;
  onGenerateClick: () => void;
}

const PrimaryControls = (props: PrimaryControlsProps): JSX.Element => {
  const { disableButtons, onClearClick, onValidateClick, onGenerateClick } =
    props;

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
        disabled={disableButtons}
        onClick={onGenerateClick}
        variant="contained"
      >
        Download CSVs
      </Button>
    </>
  );
};

export default PrimaryControls;
