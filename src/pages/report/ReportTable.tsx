import React, { useEffect } from 'react';
import Table from 'components/table';
import { Error, ValidationRule } from 'reducers/ReportReducer';

interface ReportTableProps {
  data: any;
  id: string;
  error?: Error | null;
  childErrors?: Error[] | [] | null;
  validationRules: ValidationRule[];
}

const ReportTable = (props: ReportTableProps) => {
  const { data, id, error, childErrors, validationRules } = props;

  useEffect(() => {
    if (!error) {
      document.querySelector('h5')?.scrollIntoView();
    }
  }, [error]);

  const headers = Object.keys(data[0]);
  const cells = data.map((row: any) => {
    return { cells: Object.values(row) };
  });

  const getLowLights = () => {
    if (!childErrors || childErrors.length < 1) {
      return undefined;
    }

    const output: { [key: string]: any } = {};

    childErrors.forEach((childError) => {
      output[
        `${childError.row_id}_${headers.indexOf(childError.columns_affected)}`
      ] = true;
    });

    return output;
  };

  const getHighlight = () => {
    if (!error) {
      return null;
    }

    const matchingRules = validationRules.filter((rule) => {
      return rule.value === error.rule_code.toString();
    });

    return {
      row: error.row_id,
      cell: headers.indexOf(error.columns_affected),
      description:
        matchingRules.length > 0 && matchingRules[0].label
          ? matchingRules[0].label
          : '',
    };
  };

  return (
    <Table
      lowlights={getLowLights()}
      highlight={getHighlight()}
      headers={headers}
      rows={cells}
      id={id}
    />
  );
};

export default ReportTable;
