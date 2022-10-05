/** @jsxImportSource @emotion/react */

import React from "react";
import { AppBar, Box, Chip, Toolbar, Typography, Link } from "@mui/material";

import { SupHeader, BetaChip } from "./Header.styles";

const Header = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <SupHeader>
        <Chip color="primary" css={BetaChip.chip} label="BETA" />
        <Typography variant="body2">
          This is a Beta app -{" "}
          <Link href="mailto:datatoinsight.enquiries@gmail.com">
            your feedback can help improve it
          </Link>
        </Typography>
      </SupHeader>
      <AppBar position="relative" sx={{ boxShadow: 0 }}>
        <Toolbar>
          <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
            CIN Data Validation Service
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
