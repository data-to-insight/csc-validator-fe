import React, { ChangeEvent, Dispatch } from "react";
import { Box, TextField } from "@mui/material";

import { ReportAction, ReportActionType } from "reducers/ReportReducer";
import { FilterHeader } from "./ChildFilterDialog.styles";

interface ChildFilterDialogProps {
  dispatch: Dispatch<ReportAction>;
}

const ChildFilterDialog = (props: ChildFilterDialogProps) => {
  const { dispatch } = props;

  const handleChange = (
    evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    dispatch({
      type: ReportActionType.HIDE_ROWS,
      payload: evt.currentTarget.value,
    });
  };

  return (
    <Box>
      <FilterHeader>
        <TextField label="Child ID" size="small" onChange={handleChange} />
      </FilterHeader>
    </Box>
  );
};

export default ChildFilterDialog;
