import { css } from "@emotion/react";
import styled from "@emotion/styled";

import { spacing } from "theme/spacing";

const SupHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  padding: ${spacing.m} 0;
  align-items: center;
`;

const BetaChip = {
  chip: css`
    margin-right: ${spacing.s};
  `,
};

export { SupHeader, BetaChip };
