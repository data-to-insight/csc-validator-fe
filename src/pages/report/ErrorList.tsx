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
      headers={["Rule Code", "Rule Description"]}
      rows={errorList.map((errorItem) => {
        return {
          cells: [errorItem.rule_code, errorItem["Rule Message"]],
          raw: errorItem as any,
        };
      })}
      id="error-table"
    />
  );
};

export default ErrorList;
