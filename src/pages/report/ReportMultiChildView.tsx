import React from 'react';
import Table from 'components/table';
import { Typography } from '@mui/material';

interface ReportMultiChildViewProps {
  rows: any;
}

const ReportMultiChildView = (props: ReportMultiChildViewProps) => {
  return (
    <>
      <Typography variant='h5'>LA-level and Header issues</Typography>
      <Table
        id='LAWideErrors'
        rows={props.rows.map((row: any) => {
          return { cells: Object.values(row), raw: '' };
        })}
        headers={['Error ID', 'Error Description']}
      />
    </>
  );
};

export default ReportMultiChildView;
