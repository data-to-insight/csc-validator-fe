import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { spacing } from "theme/spacing";
import { greys } from "theme/colors";

type DropAreaProps = {
  active?: boolean;
};

const UploaderStyles = {
  paper: css`
    padding: 20px;
  `,
};

const DropArea = styled.div<DropAreaProps>`
  padding: ${spacing.l};
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  background: ${(props) => (props.active ? greys.mid : "transparent")};

  p {
    flex-basis: 100%;
    text-align: center;
    margin: 0;
    ${(props) => props.active && "color: white"};

    svg {
      width: 50px;
      height: 50px;
    }
  }
`;

export { UploaderStyles, DropArea };
