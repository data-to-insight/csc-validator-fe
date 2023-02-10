import React, { useState, useEffect } from "react";
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

  useEffect(() => {
    setSelectedError(null);
  }, [childId]);

  const handleSelectError = (error: Error | null) => {
    setSelectedError(error);
  };

  const renderTables = () => {
    if (childItem) {
      type ChildErrorTable = {
        [key: string]: any;
      };
      const childErrorsByTable: ChildErrorTable = {};

      Object.values(childItem.errors).forEach((childError: any) => {
        if (!childErrorsByTable[childError.tables_affected.toLowerCase()]) {
          childErrorsByTable[childError.tables_affected.toLowerCase()] = [];
        }
        childErrorsByTable[childError.tables_affected.toLowerCase()].push(
          childError
        );
      });

      return Object.keys(childItem).map((key) => {
        if (skipRendering.indexOf(key) > -1) {
          return null;
        }

        return (
          <Block spacing="blockExtraLarge">
            <Typography variant="body1">
              <strong>{pascalToReadable(key)}</strong>
            </Typography>
            <ReportTable
              childErrors={childErrorsByTable[key.toLowerCase()] || null}
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
            <Block spacing="blockLarge">
              <Typography variant="h5">Child ID: {childId}</Typography>
            </Block>
            {renderTables()}
          </Block>
        }
        bottomContent={
          <>
            <br />
            <br />
            <Typography variant="h5">Errors</Typography>
            {childItem.errors ? (
              <ErrorList
                errorSelectedHandler={handleSelectError}
                errorList={Object.values(childItem.errors)}
                childId={childId}
              />
            ) : (
              <Typography variant="body1">
                No errors found for this entry
              </Typography>
            )}
          </>
        }
      />
    </>
  );
};

export default ReportDetail;
