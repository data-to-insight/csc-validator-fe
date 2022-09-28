export type FileAction = {
  type: FileActionType;
  payload: any;
};

export enum FileActionType {
  SET_FILES = "SET_FILES",
  CLEAR_FILES = "CLEAR_FILES",
}

export const fileReducer = (fileState: any, fileAction: FileAction) => {
  switch (fileAction.type) {
    case FileActionType.SET_FILES:
      const newState = { ...fileAction.payload };

      return newState;
  }
};
