export type ReportAction = {
  type: ReportActionType;
  payload: any;
};

export enum ReportActionType {
  UPDATE = "UPDATE",
}

export const reportReducer = (reportState: any, reportAction: ReportAction) => {
  switch (reportAction.type) {
    case ReportActionType.UPDATE:
      const newState = { ...reportAction.payload };

      return newState;
  }
};
