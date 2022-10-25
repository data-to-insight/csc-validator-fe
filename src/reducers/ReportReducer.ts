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

export type ReportErrorItem = {
  code: string;
  errors: string;
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
  [key: string]: string | number | null;
};

export type ReportErrorEntry = {
  code: string;
  entries: IReportDataEntries;
  display: boolean;
  count: number;
};

interface IReportDataBody {
  [key: string]: ReportErrorItem[];
}

interface IReportDataEntries {
  [key: string]: ReportErrorItem;
}

interface IReportErrorCombined {
  [key: string]: ReportErrorEntry;
}

export type ReportErrors = {
  errorList?: IReportErrorCombined;
  errorFilter?: string;
};

const calculateErrors = (item: ReportErrorItem): number => {
  let total = 0;
  const meta = ["code", "errors", "Index", "SDQ_SCORE", "DOB"];

  Object.keys(item).forEach((key) => {
    if (meta.indexOf(key) < 0) {
      total += parseInt(item[key] as string) || 0;
    }
  });

  return total;
};

const mergeReports = (reports: IReportDataBody) => {
  const keys = Object.keys(reports);
  const output: IReportErrorCombined = {};

  keys.forEach((key) => {
    const report = reports[key];

    report.forEach((reportEntry) => {
      if (output[reportEntry.code]) {
        output[reportEntry.code].entries[key] = { ...reportEntry };
        output[reportEntry.code].count =
          output[reportEntry.code].count + calculateErrors({ ...reportEntry });
      } else {
        const entries: IReportDataEntries = {};
        entries[key] = { ...reportEntry };

        output[reportEntry.code] = {
          code: reportEntry.code,
          entries,
          display: true,
          count: calculateErrors({ ...reportEntry }),
        };
      }
    });
  });

  return output;
};

export const reportReducer = (
  reportState: ReportErrors,
  reportAction: ReportAction
): ReportErrors => {
  let newReportState = { ...reportState };

  switch (reportAction.type) {
    case ReportActionType.RESET:
      return {};

    case ReportActionType.UPDATE:
      newReportState = { ...reportAction.payload };
      return newReportState;

    case ReportActionType.SET_REPORT_ERRORS:
      const tempErrorList = mergeReports(reportAction.payload);

      newReportState.errorList = tempErrorList;
      return newReportState;

    case ReportActionType.HIDE_ROWS:
      if (!newReportState.errorList) {
        return {};
      }
      newReportState.errorFilter = reportAction.payload;
      Object.values(newReportState.errorList).forEach(
        (errorItem: ReportErrorEntry) => {
          if (errorItem.code.indexOf(reportAction.payload) > -1) {
            errorItem.display = true;
          } else {
            errorItem.display = false;
          }
        }
      );

      return newReportState;
  }
};
