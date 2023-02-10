import React, { useEffect } from "react";
import Table from "components/table";
import { Error } from "reducers/ReportReducer";
import validationRules from "data/validation-rules-list.json";

interface ReportTableProps {
  data: any;
  id: string;
  error?: Error | null;
  childErrors?: Error[] | [] | null;
}

const ReportTable = (props: ReportTableProps) => {
  const { data, id, error, childErrors } = props;

  useEffect(() => {
    if (!error) {
      document.querySelector("h5")?.scrollIntoView();
    }
  }, [error]);

  const headers = Object.keys(data);
  const cells = Object.values(data);

  const getLowLights = () => {
    if (!childErrors || childErrors.length < 1) {
      return undefined;
    }

    const output: { [key: string]: any } = {};

    childErrors.forEach((childError) => {
      output[
        `${childError.ROW_ID}_${headers.indexOf(childError.columns_affected)}`
      ] = true;
    });

    return output;
  };

  const getHighlight = () => {
    if (!error) {
      return null;
    }

    return {
      row: error.ROW_ID || 0,
      cell: headers.indexOf(error.columns_affected),
      description:
        validationRules.filter((rule) => {
          return rule.value === error.rule_code.toString();
        })[0].label || "",
    };
  };

  return (
    <Table
      lowlights={getLowLights()}
      highlight={getHighlight()}
      headers={headers}
      rows={[{ cells }]}
      id={id}
    />
  );
};

export default ReportTable;
