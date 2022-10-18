import React from "react";
import { useDropzone } from "react-dropzone";
import { Box, Paper } from "@mui/material";

import UploadItem, { FileBody } from "./UploadItem";

interface UploadProps {
  onUploadReady: (files: FileList) => void;
  fileList: FileList;
}

export interface FileList {
  [key: string]: FileBody | undefined;
}

type FileHandle = {
  path: string;
  size: number;
  lastModified: number;
};

const getFileId = (file: FileHandle) => {
  return `${file.path}_${file.lastModified}_${file.size}`;
};

const Upload = (props: UploadProps) => {
  const { onUploadReady, fileList } = props;

  const onRemoveFile = (id: string) => {
    const newFileList: FileList = {};
    if (Object.keys(fileList).length > 0) {
      Object.values(fileList).forEach((fileListItem) => {
        if (fileListItem && fileListItem.id !== id) {
          newFileList[fileListItem.id] = fileListItem;
        }
      });
    }

    onUploadReady(newFileList);
  };

  const onDrop = (acceptedFiles: unknown[]) => {
    acceptedFiles.forEach((file) => {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        const contents = fileReader.result;
        const id = getFileId(file as FileHandle);

        const newFileList = { ...fileList };
        console.log(newFileList);

        newFileList[id] = {
          file,
          contents,
          id,
        };

        onUploadReady(newFileList);
      };

      fileReader.readAsArrayBuffer(file as Blob);
    });
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <Box>
      <Paper>
        <div {...getRootProps()}>
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>Drop the files here ...</p>
          ) : (
            <p>Drag 'n' drop some files here, or click to select files</p>
          )}
        </div>
        <div>
          {Object.values(fileList).map((fileListItem) => {
            if (fileListItem) {
              return (
                <UploadItem
                  key={fileListItem.id}
                  file={fileListItem}
                  onRemoveItem={onRemoveFile}
                ></UploadItem>
              );
            }

            return null;
          })}
        </div>
      </Paper>
    </Box>
  );
};

export default Upload;
