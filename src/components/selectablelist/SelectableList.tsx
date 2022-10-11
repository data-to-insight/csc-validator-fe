import React, { useState, useEffect, useCallback } from "react";
import { Box, Button, List } from "@mui/material";

import ListItem, { SelectableListItem } from "./ListItem";

interface SelectableListProps {
  values: SelectableListItem[];
  onItemSelected: (itemsSelected: string[]) => void;
}

const SelectableList = (props: SelectableListProps) => {
  const { values, onItemSelected } = props;
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const handleClick = useCallback((value: SelectableListItem) => {
    setSelectedItems((prevSelectedItems) => {
      let newSelectedItems = [];

      if (prevSelectedItems.indexOf(value.value) > -1) {
        newSelectedItems = prevSelectedItems.filter((item) => {
          return item !== value.value;
        });
      } else {
        newSelectedItems = [value.value, ...prevSelectedItems];
      }

      onItemSelected(newSelectedItems);
      return newSelectedItems;
    });
  }, []);

  const handleSelectAllClick = () => {
    setSelectedItems(() => {
      const newSelectedItems = values.map((value) => {
        return value.value;
      });
      onItemSelected(newSelectedItems);
      return newSelectedItems;
    });
  };

  const handleUnSelectAllClick = () => {
    setSelectedItems(() => {
      onItemSelected([]);
      return [];
    });
  };

  return (
    <Box>
      <Button
        disableRipple
        disabled={selectedItems.length === values.length}
        onClick={handleSelectAllClick}
      >
        Select all
      </Button>
      <Button
        disableRipple
        disabled={selectedItems.length === 0}
        onClick={handleUnSelectAllClick}
      >
        Unselect all
      </Button>
      <List>
        {values.map((value: SelectableListItem, i) => {
          return (
            <ListItem
              onClick={handleClick}
              checked={selectedItems.indexOf(value.value) > -1}
              value={value}
            />
          );
        })}
      </List>
    </Box>
  );
};

export default SelectableList;
