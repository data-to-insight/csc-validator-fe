import React, { memo } from "react";
import {
  ListItem as MuiListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Checkbox,
} from "@mui/material";

export type SelectableListItem = {
  value: string;
  label: string;
};

interface ListItemProps {
  value: SelectableListItem;
  checked: boolean;
  onClick: (value: SelectableListItem) => void;
}

const ListItem = (props: ListItemProps) => {
  const { value, onClick, checked } = props;

  return (
    <MuiListItem disablePadding key={"listitem" + value.value}>
      <ListItemButton
        disableRipple
        onClick={() => {
          onClick(value);
        }}
      >
        <ListItemIcon>
          <Checkbox disableRipple checked={checked} />
        </ListItemIcon>
        <ListItemText>{value.label}</ListItemText>
      </ListItemButton>
    </MuiListItem>
  );
};

export default memo(ListItem, (next, prev) => next.checked === prev.checked);
