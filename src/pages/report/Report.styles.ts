import styled from "@emotion/styled";
import { spacing } from "@sfdl/sf-mui-components";

const FlexContainer = styled.div`
  height: 100vh;
  width: 100%;
  background-color: red;
  display: flex;
  flex-direction: column;  
`;

const ScrollableFull = styled.div`
  flex-grow: 1;
  display: flex;
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

export { ScrollableFull, HeaderControl, FlexContainer };
