import styled from "@emotion/styled";
import { spacing } from "theme/spacing";

type ContentContainerProps = {
  open?: boolean;
};

const IconContainer = styled.span`
  display: inline-block;
  margin-right: ${spacing.m};
`;

const ContentContainer = styled.div<ContentContainerProps>`
  display: ${(props) => (props.open ? "block" : "none")};
`;

export { IconContainer, ContentContainer };
