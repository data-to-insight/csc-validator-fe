import React from 'react';

import { Block } from '@sfdl/sf-mui-components';

import { Typography } from '@mui/material';

import Table from 'components/table';

type LAWideErrorProps = {
  errors: any[];
};

const ReportLAWide = (props: LAWideErrorProps) => {
  const { errors } = props;

  return (
    <Block spacing='blockLarge'>
      <Block spacing='blockLarge'>
        <Typography variant='h5'>LA Wide Errors</Typography>
      </Block>

      {(!errors || errors.length) < 1 ? (
        <p>No LA Wide Errors</p>
      ) : (
        <Table
          headers={['Rule Code', 'Description']}
          id='la-wide-errors'
          rows={errors.map((errorItem) => {
            return {
              cells: [errorItem.rule_code, errorItem.rule_description],
            };
          })}
        />
      )}
    </Block>
  );
};

export default ReportLAWide;
