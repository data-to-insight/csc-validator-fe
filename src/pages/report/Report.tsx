import { APIControl } from "api";
import { FileList } from "components/inputs/uploader/Upload";
import React, { Dispatch, useEffect, useContext, useState } from "react";
import { ReportAction, ReportData } from "reducers/ReportReducer";
import { RouteValue } from "Router";
import { APIConfigContext } from "App";
import { Box, Button, Grid, Typography } from "@mui/material";
import { ScrollableFull, HeaderControl } from "./Report.styles";

import SelectableTable from "components/selectabletable";
import ButtonPopover from "components/buttonpopover";
import ChildFilterDialog from "components/dialogs/childfilter";

interface ReportPageProps {
  handleRouteChange: (newRoute: RouteValue) => void;
  dispatch: Dispatch<ReportAction>;
  fileData: FileList;
  data: ReportData;
  api: APIControl;
}

const Report = (props: ReportPageProps) => {
  const apiConfig = useContext(APIConfigContext);
  const { handleRouteChange, api, data, dispatch } = props;
  const [selectedChild, setSelectedChild] = useState<string | null>(null);

  const handleRowSelect = (row: unknown[]) => {
    setSelectedChild(row[0] as string);
  };

  console.log(data);

  const renderTable = () => {
    const errorList = data.errorList
      .filter((errorItem) => {
        return errorItem.display !== false;
      })
      .map((errorItem) => {
        return [errorItem.code, errorItem.errors];
      });

    return <SelectableTable rows={errorList} onRowSelect={handleRowSelect} />;
  };

  const renderDetailView = () => {
    if (selectedChild) {
      return selectedChild;
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
                <ChildFilterDialog dispatch={dispatch} />
              </ButtonPopover>
            </HeaderControl>
            {renderTable()}
          </ScrollableFull>
        </Grid>
        <Grid item xs={9}>
          {renderDetailView()}
        </Grid>
      </Grid>
    </Box>
  );
};

export default Report;
