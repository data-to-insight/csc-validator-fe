/** @jsxImportSource @emotion/react */

import React from "react";
import { Box } from "@mui/material";

import { TabPanelLayout } from "./Tabs.styles";

interface TabPanelProps {
  children: React.ReactNode;
  hidden?: boolean;
  index: number;
  id: string;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, hidden, index, id } = props;

  return (
    <div
      role="tabpanel"
      hidden={hidden}
      id={`${id}-${index}`}
      aria-labelledby={`${id}-${index}`}
    >
      {!hidden && <Box css={TabPanelLayout.panel}>{children}</Box>}
    </div>
  );
};

export default TabPanel;
