export type FileAction = {
  type: FileActionType;
  payload: any;
};

export enum FileActionType {
  SET_FILES = "SET_FILES",
  SET_THIS_YEAR = "SET_THIS_YEAR",
  CLEAR_FILES = "CLEAR_FILES",
}

export const fileReducer = (fileState: any, fileAction: FileAction) => {
  let newState;

  switch (fileAction.type) {
    case FileActionType.CLEAR_FILES:
      return {};

    case FileActionType.SET_THIS_YEAR:
      newState = { ...fileState };
      if (Object.keys(fileAction.payload).length < 1) {
        newState = {};
      } else {
        newState.thisYear = fileAction.payload;
      }

      return newState;

    case FileActionType.SET_FILES:
      newState = { ...fileAction.payload };

      return newState;
  }
};
