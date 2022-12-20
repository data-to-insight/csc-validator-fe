import React, { useEffect, Dispatch, useState } from "react";
import { APIControl } from "@sfdl/prpc";
import {
  ReportItem,
  ReportActionType,
  ReportAction,
  Error,
} from "reducers/ReportReducer";
import { ScrollableFull, FlexContainer } from "./Report.styles";

import { pascalToReadable } from "utils/strings/fomatters";

import { Block } from "@sfdl/sf-mui-components";

import ReportTable from "./ReportTable";
import ErrorList from "./ErrorList";
import { Typography } from "@mui/material";

//import Table from "components/table";

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
    console.log(selectedError);

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
    <FlexContainer>
      <ScrollableFull>
          <Block spacing="blockLarge">
            <Typography variant="h5">ID: {childItem.code}</Typography>
          </Block>
          {childItem.childData ? renderTables() : "loading..."}
        </ScrollableFull>
        <ScrollableFull>
          <Typography variant="h5">Errors</Typography>
        <ErrorList
          errorSelectedHandler={handleSelectError}
          errorList={childItem.errorList}
        />
        </ScrollableFull>       
        
    </FlexContainer>

    </>
  );
};

export default ReportDetail;
