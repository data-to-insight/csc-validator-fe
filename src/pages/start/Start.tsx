/** @jsxImportSource @emotion/react */

import React, { useState } from 'react';
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Typography,
  Button,
  Grid,
} from '@mui/material';

import { Block } from '@sfdl/sf-mui-components';
import { laData } from 'utils/authorityData';
import { Tool } from 'Router';

declare global {
  interface Window {
    _gaq: any;
  }
}

interface StartPageProps {
  onClick: (la: string) => void;
  tool: Tool;
}

const Start = (props: StartPageProps) => {
  const handleButtonClick = () => {
    try {
      const selectedLa = laData.filter((la) => {
        return la.la_id === localAuthority;
      })[0];

      //@ts-ignore
      gtag('event', 'cin-la-select', {
        localAuthority,
        localAuthorityName: selectedLa.la_name,
        event_callback: () => {
          props.onClick(selectedLa.la_id);
        },
        debug_mode: true,
      });
    } catch (err) {
      console.log(err);
      props.onClick();
    }
  };

  const [localAuthority, setLocalAuthority] = useState<string>('');
  const renderDropdown = () => {
    return (
      <FormControl fullWidth>
        <InputLabel id='la-select-label'>Choose local authority</InputLabel>
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
    );
  };

  return (
    <Box flexGrow={1}>
      <Block>
        <Typography variant='body1'>
          Data to Insight is a national project led by local authorities with
          support from the ADCS, DLUHC, DfE and Ofsted to help local authorities
          make better use of data.
        </Typography>
      </Block>

      <Block>
        {props.tool === Tool.ToolCIN ? (
          <Typography variant='body1'>
            This tool was developed by local authority data analysts, supported
            by technical expertise from our friends at Social Finance. It will
            let you perform the same kinds of data validation as the DfE’s CIN
            (children in need) statutory data submission tool. You can run this
            tool at any time, using your year-to-date extract of CIN data. We
            recommend a monthly data checking cycle.
          </Typography>
        ) : (
          <Typography variant='body1'>
            This tool was developed by local authority data analysts, supported
            by technical expertise from our friends at Social Finance. It will
            let you perform the same kinds of data validation as the DfE’s 903
            statutory data submission tool. You can run this tool at any time,
            using your year-to-date extract of 903 data. We recommend a monthly
            data checking cycle.
          </Typography>
        )}
      </Block>

      <Block spacing={'blockLarge'}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            {renderDropdown()}
          </Grid>
        </Grid>
      </Block>

      <Block spacing={'blockLarge'}>
        <Button
          onClick={handleButtonClick}
          variant='contained'
          sx={{ boxShadow: 0 }}
          disabled={localAuthority === ''}
        >
          Start
        </Button>
      </Block>
    </Box>
  );
};

export default Start;
