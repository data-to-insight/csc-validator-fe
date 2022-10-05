/** @jsxImportSource @emotion/react */

import { ReactNode } from "react";
import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import { PageWrapper, SupHeader } from "./Body.styles";

interface BodyProps {
  children: ReactNode;
}

const Body = (props: BodyProps) => {
  const { children } = props;

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <Box css={SupHeader.box}>
          {" "}
          <Typography variant="body1">This is a Beta app</Typography>
        </Box>
        <AppBar position="relative">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              CIN Validator
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>

      <PageWrapper>{children}</PageWrapper>
    </div>
  );
};

export default Body;
