import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { spacing, padding } from "theme/spacing";
import { typography } from "theme/typography";

const PageWrapper = styled.div`
  width: 100%;
  margin: ${spacing.l} ${spacing.s};
  font-family: ${typography};
`;

const SupHeader = {
  box: css`
    padding: ${padding.l_s};
  `,
};

export { PageWrapper, SupHeader };
