import React, { useState } from "react";
import {
  Checkbox,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

type SelectableListItem = {
  value: string;
  label: string;
};

interface SelectableListProps {
  values: SelectableListItem[];
  onItemSelected: (itemsSelected: string[]) => void;
}

const SelectableList = (props: SelectableListProps) => {
  const { values, onItemSelected } = props;
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const handleClick = (value: SelectableListItem) => {
    let newSelectedItems = [];

    if (selectedItems.indexOf(value.value) > -1) {
      newSelectedItems = selectedItems.filter((selectedItem) => {
        return selectedItem !== value.value;
      });
    } else {
      newSelectedItems = [value.value, ...selectedItems];
    }

    setSelectedItems(newSelectedItems);
    onItemSelected(newSelectedItems);
  };

  return (
    <List>
      {values.map((value: SelectableListItem, i) => {
        return (
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => {
                handleClick(value);
              }}
            >
              <ListItemIcon>
                <Checkbox checked={selectedItems.indexOf(value.value) > -1} />
              </ListItemIcon>
              <ListItemText>{value.label}</ListItemText>
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
};

export default SelectableList;
