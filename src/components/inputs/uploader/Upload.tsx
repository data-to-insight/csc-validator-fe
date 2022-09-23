import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import UploadItem, { FileBody } from "./UploadItem";

interface UploadProps {
  onUploadReady: (files: FileList) => void;
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
  const { onUploadReady } = props;
  const [uploadReady, setUploadReady] = useState(false);
  const [fileList, setFileList] = useState<FileList>({});

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
    setFileList(newFileList);
  };

  const onDrop = (acceptedFiles: unknown[]) => {
    console.log(fileList);

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
        setFileList(newFileList);
      };

      fileReader.readAsArrayBuffer(file as Blob);
    });
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div>
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
    </div>
  );
};

export default Upload;
