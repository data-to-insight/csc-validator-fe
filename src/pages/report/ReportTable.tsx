import React from "react";
import Table from "components/table";
import { Error } from "reducers/ReportReducer";
import validationRules from "data/validation-rules-list.json";

interface ReportTableProps {
  data: any;
  id: string;
  error?: Error | null;
}

const ReportTable = (props: ReportTableProps) => {
  const { data, id, error } = props;

  const headers = Object.keys(data);
  const cells = Object.values(data);

  const getHighlight = () => {
    if (!error) {
      return null;
    }

    return {
      row: 0,
      cell: headers.indexOf(error.columns_affected),
      description:
        validationRules.filter((rule) => {
          console.log(rule);
          return rule.value === error.rule_code.toString();
        })[0].label || "",
    };
  };

  return (
    <Table
      highlight={getHighlight()}
      headers={headers}
      rows={[{ cells }]}
      id={id}
    />
  );
};

export default ReportTable;
