export type FileAction = {
  type: FileActionType;
  payload: any;
  year: string;
};

export enum FileActionType {
  ADD_FILES = "ADD_FILES",
  SET_FILES = "SET_FILES",
  CLEAR_FILES = "CLEAR_FILES",
}

export const initialData = {};

export const fileReducer = (fileState: any, fileAction: FileAction) => {
  let newState;

  switch (fileAction.type) {
    case FileActionType.CLEAR_FILES:
      return {};

    case FileActionType.ADD_FILES:
      newState = { ...fileState };
      console.log(fileAction.year, fileAction.payload);
      if (Object.keys(fileAction.payload).length < 1) {
        newState[fileAction.year] = [];
      } else {
        newState[fileAction.year] = fileAction.payload;
      }

      return newState;

    case FileActionType.SET_FILES:
      newState = { ...fileAction.payload };

      return newState;
  }
};
