/** @jsxImportSource @emotion/react */

import React from "react";
import { css } from "@emotion/react";
import { Box } from "@mui/material";

import { TabPanelLayout } from "./Tabs.styles";

interface TabPanelProps {
  children: React.ReactNode;
  hidden?: boolean;
  index: number;
  id: string;
  overflowY?: boolean;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, hidden, index, id, overflowY } = props;

  let baseCSS = TabPanelLayout.panel;

  return (
    <div
      role="tabpanel"
      hidden={hidden}
      id={`${id}-${index}`}
      aria-labelledby={`${id}-${index}`}
    >
      {!hidden && (
        <Box
          css={css`
            ${baseCSS};
            ${overflowY ? "overflow-y: auto" : "overflow-y: visible"};
          `}
        >
          {children}
        </Box>
      )}
    </div>
  );
};

export default TabPanel;
