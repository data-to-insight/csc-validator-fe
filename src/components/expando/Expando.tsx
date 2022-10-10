import React, { useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import { ExpandMore, SvgIconComponent } from "@mui/icons-material";

import { IconContainer, ContentContainer } from "./Expando.styles";

interface ExpandoProps {
  title: string;
  Icon?: SvgIconComponent;
  id: string;
  children: React.ReactNode;
  defaultExpanded?: boolean;
}

const Expando = (props: ExpandoProps) => {
  const { title, children, Icon, id, defaultExpanded } = props;
  const [open, setOpen] = useState(defaultExpanded || false);

  return (
    <Accordion
      defaultExpanded={defaultExpanded || false}
      onChange={(evt, expanded) => {
        setOpen(expanded);
      }}
    >
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
      <AccordionDetails>
        <ContentContainer open={open}>{children}</ContentContainer>
      </AccordionDetails>
    </Accordion>
  );
};

export default Expando;
