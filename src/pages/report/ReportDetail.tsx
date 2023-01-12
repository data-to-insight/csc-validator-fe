import React, { useEffect, Dispatch, useState } from "react";
import { APIControl } from "@sfdl/prpc";
import {
  ReportItem,
  ReportActionType,
  ReportAction,
  Error,
} from "reducers/ReportReducer";

import DraggablePanes from "components/draggable-panes";

import { pascalToReadable } from "utils/strings/fomatters";

import { Block } from "@sfdl/sf-mui-components";

import ReportTable from "./ReportTable";
import ErrorList from "./ErrorList";
import { Typography } from "@mui/material";

interface ReportDetailProps {
  api: APIControl;
  childItem: ReportItem;
  dispatch: Dispatch<ReportAction>;
}

const ReportDetail = (props: ReportDetailProps) => {
  const { childItem, dispatch, api } = props;

  useEffect(() => {
    const init = async () => {
      if (!childItem.childData) {
        const childData = await api.callAPI({ method: "get_child", value: {} }); //value must be an ID string in the final version

        dispatch({
          type: ReportActionType.SET_CHILD,
          payload: {
            childId: childItem.code,
            childData: { ...JSON.parse(childData.val) },
          },
        });
      }
    };

    init();
  }, []);

  const [selectedError, setSelectedError] = useState<Error | null>(null);

  const handleSelectError = (error: Error | null) => {
    console.log(error);
    setSelectedError(error);
  };

  const renderTables = () => {
    if (childItem.childData) {
      return Object.keys(childItem.childData).map((key) => {
        if (key === "header") {
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
              data={childItem.childData[key]}
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
            <Typography variant="h5">ID: {childItem.code}</Typography>
            {renderTables()}
          </Block>
        }
        bottomContent={
          <>
            <Typography variant="h5">Errors</Typography>
            <ErrorList
              errorSelectedHandler={handleSelectError}
              errorList={childItem.errorList}
            />
          </>
        }
      />
    </>
  );
};

export default ReportDetail;
