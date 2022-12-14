import React from "react";
import { Error } from "reducers/ReportReducer";
import Table from "components/table";

interface ErrorListProps {
  errorList: Error[];
  errorSelectedHandler: (error: Error | null) => void;
}

const ErrorList = ({ errorList, errorSelectedHandler }: ErrorListProps) => {
  const handleErrorSelected = (error: Error) => {
    errorSelectedHandler(error);
  };

  return (
    <Table
      selectable={true}
      selectedHandler={handleErrorSelected}
      headers={[
        "Rules Code",
        "Rule Type",
        "Tables Affected",
        "Columns Affected",
      ]}
      rows={errorList.map((errorItem) => {
        return {
          cells: [
            errorItem.rule_code,
            errorItem.rule_type,
            errorItem.tables_affected,
            errorItem.columns_affected,
          ],
          raw: errorItem as any,
        };
      })}
      id="error-table"
    />
  );
};

export default ErrorList;
