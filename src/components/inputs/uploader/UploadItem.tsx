import React from "react";

export type FileBody = {
  contents: unknown;
  file: unknown;
  id: string;
};

interface UploadItemProps {
  file: FileBody;
  onRemoveItem: (id: string) => void;
}

const UploadItem = (props: UploadItemProps) => {
  const { file, onRemoveItem } = props;

  return (
    <p>
      <span
        onClick={(evt) => {
          evt.preventDefault();
          onRemoveItem(file.id);
        }}
      >
        x
      </span>{" "}
      {file.id}
    </p>
  );
};

export default UploadItem;
