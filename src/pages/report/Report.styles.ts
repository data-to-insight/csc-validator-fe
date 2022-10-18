import styled from "@emotion/styled";
import { spacing } from "theme/spacing";

const ScrollableFull = styled.div`
  width: 100%;
  height: 100vh;
  overflow-x: hidden;
  overflow-y: auto;
`;

const HeaderControl = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 ${spacing.s} ${spacing.m} ${spacing.s};
`;

export { ScrollableFull, HeaderControl };
