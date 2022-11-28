import React, { useState } from "react";
import { ReportActionType } from "reducers/ReportReducer";
import { FileActionType, FileAction } from "reducers/FileReducer";
import { RouteValue, RouteProps } from "Router";
import { Box, Button, Grid, Typography } from "@mui/material";
import { ScrollableFull, HeaderControl } from "./Report.styles";

import {
  SelectableTable,
  ButtonPopover,
  Block,
  PrimaryControls,
} from "@sfdl/sf-mui-components";

import ChildFilterDialog from "components/dialogs/childfilter";
import ReportDetail from "./ReportDetail";
import { Aligner } from "../Pages.styles";

interface ReportPageProps extends RouteProps {
  handleRouteChange: (newRoute: RouteValue) => void;
}

const Report = (props: ReportPageProps) => {
  const { handleRouteChange, api, data, dispatch } = props;
  const [selectedChild, setSelectedChild] = useState<string | null>(null);

  const handleRowSelect = (row: unknown[]) => {
    setSelectedChild(row[0] as string);
  };

  const handleResetClick = () => {
    dispatch({ type: ReportActionType.RESET, payload: {} });
    handleRouteChange(RouteValue.LOAD_DATA);
  };

  const renderTable = () => {
    if (!data.errorList) {
      return null;
    }

    const errorList = Object.values(data.errorList)
      .filter((errorItem) => {
        return errorItem.display !== false;
      })
      .map((errorItem) => {
        return [errorItem.code, errorItem.count];
      });

    return (
      <SelectableTable
        headers={["Code", "Count"]}
        rows={errorList}
        onRowSelect={handleRowSelect}
      />
    );
  };

  const renderDetailView = () => {
    if (selectedChild && data.errorList) {
      return <ReportDetail data={data.errorList[selectedChild]} />;
    }

    return <Typography variant="h6">Select child</Typography>;
  };

  return (
    <Box flexGrow={1}>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <ScrollableFull>
            <HeaderControl>
              <Typography variant="h6">Child ID</Typography>
              <ButtonPopover label="Filter">
                <ChildFilterDialog
                  filterString={data.errorFilter}
                  dispatch={dispatch}
                />
              </ButtonPopover>
            </HeaderControl>
            {renderTable()}
          </ScrollableFull>
        </Grid>
        <Grid item xs={9}>
          {renderDetailView()}
        </Grid>
      </Grid>
      <Block spacing="blockLarge">
        <Aligner>
          <PrimaryControls
            disableButtons={false}
            onClearClick={handleResetClick}
            onValidateClick={() => {}}
          />
        </Aligner>
      </Block>
    </Box>
  );
};

export default Report;
