import React from "react";
import {
  ListItem,
  ListItemText,
  IconButton,
  ListItemAvatar,
  Avatar,
} from "@mui/material";

import { Delete, FilePresent } from "@mui/icons-material";

type FileItem = {
  name: string;
};

export type FileBody = {
  contents: unknown;
  file: File;
  id: string;
};

interface UploadItemProps {
  file: FileBody;
  onRemoveItem: (id: string) => void;
}

const UploadItem = (props: UploadItemProps) => {
  const { file, onRemoveItem } = props;

  return (
    <ListItem
      secondaryAction={
        <IconButton
          edge="end"
          aria-label="delete"
          onClick={() => {
            onRemoveItem(file.id);
          }}
        >
          <Delete />
        </IconButton>
      }
    >
      <ListItemAvatar>
        <Avatar>
          <FilePresent />
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={`${file.file.name}`}
        secondary={`${Math.floor(file.file.size / 1000)}kb`}
      />
    </ListItem>
  );
};

export default UploadItem;
