export type ReportAction = {
  type: ReportActionType;
  payload: any;
};

export enum ReportActionType {
  UPDATE = "UPDATE",
  SET_REPORTS = "SET_REPORTS",
  SET_ERRORS = "SET_ERRORS",
  HIDE_ROWS = "HIDE_ROWS",
  RESET = "RESET",
}

export type ReportItem = {
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

export type ReportEntry = {
  code: string;
  entries: IReportDataEntries;
  display: boolean;
  count: number;
};

interface IReportDataBody {
  [key: string]: ReportItem[];
}

interface IReportDataEntries {
  [key: string]: ReportItem;
}

interface IReportCombined {
  [key: string]: ReportEntry;
}

/**
 * 
 *  "tables_affected":"Header",
      "columns_affected":"ReferenceDate",
      "ROW_ID":"0",
      "rule_code":100,
      "rule_type":0,
      "ERROR_ID":"nan"
 */

type Error = {
  tables_affected: string;
  ROW_ID: string;
  rule_code: number;
  rule_type: number;
  ERROR_ID: string;
};

export type Report = {
  reportList?: IReportCombined;
  reportFilter?: string;
  errorList?: Error[];
};

const calculateErrors = (item: ReportItem): number => {
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
  const output: IReportCombined = {};

  console.log(reports);

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
  reportState: Report,
  reportAction: ReportAction
): Report => {
  let newReportState = { ...reportState };

  switch (reportAction.type) {
    case ReportActionType.RESET:
      return {};

    case ReportActionType.UPDATE:
      newReportState = { ...reportAction.payload };
      return newReportState;

    case ReportActionType.SET_REPORTS:
      const tempReportList = mergeReports(reportAction.payload);

      newReportState.reportList = tempReportList;
      return newReportState;

    case ReportActionType.SET_ERRORS:
      newReportState.errorList = reportAction.payload;
      return newReportState;

    case ReportActionType.HIDE_ROWS:
      if (!newReportState.reportList) {
        return {};
      }
      newReportState.reportFilter = reportAction.payload;
      Object.values(newReportState.reportList).forEach(
        (errorItem: ReportEntry) => {
          if (errorItem.code.indexOf(reportAction.payload) > -1) {
            errorItem.display = true;
          } else {
            errorItem.display = false;
          }
        }
      );

      return newReportState;
  }

  return newReportState;
};
