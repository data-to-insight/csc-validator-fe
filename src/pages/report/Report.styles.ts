import styled from '@emotion/styled';
import { spacing } from '@sfdl/sf-mui-components';

interface DoublePanelProps {
  color?: string;
  grow?: number;
}

//const headerHeight = "184px";

const FlexContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const ScrollableFull = styled.div`
  overflow-x: hidden;
  overflow-y: auto;
  height: 100%;
`;

const DoublePanel = styled.div<DoublePanelProps>`
  /*flex-grow: ${(props) => {
    return props.grow ? props.grow : 1;
  }};*/
  overflow-x: hidden;
  overflow-y: auto;
  //  align-self: stretch;
  // display: flex;
  //flex-direction: column;
  height: 50%;
`;

const HeaderControl = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  padding: 0 ${spacing.s} ${spacing.m} ${spacing.s};
`;

export { ScrollableFull, HeaderControl, FlexContainer, DoublePanel };
