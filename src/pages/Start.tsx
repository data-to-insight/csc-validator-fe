/** @jsxImportSource @emotion/react */

import React, { Dispatch } from "react";
import { Box, Typography, Button, Grid } from "@mui/material";

import { ReportAction } from "reducers/ReportReducer";
import { RouteValue } from "Router";
import { Layout } from "./Page.styles";
import ReleaseNotes from "components/releasenotes";

interface StartPageProps {
  handleRouteChange: (newRoute: RouteValue) => void;
  dispatch: Dispatch<ReportAction>;
  data?: unknown;
}

const Start = (props: StartPageProps) => {
  const { handleRouteChange } = props;

  const handleButtonClick = () => {
    handleRouteChange(RouteValue.LOAD_DATA);
  };

  return (
    <Box flexGrow={1}>
      <Box css={Layout.block}>
        <Typography variant="body1">
          Data to Insight is a national project led by local authorities with
          support from the ADCS, DLUHC, DfE and Ofsted to help local authorities
          make better use of data.
        </Typography>
      </Box>

      <Box css={Layout.block}>
        <Typography variant="body1">
          This tool was developed by local authority data analysts, supported by
          technical expertise from our friends at Social Finance. It will let
          you perform the same kinds of data validation as the DfE’s SSDA903
          statutory data submission tool. You can run this tool at any time,
          using your year-to-date extract of SSDA903 data. We recommend a
          monthly data checking cycle.
        </Typography>
      </Box>

      <Box css={Layout.blockLarge}>
        <Button
          onClick={handleButtonClick}
          variant="contained"
          sx={{ boxShadow: 0 }}
        >
          Start
        </Button>
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Box css={Layout.block}>
            <ReleaseNotes />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Start;
