import React from "react";
import Tabs from "components/tabs";

interface ReportTableProps {
  row: unknown;
}

const ReportTable = (props: ReportTableProps) => {
  const { row } = props;

  return <Tabs headers={[{label: 'Tab 1'}]} bodies={[<span>Tab 1</span>]} id="Report tabs" />
};

export default ReportTable;
