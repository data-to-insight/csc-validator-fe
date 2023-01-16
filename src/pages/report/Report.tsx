import React, { useState, useEffect } from "react";
import { ReportActionType } from "reducers/ReportReducer";
import { RouteValue, RouteProps } from "Router";
import { Box, Button, Grid, Typography } from "@mui/material";
import { ScrollableFull, HeaderControl } from "./Report.styles";

import { SelectableTable, ButtonPopover, Block } from "@sfdl/sf-mui-components";

import PrimaryControls from "components/primarycontrols";

import ChildFilterDialog from "components/dialogs/childfilter";
import ReportDetail from "./ReportDetail";
import { Aligner, Spacer } from "../Pages.styles";
import { generateCSV } from "utils/file/generateCSV";

interface ReportPageProps extends RouteProps {
  handleRouteChange: (newRoute: RouteValue) => void;
}

const Report = (props: ReportPageProps) => {
  const { handleRouteChange, api, data, dispatch } = props;
  const [selectedChild, setSelectedChild] = useState<string | null>(null);

  useEffect(() => {
    const init = async () => {
      const children = await api.call("get_children", {});
      const errors = await api.call("get_errors", {});

      dispatch({
        type: ReportActionType.SET_CHILDREN,
        payload: {
          children: JSON.parse(children.val),
          errors: JSON.parse(errors),
        },
      });
    };

    if (Object.values(data).length < 1) {
      init();
    }
  }, []);

  const generateCSVFile = () => {
    if (data && data.children) {
      const output = generateCSV(Object.values(data.children));

      const encodedURI = encodeURI(output);
      window.open(encodedURI);
    }
  };

  const handleRowSelect = (row: unknown[]) => {
    setSelectedChild(row[0] as string);
  };

  const handleResetClick = () => {
    dispatch({ type: ReportActionType.RESET, payload: {} });
    handleRouteChange(RouteValue.LOAD_DATA);
  };

  const renderTable = () => {
    if (!data.children) {
      return null;
    }

    const reportList = Object.values(data.children)
      .filter((child) => {
        if (!child.ChildIdentifiers) {
          return false;
        }

        return !child.hide;
      })
      .map((child) => {
        return [
          child.ChildIdentifiers.LAchildID,
          child.errors ? child.errors.length : 0,
        ];
      });

    return (
      <SelectableTable
        headers={["Code", "Count"]}
        rows={reportList}
        onRowSelect={handleRowSelect}
      />
    );
  };

  const renderDetailView = () => {
    if (selectedChild && data.children && data.children[selectedChild]) {
      return (
        <ReportDetail
          childId={selectedChild}
          childItem={data.children[selectedChild]}
        />
      );
    }

    return <Typography variant="h6">Select child</Typography>;
  };

  return (
    <Box flexGrow={1} style={{ height: "750px", overflowY: "hidden" }}>
      <Grid
        container
        spacing={2}
        style={{ height: "700px", overflowY: "hidden" }}
      >
        <Grid item xs={3} style={{ height: "100%" }}>
          <ScrollableFull>
            <HeaderControl>
              <Typography variant="h6">Child ID</Typography>
              <ButtonPopover label="Filter">
                <ChildFilterDialog filterString={""} dispatch={dispatch} />
              </ButtonPopover>
            </HeaderControl>
            {renderTable()}
          </ScrollableFull>
        </Grid>
        <Grid item xs={9} style={{ height: "100%" }}>
          {renderDetailView()}
        </Grid>
      </Grid>
      <Block spacing="blockLarge">
        <Spacer>
          <Aligner>
            <PrimaryControls
              disableButtons={false}
              onClearClick={handleResetClick}
              onValidateClick={() => {}}
              onGenerateClick={() => {
                generateCSVFile();
              }}
            />
          </Aligner>
        </Spacer>
      </Block>
    </Box>
  );
};

export default Report;
