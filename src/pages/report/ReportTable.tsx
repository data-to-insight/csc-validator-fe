import React from "react";
import Table from "components/table";

interface ReportTableProps {
  data: any;
  id: string;
}

const ReportTable = (props: ReportTableProps) => {
  const { data, id } = props;

  const headers = Object.keys(data);
  const cells = Object.values(data);

  return <Table headers={headers} rows={[{ cells }]} id={id} />;
};

export default ReportTable;
