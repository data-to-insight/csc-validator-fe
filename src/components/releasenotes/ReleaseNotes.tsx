/** @jsxImportSource @emotion/react */

import React from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import { ExpandMore, Description } from "@mui/icons-material";

import { ReleaseNotesLayout } from "./ReleaseNotes.styles";

const ReleaseNotes = () => {
  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMore />}
        aria-controls="release-notes-content"
        id="release-notes-content-header"
      >
        <Description css={ReleaseNotesLayout.icon} />
        <Typography>Release notes:</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>
          These are the release notes - they will be derived from Git on build
          and release.
        </Typography>
      </AccordionDetails>
    </Accordion>
  );
};

export default ReleaseNotes;
