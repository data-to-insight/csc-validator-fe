/** @jsxImportSource @emotion/react */
/* eslint-disable react-hooks/exhaustive-deps */

import React, { useState } from 'react';
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Grid,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Typography,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import { FormatListNumbered } from '@mui/icons-material';
import Cookies from 'js-cookie';

import { laData } from 'utils/authorityData';
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
    collectionYear,
    setCollectionYear,
  } = props;

  const [localAuthority, setLocalAuthority] = useState<string>(
    Cookies.get('903-cookie') || ''
  );

  const renderInstructions = () => {
    const instructions = [
      {
        label: `Add your files to the loading boxes below. If using CSV's, you can validate with any or all of the tables, but validation checks which are missing the necessary data will not run.`,
        content: null,
      },
      {
        label: `Select your Local Authority and the relevant Collection Year.`,
        content: null,
      },
      {
        label: `If you only want to only run the validation for certain rules, use the 'Validation Rules' dropdown to select the ones you want.

      `,
        content: null,
      },
      {
        label: `Click 'Validate' to run the selected checks. When complete, the Error Display screen will appear.`,
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

  const renderCSVTab = () => {
    return (
      <Box>
        <Typography variant='h6'>Upload 903 CSV file(s)</Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography variant='body1'>This year</Typography>
            <Uploader
              onUploadReady={(files: any) => {
                fileDispatch({
                  type: FileActionType.ADD_FILES,
                  payload: files || {},
                  year: 'thisyear', //redundant
                });
              }}
              maxFiles={10}
              fileList={fileState['thisyear']}
            />
          </Grid>
          <Grid item xs={6}>
            <Typography variant='body1'>Last year</Typography>
            <Uploader
              onUploadReady={(files: any) => {
                fileDispatch({
                  type: FileActionType.ADD_FILES,
                  payload: files || {},
                  year: 'prevyear', //redundant
                });
              }}
              maxFiles={10}
              fileList={fileState['prevyear']}
            />
          </Grid>
        </Grid>
      </Box>
    );
  };

  const renderXMLTab = () => {
    return (
      <Box>
        <Typography variant='h6'>Upload 903 XML file(s)</Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography variant='body1'>This year</Typography>
            <Uploader
              onUploadReady={(files: any) => {
                fileDispatch({
                  type: FileActionType.ADD_FILES,
                  payload: files || {},
                  year: 'thisyear', //redundant
                });
              }}
              maxFiles={10}
              fileList={fileState['thisyear']}
            />
          </Grid>
          <Grid item xs={6}>
            <Typography variant='body1'>Last year</Typography>
            <Uploader
              onUploadReady={(files: any) => {
                fileDispatch({
                  type: FileActionType.ADD_FILES,
                  payload: files || {},
                  year: 'prevyear', //redundant
                });
              }}
              maxFiles={10}
              fileList={fileState['prevyear']}
            />
          </Grid>
        </Grid>
      </Box>
    );
  };

  const renderFileTabs = () => {
    const headers = [{ label: 'CSV Files' }, { label: 'XML Files' }];

    const bodies = [renderCSVTab(), renderXMLTab()];

    return (
      <Tabs
        headers={headers}
        bodies={bodies}
        id='file-upload-tabs'
        onChange={() => {
          fileDispatch({
            type: FileActionType.ADD_FILES,
            payload: {},
            year: 'prevyear', //redundant
          });

          fileDispatch({
            type: FileActionType.ADD_FILES,
            payload: {},
            year: 'thisyear', //redundant
          });
        }}
      />
    );
  };

  return (
    <div>
      {loading && <Loader type='cover' label={loadingMessage} />}
      <Box flexGrow={1}>
        <Block>
          This tool will load Python code in your web browser to read and
          validate your SSDA903 data files locally. None of your SSDA903 data
          will leave your network via this tool. You can safely use it without
          installing additional software, and without any data sharing
          agreement. Once the Python code has loaded, the tool will work
          entirely offline.
        </Block>
        <Block spacing='blockLarge'>
          To begin, use the boxes below to locate your local SSDA903 file
          outputs for the relevant year. Choose which validation rules you want
          to run, and use the “Validate” button to get started.
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
        <Grid item xs={6}></Grid>
        <Block spacing='blockLarge'>
          <Box>
            <Typography variant='h6'>
              Ofsted Provider Information Lookup Tables
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant='body1'>Combined provider table or Children's homes list </Typography>
                <Uploader
                  onUploadReady={(files: any) => {
                    fileDispatch({
                      type: FileActionType.ADD_FILES,
                      payload: files || {},
                      year: 'childrenshomes', //redundant
                    });
                  }}
                  maxFiles={1}
                  fileList={fileState['childrenshomes']}
                />
              </Grid>

              <Grid item xs={6}>
                <Typography variant='body1'>
                  Social Care Providers List
                </Typography>
                <Uploader
                  onUploadReady={(files: any) => {
                    fileDispatch({
                      type: FileActionType.ADD_FILES,
                      payload: files || {},
                      year: 'providers', //redundant
                    });
                  }}
                  maxFiles={1}
                  fileList={fileState['providers']}
                />
              </Grid>
            </Grid>
          </Box>
        </Block>

        <Block spacing='blockLarge'>
          <Box>{renderFileTabs()}</Box>
        </Block>
        <Block spacing='blockLarge'>
          <Box>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel id='la-select-label'>
                    Choose local authority
                  </InputLabel>
                  <Select
                    value={localAuthority}
                    labelId='la-select-label'
                    label='Choose local authority'
                    onChange={(event: SelectChangeEvent) => {
                      setLocalAuthority(event.target.value as string);
                    }}
                  >
                    {laData.map((laItem) => {
                      return (
                        <MenuItem value={laItem.la_id} key={laItem.la_id}>
                          {laItem.la_name}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel id='la-select-label'>
                    Choose collection year
                  </InputLabel>
                  <Select
                    value={collectionYear}
                    labelId='cy-select-label'
                    label='Choose collection year'
                    onChange={(event: SelectChangeEvent) => {
                      setCollectionYear(event.target.value as string);
                    }}
                  ><MenuItem value='2026'>2025/26</MenuItem>
                    <MenuItem value='2025'>2024/25</MenuItem>
                    <MenuItem value='2024'>2023/24</MenuItem>
                    <MenuItem value='2023'>2022/23</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Box>
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
              disableDownload={true}
              disableButtons={
                getTotalFilesLength() < 1 || selectedValidationRules.length < 1
              }
              disableUserReport={!data || !data.userReport}
              onClearClick={handleResetClick}
              onValidateClick={() => {
                const thisYear: any = Object.values(fileState['thisyear']).map(
                  (fileItem: any) => {
                    fileItem.filename = fileItem.file.name;
                    fileItem.file.filename = fileItem.file.name;
                    return fileItem.file;
                  }
                ) as any;

                const output: any = {
                  'This year': thisYear,
                };

                if (fileState['prevyear']) {
                  const prevYear: any = Object.values(
                    fileState['prevyear']
                  ).map((fileItem: any) => {
                    fileItem.filename = fileItem.file.name;
                    fileItem.file.filename = fileItem.file.name;
                    return fileItem.file;
                  }) as any;

                  output['Prev year'] = prevYear;
                }

                if (fileState['childrenshomes']) {
                  const childrensHomes: any = Object.values(
                    fileState['childrenshomes']
                  ).map((fileItem: any) => {
                    fileItem.filename = fileItem.file.name;
                    fileItem.file.filename = fileItem.file.name;
                    return fileItem.file;
                  }) as any;

                  output['CH lookup'] = childrensHomes;
                }

                if (fileState['providers']) {
                  const providers: any = Object.values(
                    fileState['providers']
                  ).map((fileItem: any) => {
                    fileItem.filename = fileItem.file.name;
                    fileItem.file.filename = fileItem.file.name;
                    return fileItem.file;
                  }) as any;

                  output['SCP lookup'] = providers;
                }
                handleNextClick('lac_validate', output, {
                  localAuthority,
                  collectionYear,
                });
              }}
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
