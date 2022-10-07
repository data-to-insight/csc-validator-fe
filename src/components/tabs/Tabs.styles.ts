import { css } from "@emotion/react";
import { spacing } from "theme/spacing";
import { greys } from "theme/colors";

export const TabPanelLayout = {
  panel: css`
    padding: ${spacing.l} ${spacing.m};
    background: ${greys.light};
  `,
};
