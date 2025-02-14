import React from 'react';
import { Container, theme as SFTheme } from '@sfdl/sf-mui-components';
import Start from 'pages/start';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { GatedProps } from '@sfdl/sf-cookie-gate';
import { Body } from '@sfdl/sf-mui-components';
import { loadAnalytics } from 'utils/analytics/loadAnalytics';
import Version from 'components/version';
import { Tool } from 'Router';

loadAnalytics('G-HQPVH1TXPV');

const theme = createTheme(SFTheme);

type LandingProps = { APIName?: string } & GatedProps;

const Landing = (props: LandingProps) => {
  const handleClick = (la: string) => {
    console.log('ready to set cookie');
    props.setCookieHandler(la);
    window.location.reload();
  };

  const renderTitle = () => {
    return `${props.tool === Tool.Tool903 ? '903' : 'CIN'} Validator`;
  };

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Body title={renderTitle()} chip={props.APIName || 'Sample'}>
          <Start onClick={handleClick} tool={props.tool} />
        </Body>
        <Version
          versionNumber={
            process.env.REACT_APP_VERSION && process.env.REACT_APP_DATE
              ? `${process.env.REACT_APP_VERSION} - ${process.env.REACT_APP_DATE}`
              : ''
          }
          sourceLink='https://github.com/data-to-insight/cin-validator-fe'
        />
        <Version versionNumber='0.1.6' sourceLink='https://github.com/data-to-insight/csc-validator-be-cin'/>
        <Version versionNumber='0.1.10' sourceLink='https://github.com/data-to-insight/csc-validator-be-903'/>
      </Container>
    </ThemeProvider>
  );
};

export default Landing;
