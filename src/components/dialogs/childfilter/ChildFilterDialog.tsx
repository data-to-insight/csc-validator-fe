import React, { Dispatch } from 'react';
import { Box } from '@mui/material';
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
  const { dispatch, allErrors, data } = props;

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
      <FilterHeader></FilterHeader>

      <TableWrapper>
        <SelectableTable
          rows={Object.values(allErrors)}
          headers={['Code', 'Error', 'Count']}
          onRowSelect={(row: any, key: any) => {
            console.log(row, key);
            handleErrorValueChange(row[0] as string, key as string);
          }}
          initiallySelectedRow={props.data.selectedErrorKey}
        />
      </TableWrapper>
    </Box>
  );
};

export default ChildFilterDialog;
