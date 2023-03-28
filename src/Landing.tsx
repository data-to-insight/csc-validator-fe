import React from "react";
import { Container, theme as SFTheme } from "@sfdl/sf-mui-components";
import Start from "pages/start";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { GatedProps } from "@sfdl/sf-cookie-gate";
import { Body } from "@sfdl/sf-mui-components";
import { loadAnalytics } from "utils/analytics/loadAnalytics";
import Version from "components/version";

loadAnalytics("G-HQPVH1TXPV");

const theme = createTheme(SFTheme);

type LandingProps = { APIName?: string } & GatedProps;

const Landing = (props: LandingProps) => {
  const handleClick = () => {
    console.log("ready to set cookie");
    props.setCookieHandler();
    window.location.reload();
  };

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Body title="CIN Validator" chip={props.APIName || "Sample"}>
          <Start onClick={handleClick} />
        </Body>
        <Version
          versionNumber={process.env.REACT_APP_VERSION || ""}
          sourceLink="https://github.com/data-to-insight/cin-validator-fe"
        />
      </Container>
    </ThemeProvider>
  );
};

export default Landing;
