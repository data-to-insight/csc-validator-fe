import React from "react";
import Table from "components/table";
import { Error } from "reducers/ReportReducer";

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
