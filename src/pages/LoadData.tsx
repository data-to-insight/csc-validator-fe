/** @jsxImportSource @emotion/react */

import React, { Dispatch } from "react";
import {
  Box,
  Grid,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Tabs,
  Tab,
  Typography,
} from "@mui/material";
import { TabPanel } from "@mui/lab";
import { FormatListNumbered } from "@mui/icons-material";

import Uploader from "components/inputs/uploader";
import { FileList } from "components/inputs/uploader/Upload";
import Block from "components/block";

import { ReportAction } from "reducers/ReportReducer";
import { RouteValue } from "Router";
import { FileAction, FileActionType } from "reducers/FileReducer";
import Expando from "components/expando";

interface LoadDataPageProps {
  handleRouteChange: (newRoute: RouteValue) => void;
  dispatch: Dispatch<ReportAction>;
  data?: unknown;
  fileDispatch: Dispatch<FileAction>;
  fileData: FileList;
}

const LoadData = (props: LoadDataPageProps) => {
  const { handleRouteChange, fileData, fileDispatch } = props;

  const handleButtonClick = () => {
    handleRouteChange(RouteValue.REPORT);
  };

  const onUploadReady = (files: FileList) => {
    fileDispatch({ type: FileActionType.SET_FILES, payload: files });
  };

  const renderNextButton = () => {
    if (Object.keys(fileData).length > 0) {
      return <button onClick={handleButtonClick}>Process files</button>;
    }

    return null;
  };

  const renderInstructions = () => {
    const instructions = [
      {
        label: `Add your files to the loading boxes below. If using CSV's, you can
        validate with any or all of the tables, but validation checks which are
        missing the necessary data will not run.`,
        content: null,
      },
      {
        label: `Select your Local Authority and the relevant Collection Year.`,
        content: null,
      },
      {
        label: `If you only want to only run the validation for certain rules, use the
        'Validation Rules' dropdown to select the ones you want.
      `,
        content: null,
      },
      {
        label: `Click 'Validate' to run the selected checks. When complete, the Error
        Display screen will appear.
      `,
        content: null,
      },
      {
        label: `On the Error Display screen:`,
        content: (
          <Typography variant="body2">
            <ul>
              <li>Use the 'Child ID' sidebar to select individual children.</li>
              <li>
                Use the tabs to see the selected Child ID's data in a particular
                module. Cells with errors are highlighted in red.
              </li>
              <li>
                If you click the 'Filter' button, you can type to search for a
                Child ID, or scroll down and click to display only children with
                a particular error.
              </li>
              <li>
                To download the Error Report spreadsheet, scroll to the bottom
                of the page and click the 'Download Error Reports' button
              </li>
            </ul>
          </Typography>
        ),
      },
    ];

    return (
      <Stepper orientation="vertical" activeStep={-1}>
        {instructions.map((ins, idx) => {
          return (
            <Step key={ins.label} active={true}>
              <StepLabel>{ins.label}</StepLabel>
              <StepContent>{ins.content}</StepContent>
            </Step>
          );
        })}
      </Stepper>
    );
  };

  return (
    <div>
      <Box flexGrow={1}>
        <Block>
          This tool will load Python code in your web browser to read and
          validate your SSDA903 data files locally. None of your SSDA903 data
          will leave your network via this tool. You can safely use it without
          installing additional software, and without any data sharing
          agreement. Once the Python code has loaded, the tool will work
          entirely offline.
        </Block>
        <Block spacing="blockLarge">
          To begin, use the boxes below to locate your local SSDA903 file
          outputs for the relevant year. Choose which validation rules you want
          to run, and use the “Validate” button to get started.
        </Block>
        <Block spacing="blockLarge">
          <Expando
            Icon={FormatListNumbered}
            id="instructions-list"
            title="Instructions"
          >
            {renderInstructions()}
          </Expando>
        </Block>
        <Block>
          <Block>
            <Typography variant="h5">
              Offsted provider information lookup tables
            </Typography>
          </Block>

          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography variant="h6">Children's Homes List</Typography>
              <Uploader onUploadReady={onUploadReady} />
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h6">Social Care Providers List</Typography>
              <Uploader onUploadReady={onUploadReady} />
            </Grid>
          </Grid>
        </Block>
        <Block>
          <Box>
            <Tabs>
              <Tab label="CSV Files" />
              <Tab label="XML Files (Experimental)" />
            </Tabs>
          </Box>
        </Block>
      </Box>
    </div>
  );
};

export default LoadData;
