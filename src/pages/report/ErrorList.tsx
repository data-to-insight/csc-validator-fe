import React from 'react';
import { Error } from 'reducers/ReportReducer';
import Table from 'components/table';

interface ErrorListProps {
  errorList: Error[];
  errorSelectedHandler: (error: Error | null) => void;
  childId: string;
}

const ErrorList = ({
  errorList,
  errorSelectedHandler,
  childId,
}: ErrorListProps) => {
  const handleErrorSelected = (error: Error) => {
    if (error) {
      errorSelectedHandler(error);
    }
  };

  return (
    <Table
      selectable={true}
      selectedHandler={handleErrorSelected}
      headers={['Rule Code', 'Rule Description']}
      rows={errorList.map((errorItem) => {
        return {
          cells: [errorItem.rule_code, errorItem.rule_description],
          raw: errorItem as any,
        };
      })}
      id={`error-table-${childId}`}
    />
  );
};

export default ErrorList;
