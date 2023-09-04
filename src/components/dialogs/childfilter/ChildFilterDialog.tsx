import React, { ChangeEvent, Dispatch } from 'react';
import { Box, TextField } from '@mui/material';
import { SelectableTable } from '@sfdl/sf-mui-components';

import {
  ErrorList,
  ReportAction,
  ReportActionType,
} from 'reducers/ReportReducer';
import { FilterHeader, TableWrapper } from './ChildFilterDialog.styles';

interface ChildFilterDialogProps {
  dispatch: Dispatch<ReportAction>;
  filterString?: string;
  allErrors: ErrorList;
  data: any;
}

const ChildFilterDialog = (props: ChildFilterDialogProps) => {
  const { dispatch, filterString, allErrors, data } = props;

  const handleChange = (
    evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    dispatch({
      type: ReportActionType.HIDE_ROWS,
      payload: {
        filter: evt.currentTarget.value,
        selectedError: data.selectedError,
        selectedErrorKey: data.selectedErrorKey,
      },
    });
  };

  const handleErrorValueChange = (value: string, key: string) => {
    dispatch({
      type: ReportActionType.HIDE_ROWS,
      payload: {
        filter: data.filter,
        selectedError: key ? value : undefined,
        selectedErrorKey: key,
      },
    });
  };

  return (
    <Box>
      <FilterHeader>
        <TextField
          value={filterString}
          label='Child ID'
          size='small'
          onChange={handleChange}
        />
      </FilterHeader>

      <TableWrapper>
        <SelectableTable
          rows={Object.values(allErrors)}
          headers={['Code', 'Error', 'Count']}
          onRowSelect={(row: any, key: any) => {
            handleErrorValueChange(row[0] as string, key as string);
          }}
          initiallySelectedRow={props.data.selectedErrorKey}
        />
      </TableWrapper>
    </Box>
  );
};

export default ChildFilterDialog;
