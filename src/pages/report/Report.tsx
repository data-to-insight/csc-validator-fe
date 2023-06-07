import React, { useState, useEffect } from 'react';
import { ReportActionType } from 'reducers/ReportReducer';
import { RouteValue, RouteProps } from 'Router';
import { Box, Checkbox, Grid, Typography, Button } from '@mui/material';
import { ScrollableFull, HeaderControl } from './Report.styles';

import { SelectableTable, ButtonPopover, Block } from '@sfdl/sf-mui-components';

import PrimaryControls from 'components/primarycontrols';

import ChildFilterDialog from 'components/dialogs/childfilter';
import ReportDetail from './ReportDetail';
import { Aligner, Spacer } from '../Pages.styles';
import { generateCSV } from 'utils/file/generateCSV';
import { downloadFile } from 'utils/file/download';

interface ReportPageProps extends RouteProps {
  handleRouteChange: (newRoute: RouteValue) => void;
}

const Report = (props: ReportPageProps) => {
  const { handleRouteChange, api, data, dispatch } = props;
  const [selectedChild, setSelectedChild] = useState<string | null>(null);
  const [hideWithoutErrors, setHideWithoutErrors] = useState<boolean>(true);

  useEffect(() => {
    const init = async () => {
      const children = await api.call('get_children', {});
      const errors = await api.call('get_errors', {});

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
  });

  const generateCSVFile = () => {
    if (data && data.tables) {
      Object.keys(data.tables[0]).forEach((table) => {
        const output = generateCSV(
          Object.values(JSON.parse(data.tables[0][table]))
        );

        if (output) {
          downloadFile(output, `${table}.csv`);
        }
      });
    }
  };

  const generateReport = () => {
    if (data && data.userReport) {
      const output = generateCSV(Object.values(data.userReport));

      if (output) {
        downloadFile(output, `User Report.csv`);
      }
    }
  };

  const handleRowSelect = (row: unknown[]) => {
    setSelectedChild(row[0] as string);
  };

  const handleResetClick = () => {
    dispatch({ type: ReportActionType.RESET, payload: {} });
    handleRouteChange(RouteValue.LOAD_DATA);
  };

  const renderCheckbox = () => {
    return (
      <HeaderControl>
        <Typography variant='body2'>Hide children without errors</Typography>
        <Checkbox
          onChange={() => {
            setHideWithoutErrors(!hideWithoutErrors);
          }}
          checked={hideWithoutErrors}
        />
      </HeaderControl>
    );
  };

  const renderTable = () => {
    if (!data.children) {
      return null;
    }

    const reportList = Object.values(data.children)
      .filter((child) => {
        // if there's no errors, and we're hiding non-errored children, don't show child
        if (Object.keys(child.errors).length < 1 && hideWithoutErrors) {
          return false;
        }

        return !child.hide;
      })
      .map((child) => {
        return [child.id, child.errors ? Object.keys(child.errors).length : 0];
      });

    return (
      <SelectableTable
        headers={['Code', 'Count']}
        rows={reportList}
        onRowSelect={handleRowSelect}
      />
    );
  };

  const renderDetailView = () => {
    if (
      selectedChild &&
      data.children &&
      data.children[selectedChild] &&
      data.validationRules
    ) {
      return (
        <ReportDetail
          childId={selectedChild}
          childItem={data.children[selectedChild]}
          validationRules={data.validationRules}
        />
      );
    }

    return <Typography variant='h6'>Select child</Typography>;
  };

  return (
    <Box flexGrow={1} style={{ height: '750px', overflowY: 'hidden' }}>
      <Grid
        container
        spacing={2}
        style={{ height: '700px', overflowY: 'hidden' }}
      >
        <Grid item xs={2} style={{ height: '100%' }}>
          <ScrollableFull>
            <Block>
              <Button
                onClick={() => {
                  setSelectedChild('LAWide');
                }}
              >
                View LA-wide Errors
              </Button>
            </Block>

            <HeaderControl>
              <Typography variant='h6'>Child ID</Typography>
              <ButtonPopover label='Filter'>
                <ChildFilterDialog
                  filterString={data.filter}
                  dispatch={dispatch}
                />
              </ButtonPopover>
            </HeaderControl>
            {renderCheckbox()}
            {renderTable()}
          </ScrollableFull>
        </Grid>
        <Grid item xs={10} style={{ height: '100%' }}>
          {selectedChild === 'LAWide' ? null : renderDetailView()}
        </Grid>
      </Grid>
      <Block spacing='blockLarge'>
        <Spacer>
          <Aligner>
            <PrimaryControls
              disableDownload={false}
              disableButtons={false}
              onClearClick={handleResetClick}
              onValidateClick={() => {}}
              onGenerateClick={() => {
                generateCSVFile();
              }}
              onReportClick={() => {
                generateReport();
              }}
            />
          </Aligner>
        </Spacer>
      </Block>
    </Box>
  );
};

export default Report;
