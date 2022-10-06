import React from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import { ExpandMore, SvgIconComponent } from "@mui/icons-material";

import { IconContainer } from "./Expando.styles";

interface ExpandoProps {
  title: string;
  Icon?: SvgIconComponent;
  id: string;
  children: React.ReactNode;
}

const Expando = (props: ExpandoProps) => {
  const { title, children, Icon, id } = props;

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMore />}
        aria-controls={`${id}-controls`}
        id={id}
      >
        <>
          {Icon && <IconContainer>{<Icon />}</IconContainer>}
          <Typography>{title}</Typography>
        </>
      </AccordionSummary>
      <AccordionDetails>{children}</AccordionDetails>
    </Accordion>
  );
};

export default Expando;
