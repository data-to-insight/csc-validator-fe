export type ReportAction = {
  type: ReportActionType;
  payload: any;
};

export enum ReportActionType {
  UPDATE = "UPDATE",
  SET_ERRORS = "SET_ERRORS",
  HIDE_ROWS = "HIDE_ROWS",
}

type ReportErrorItem = {
  code: string;
  errors: string;
  display: boolean;
};

export type ReportData = {
  errorList: ReportErrorItem[];
};

export const reportReducer = (reportState: any, reportAction: ReportAction) => {
  let newReportState = { ...reportState };

  switch (reportAction.type) {
    case ReportActionType.UPDATE:
      newReportState = { ...reportAction.payload };
      return newReportState;

    case ReportActionType.SET_ERRORS:
      newReportState.errorList = reportAction.payload;
      return newReportState;

    case ReportActionType.HIDE_ROWS:
      const newErrorList = newReportState.errorList.map(
        (errorItem: ReportErrorItem) => {
          const output = { ...errorItem };

          if (errorItem.code.indexOf(reportAction.payload) > -1) {
            output.display = true;
          } else {
            output.display = false;
          }

          return output;
        }
      );

      newReportState.errorList = newErrorList;
      return newReportState;
  }
};
