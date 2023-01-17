/** @jsxImportSource @emotion/react */

import React, { useState, } from "react";
import {
  Box,
  Grid,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Typography,
} from "@mui/material";
import {
  FormatListBulleted,
  FormatListNumbered,
} from "@mui/icons-material";

import { Aligner } from "../Pages.styles";

import { ReportActionType } from "reducers/ReportReducer";
import { FileActionType } from "reducers/FileReducer";

import {
  Expando,
  Tabs,
  SelectableList as Selectablelist,
  Loader,
  Upload as Uploader,
  Block,
} from "@sfdl/sf-mui-components";

import PrimaryControls from "components/primarycontrols";

import { RouteProps, RouteValue } from "../../Router";

import validationRules from "data/validation-rules-list.json";

interface LoadDataPageProps extends RouteProps {
  handleRouteChange: (route: RouteValue) => void;
}


const LoadData = (props: LoadDataPageProps) => {
  const { dispatch, api, fileState, fileDispatch } = props;

  const [selectedValidationRules, setSelectedValidationRules] = useState<
    string[]
  >([]);
  const [loading, setLoading] = useState(false);

  const handleResetClick = () => {
    dispatch({ type: ReportActionType.RESET, payload: {} });
    fileDispatch({ type: FileActionType.CLEAR_FILES, payload: {}, year: "" });
  };

  const getTotalFilesLength = (): number => {
    return Object.values(fileState).reduce((prevVal, currVal) => {
      return (prevVal as number) + Object.values(currVal as Object).length;
    }, 0) as number;
  };

  const handleNextClick = async () => {
    if (api && fileState) {
      const file = fileState["2023"];

      try {
        setLoading(true);

        const fileObject: any = Object.values(file)[0] as any;
        const tables = await api.call("generate_tables", fileObject.file);
        const errors = await api.call("cin_validate", fileObject.file);

        setLoading(false);
        dispatch({
          type: ReportActionType.SET_CHILDREN,
          payload: { tables, errors },
        });

        props.handleRouteChange(RouteValue.REPORT);
      } catch (ex) {
        setLoading(false);
        console.log("API add_files request failed", ex);
        alert("Something went wrong!");
      }
    }
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

  const renderXMLTab = () => {
    return (
      <Box>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h6">This year</Typography>
            <Uploader
              onUploadReady={(files) => {
                fileDispatch({
                  type: FileActionType.ADD_FILES,
                  payload: files || {},
                  year: "2023",
                });
              }}
              fileList={fileState["2023"]}
            />
          </Grid>        
        </Grid>
      </Box>
    );
  };

  const renderFileTabs = () => {
    const headers = [
      { label: "XML Files" },
    ];

    const bodies = [renderXMLTab()];

    return <Tabs headers={headers} bodies={bodies} id="file-upload-tabs" />;
  };

  const getValidationRulesSummary = () => {
    const totalRulesLength = validationRules.length;
    const selectedRulesLength = selectedValidationRules.length;
    const unselectedRulesLength = totalRulesLength - selectedRulesLength;

    return `${selectedRulesLength} selected, ${unselectedRulesLength} unselected`;
  };

  return (
    <div>
      {loading && <Loader type="cover" />}
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
        <Block spacing="blockLarge">
          <Box>{renderFileTabs()}</Box>
        </Block>        
        <Block spacing="blockLarge">
          <Expando
            defaultExpanded={false}
            Icon={FormatListBulleted}
            id="validation-rules-expander"
            title={`Validation Rules (${getValidationRulesSummary()})`}
          >
            <Selectablelist
              values={validationRules}
              onItemSelected={(selectedRules: string[]) => {
                setSelectedValidationRules(selectedRules);
              }}
            />
          </Expando>
        </Block>
        <Block spacing="blockLarge">
          <Aligner>
            <PrimaryControls
              disableButtons={getTotalFilesLength() < 1}
              onClearClick={handleResetClick}
              onValidateClick={handleNextClick}
              onGenerateClick={() => {}}
            />
          </Aligner>
        </Block>
      </Box>
    </div>
  );
};

export default LoadData;
