import React from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";

import { IconContainer } from "./Expando.styles";

interface ExpandoProps {
  title: string;
  icon?: React.ReactNode;
  id: string;
  children: React.ReactNode;
}

const Expando = (props: ExpandoProps) => {
  const { title, children, icon, id } = props;

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMore />}
        aria-controls={`${id}-controls`}
        id={id}
      >
        <>
          {icon && <IconContainer>{icon}</IconContainer>}
          <Typography>{title}</Typography>
        </>
      </AccordionSummary>
      <AccordionDetails>{children}</AccordionDetails>
    </Accordion>
  );
};

export default Expando;
