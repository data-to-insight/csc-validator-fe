import React, { ChangeEvent, Dispatch } from "react";
import { Box, TextField } from "@mui/material";

import { ReportAction, ReportActionType } from "reducers/ReportReducer";
import { FilterHeader } from "./ChildFilterDialog.styles";

interface ChildFilterDialogProps {
  dispatch: Dispatch<ReportAction>;
  filterString?: string;
}

const ChildFilterDialog = (props: ChildFilterDialogProps) => {
  const { dispatch, filterString = "" } = props;

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
        <TextField
          value={filterString}
          label="Child ID"
          size="small"
          onChange={handleChange}
        />
      </FilterHeader>
    </Box>
  );
};

export default ChildFilterDialog;
