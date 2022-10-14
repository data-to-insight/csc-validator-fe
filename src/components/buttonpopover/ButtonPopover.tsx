import React, { ReactNode, useState, MouseEvent } from "react";
import { Button, Popover } from "@mui/material";

import { PopoverContent } from "./ButtonPopover.styles";

interface ButtonPopoverProps {
  children?: ReactNode;
  label: string;
}

const ButtonPopover = (props: ButtonPopoverProps) => {
  const { children, label } = props;

  const [popoverLoc, setPopoverLoc] = useState<HTMLButtonElement | null>(null);

  const handleClick = (evt: MouseEvent<HTMLButtonElement>) => {
    const newPopoverLoc = popoverLoc ? null : evt.currentTarget;
    setPopoverLoc(newPopoverLoc);
  };

  const handleClose = () => {
    setPopoverLoc(null);
  };

  const open = Boolean(popoverLoc);

  return (
    <>
      <Button variant="contained" size="small" onClick={handleClick}>
        {label}
      </Button>
      <Popover
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        open={open}
        anchorEl={popoverLoc}
        onClose={handleClose}
      >
        <PopoverContent>{children}</PopoverContent>
      </Popover>
    </>
  );
};

export default ButtonPopover;
