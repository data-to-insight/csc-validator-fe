/** @jsxImportSource @emotion/react */
/* eslint-disable react-hooks/exhaustive-deps */

import React from 'react';
import {
  Box,
  Grid,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Typography,
} from '@mui/material';
import { FormatListNumbered } from '@mui/icons-material';

import { Aligner } from '../Pages.styles';

import { FileActionType } from 'reducers/FileReducer';
import { LoadDataViewProps } from './LoadData';

import {
  Tabs,
  Expando,
  SelectableList as Selectablelist,
  Loader,
  Upload as Uploader,
  Block,
} from '@sfdl/sf-mui-components';

import PrimaryControls from 'components/primarycontrols';

const LoadData903 = (props: LoadDataViewProps) => {
  const {
    getTotalFilesLength,
    data,
    handleResetClick,
    handleNextClick,
    handleGenerateCSVClick,
    selectedValidationRules,
    fileDispatch,
    fileState,
    loading,
    loadingMessage,
    validationRules,
    getValidationRulesSummary,
    getInitialSelectedRuleState,
    setSelectedValidationRules,
  } = props;

  const renderInstructions = () => {
    const instructions = [
      {
        label: `Upload an XML file for the 903 return by clicking on the arrow below. 
        If you have CSVs, convert them into XML using the DfE XML Generator.`,
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
          <ul>
            <li>
              <Typography variant='body2'>
                Use the 'Child ID' sidebar to select individual children.
              </Typography>
            </li>
            <li>
              <Typography variant='body2'>
                Scroll down to see the failing locations for the child across
                all recorded tables. Cells with errors are highlighted in blue
                when you click on the error description.
              </Typography>
            </li>
            <li>
              <Typography variant='body2'>
                If you click the 'Filter' button, you can type to search for a
                Child ID, or scroll down and click to display only children with
                a particular error.
              </Typography>
            </li>
            <li>
              <Typography variant='body2'>
                To download the Error Report spreadsheet, scroll to the bottom
                of the page and click the 'Download Error Reports' button
              </Typography>
            </li>
          </ul>
        ),
      },
    ];

    return (
      <Stepper orientation='vertical' activeStep={-1}>
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
            <Typography variant='h6'>Upload 903 XML file</Typography>
            <Uploader
              onUploadReady={(files: any) => {
                fileDispatch({
                  type: FileActionType.ADD_FILES,
                  payload: files || {},
                  year: '2023', //redundant
                });
              }}
              maxFiles={1}
              fileList={fileState['2023']}
            />
          </Grid>
        </Grid>
      </Box>
    );
  };

  const renderFileTabs = () => {
    const headers = [{ label: 'XML File' }];

    const bodies = [renderXMLTab()];

    return <Tabs headers={headers} bodies={bodies} id='file-upload-tabs' />;
  };

  return (
    <div>
      {loading && <Loader type='cover' label={loadingMessage} />}
      <Box flexGrow={1}>
        <Block>
          This tool will load Python code in your web browser to read and
          validate your 903 data files locally. None of your 903 data will leave
          your network via this tool. You can safely use it without installing
          additional software, and without any data sharing agreement. Once the
          Python code has loaded, the tool will work entirely offline.
        </Block>
        <Block spacing='blockLarge'>
          To begin, use the boxes below to locate and upload your local 903
          file. Select the validation rules you want to run, and use the
          “validate” button to get started. By default, all rules will be run if
          no specific rules are selected.
          <br />
          <br />
          If you simply want to convert your XML file into CSVs, you can click
          on "download CSVs" without the need to go through the validation
          process first.
        </Block>
        <Block spacing='blockLarge'>
          <Expando
            Icon={FormatListNumbered}
            id='instructions-list'
            title='Instructions'
          >
            {renderInstructions()}
          </Expando>
        </Block>
        <Block spacing='blockLarge'>
          <Box>{renderFileTabs()}</Box>
        </Block>
        <Block spacing='blockLarge'>
          {validationRules && validationRules.length > 0 && (
            <Expando
              defaultExpanded={false}
              id='validation-rules-expander'
              title={`Validation Rules (${getValidationRulesSummary()})`}
            >
              <Selectablelist
                initialSelectedItems={getInitialSelectedRuleState(
                  validationRules
                )}
                values={validationRules}
                onItemSelected={(selectedRules: string[]) => {
                  setSelectedValidationRules(selectedRules);
                }}
              />
            </Expando>
          )}
        </Block>
        <Block spacing='blockLarge'>
          <Aligner>
            <PrimaryControls
              disableDownload={getTotalFilesLength() < 1}
              disableButtons={
                getTotalFilesLength() < 1 || selectedValidationRules.length < 1
              }
              disableUserReport={!data || !data.userReport}
              onClearClick={handleResetClick}
              onValidateClick={handleNextClick}
              onGenerateClick={handleGenerateCSVClick}
              onReportClick={() => {}}
            />
          </Aligner>
        </Block>
      </Box>
    </div>
  );
};

export default LoadData903;
