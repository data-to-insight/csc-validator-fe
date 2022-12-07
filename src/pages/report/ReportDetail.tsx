import React, { useEffect, Dispatch } from "react";
import { APIControl } from "@sfdl/prpc";
import {
  ReportItem,
  ReportActionType,
  ReportAction,
} from "reducers/ReportReducer";
import { ScrollableFull } from "./Report.styles";

import { pascalToReadable } from "utils/strings/fomatters";

import { Block } from "@sfdl/sf-mui-components";

import ReportTable from "./ReportTable";
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
            <ReportTable data={childItem.childData[key]} id={key} key={key} />
          </Block>
        );
      });
    }

    return null;
  };

  return (
    <ScrollableFull>
      <Block spacing="blockLarge">
        <Typography variant="h5">ID: {childItem.code}</Typography>
      </Block>
      {childItem.childData ? renderTables() : "loading..."}
    </ScrollableFull>
  );
};

export default ReportDetail;
