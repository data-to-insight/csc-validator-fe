export type ReportAction = {
  type: ReportActionType;
  payload: any;
};

export enum ReportActionType {
  UPDATE = "UPDATE",
  SET_REPORT_ERRORS = "SET_REPORT_ERRORS",
  HIDE_ROWS = "HIDE_ROWS",
  RESET = "RESET",
}

type ReportErrorItem = {
  code: string;
  errors: string;
  display: boolean;
  Index: 1289;
  DOB: string;
  SDQ_SCORE: string | null;
  SDQ_REASON: string;
  CONVICTED: string;
  HEALTH_CHECK: string;
  IMMUNISATIONS: string;
  TEETH_CHECK: string;
  HEALTH_ASSESSMENT: string;
  SUBSTANCE_MISUSE: string;
  INTERVENTION_RECEIVED: string;
  INTERVENTION_OFFERED: string;
};

export type ReportData = {
  errorList: ReportErrorItem[];
};

export const reportReducer = (reportState: any, reportAction: ReportAction) => {
  let newReportState = { ...reportState };

  switch (reportAction.type) {
    case ReportActionType.RESET:
      return {};

    case ReportActionType.UPDATE:
      newReportState = { ...reportAction.payload };
      return newReportState;

    case ReportActionType.SET_REPORT_ERRORS:
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
