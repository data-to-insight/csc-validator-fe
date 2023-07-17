import React, { useState, useEffect } from 'react';
import { Error, ValidationRule } from 'reducers/ReportReducer';

import DraggablePanes from 'components/draggable-panes';

import { pascalToReadable } from 'utils/strings/fomatters';

import { Block } from '@sfdl/sf-mui-components';

import ReportTable from './ReportTable';
import ErrorList from './ErrorList';
import { Typography } from '@mui/material';

interface ReportDetailProps {
  childItem: any;
  childId: string;
  validationRules: ValidationRule[];
}

const ReportDetail = (props: ReportDetailProps) => {
  const { childItem, childId, validationRules } = props;
  const skipRendering = ['errors', 'hide', 'id', 'errorList'];

  const [selectedError, setSelectedError] = useState<Error | null>(null);

  useEffect(() => {
    setSelectedError(null);
  }, [childId]);

  /*
  This function converts an absolute row ID from the table in the data to an offset row id for the table slices in the UI
  It is necessary because the rendering of an errored table will also start from a new 0-index but the row id in the error will
  be relative to the rows position in the original table
  It works because the tables are iterated in order so the row id will continue to be relative to its original position in the table - 
  we just the row ids in ascending order and then convert that to a 0-index.
  */
  const getRelativeRowId = (error: Error) => {
    const errKey = `${error?.rule_code} ${error?.tables_affected}`;
    const rows: number[] = [];

    //dedupe the row ids. We only need one of each for this to work
    Object.keys(childItem.errors).forEach((key) => {
      if (key.indexOf(errKey) > -1) {
        if (rows.indexOf(childItem.errors[key]) < 0) {
          rows.push(childItem.errors[key].row_id);
        }
      }
    });

    // now sort ascending and read off the keys as indexes
    rows.sort((a, b) => a - b);
    const output = rows.indexOf(error.row_id);

    return output > -1 ? output : 0;
  };

  const handleSelectError = (error: Error | null) => {
    const relativeRow = error ? getRelativeRowId(error) : 0;

    setSelectedError({ ...error, row_id: relativeRow } as Error);
  };

  const renderTables = () => {
    if (childItem) {
      type ChildErrorTable = {
        [key: string]: any;
      };

      const childErrorsByTable: ChildErrorTable = {};

      Object.values(childItem.errors).forEach((childError: any) => {
        if (!childErrorsByTable[childError.tables_affected.toLowerCase()]) {
          childErrorsByTable[childError.tables_affected.toLowerCase()] = [];
        }

        const relativeRowId = getRelativeRowId(childError);

        childErrorsByTable[childError.tables_affected.toLowerCase()].push({
          ...childError,
          row_id: relativeRowId,
        });
      });

      return Object.keys(childItem).map((key) => {
        if (skipRendering.indexOf(key) > -1) {
          return null;
        }

        return (
          <Block spacing='blockExtraLarge' key={`table-${key}`}>
            <Typography variant='body1'>
              <strong>{pascalToReadable(key)}</strong>
            </Typography>
            <ReportTable
              validationRules={validationRules}
              childErrors={childErrorsByTable[key.toLowerCase()] || null}
              error={
                selectedError &&
                selectedError.tables_affected.toLowerCase() ===
                  key.toLowerCase()
                  ? selectedError
                  : null
              }
              data={childItem[key]}
              id={key}
              key={key}
            />
          </Block>
        );
      });
    }

    return null;
  };

  return (
    <>
      <DraggablePanes
        topContent={
          <Block spacing='blockLarge'>
            <Block spacing='blockLarge'>
              <Typography variant='h5'>Child ID: {childId}</Typography>
            </Block>
            {renderTables()}
          </Block>
        }
        bottomContent={
          <>
            <br />
            <br />
            <Typography variant='h5'>Errors</Typography>
            {childItem.errors ? (
              <ErrorList
                errorSelectedHandler={handleSelectError}
                errorList={Object.values(childItem.errors)}
                childId={childId}
              />
            ) : (
              <Typography variant='body1'>
                No errors found for this entry
              </Typography>
            )}
          </>
        }
      />
    </>
  );
};

export default ReportDetail;
