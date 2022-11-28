import React from "react";
import { Container, theme as SFTheme } from "@sfdl/sf-mui-components";
import Start from "pages/start";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { GatedProps } from "@sfdl/sf-cookie-gate";
import { loadAnalytics } from "utils/analytics/Analytics";

const theme = createTheme(SFTheme);

loadAnalytics();

type LandingProps = {} & GatedProps;

const Landing = (props: LandingProps) => {
  const handleClick = () => {
    console.log("ready to set cookie");
    props.setCookieHandler();
    window.location.reload();
  };

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Start onClick={handleClick} />
      </Container>
    </ThemeProvider>
  );
};

export default Landing;
