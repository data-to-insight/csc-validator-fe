import React from "react";
import { ReportEntry, ReportItem } from "reducers/ReportReducer";

import Table from "components/table";
import { Tabs } from "@sfdl/sf-mui-components";

interface ReportDetailProps {
  data: ReportEntry;
}

const ReportDetail = (props: ReportDetailProps) => {
  const { data } = props;

  const headers = Object.keys(data.entries).map((header) => {
    return { label: header };
  });

  const renderTabBodies = () => {
    const output = Object.values(data.entries).map((item: ReportItem) => {
      const headers = Object.keys(item).reverse();
      const rows = [
        {
          cells: headers.map((header) => {
            return item[header];
          }),
        },
      ];

      return <Table headers={headers} rows={rows} id={`table-${data.code}`} />;
    });

    return output;
  };

  return (
    <Tabs
      headers={headers}
      bodies={renderTabBodies()}
      id={`report-entries-${data.code}`}
      overflowPanelY={true}
    />
  );
};

export default ReportDetail;
