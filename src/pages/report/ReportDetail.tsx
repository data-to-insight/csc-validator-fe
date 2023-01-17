import React, { Dispatch, useState } from "react";
import { Error } from "reducers/ReportReducer";

import DraggablePanes from "components/draggable-panes";

import { pascalToReadable } from "utils/strings/fomatters";

import { Block } from "@sfdl/sf-mui-components";

import ReportTable from "./ReportTable";
import ErrorList from "./ErrorList";
import { Typography } from "@mui/material";

interface ReportDetailProps {
  childItem: any;
  childId: string;
}

const ReportDetail = (props: ReportDetailProps) => {
  const { childItem, childId } = props;
  const skipRendering = ["Header", "errors", "hide"];

  const [selectedError, setSelectedError] = useState<Error | null>(null);

  const handleSelectError = (error: Error | null) => {
    setSelectedError(error);
  };

  const renderTables = () => {
    if (childItem) {
      return Object.keys(childItem).map((key) => {
        if (skipRendering.indexOf(key) > -1) {
          return null;
        }

        return (
          <Block spacing="blockLarge">
            <Typography variant="body1">
              <strong>{pascalToReadable(key)}</strong>
            </Typography>
            <ReportTable
              error={
                selectedError &&
                selectedError.tables_affected.toLowerCase() ===
                  key.toLowerCase()
                  ? selectedError
                  : null
              }
              data={childItem[key]}
              id={key}
              key={key}
            />
          </Block>
        );
      });
    }

    return null;
  };

  return (
    <>
      <DraggablePanes
        topContent={
          <Block spacing="blockLarge">
            <Typography variant="h5">ID: {childId}</Typography>
            {renderTables()}
          </Block>
        }
        bottomContent={
          <>
            <Typography variant="h5">Errors</Typography>
            <ErrorList
              errorSelectedHandler={handleSelectError}
              errorList={childItem.errors}
            />
          </>
        }
      />
    </>
  );
};

export default ReportDetail;
