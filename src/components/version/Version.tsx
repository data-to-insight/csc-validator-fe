import React, { PropsWithChildren } from "react";
import { Version as VersionDiv } from "./Version.styles";
import { Typography } from "@mui/material";

type VersionProps = {
  versionNumber: string;
  sourceLink: string;
};

const Version = (props: PropsWithChildren<VersionProps>) => {
  const { versionNumber, sourceLink } = props;

  return (
    <VersionDiv>
      <Typography variant="body2">
        v{versionNumber} -{" "}
        <a href={sourceLink} target="_blank" rel="noreferrer">
          {sourceLink}
        </a>
      </Typography>
    </VersionDiv>
  );
};

export default Version;
