export type ReportAction = {
  type: ReportActionType;
  payload: any;
};

export enum ReportActionType {
  UPDATE = "UPDATE",
  SET_CHILDREN = "SET_CHILDREN",
  SET_CHILD = "SET_CHILD",
  HIDE_ROWS = "HIDE_ROWS",
  RESET = "RESET",
}

export type ReportItem = {
  code: string;
  errors: string;
  errorList: Error[];
  count: number;
  Index: 1289;
  childData: any;
  hide?: boolean;
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
  [key: string]: string | number | null | boolean | undefined | Error[];
};

export type Error = {
  tables_affected: string;
  columns_affected: string;
  ROW_ID: string;
  rule_code: number;
  rule_type: number;
  ERROR_ID: string;
};

export type Report = {
  reportList?: ReportItem[];
  reportFilter?: string;
};

const addChildToChildren = (
  childId: string,
  childData: any,
  reportList: ReportItem[]
): ReportItem[] => {
  return reportList.map((reportItem: ReportItem) => {
    const output = { ...reportItem };

    if (reportItem.code === childId && !reportItem.childData) {
      reportItem.childData = childData;
    }

    return output;
  });
};

//temporary - this is for sample data only; need a better solution at BE for live data
const combineChildrenErrors = (children: ReportItem[], errors: Error[]) => {
  const combined = children.map((child) => {
    const newChild = { ...child, errorList: errors, count: errors.length };
    return newChild;
  });

  return combined;
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

    case ReportActionType.SET_CHILDREN:
      newReportState.reportList = combineChildrenErrors(
        reportAction.payload.children,
        reportAction.payload.errors
      );
      return newReportState;

    case ReportActionType.SET_CHILD:
      console.log("child dispatch...");
      if (newReportState.reportList) {
        newReportState.reportList = addChildToChildren(
          reportAction.payload.childId,
          reportAction.payload.childData,
          newReportState.reportList
        );
      }

      return newReportState;

    case ReportActionType.HIDE_ROWS:
      if (!newReportState.reportList) {
        return {};
      }

      newReportState.reportFilter = reportAction.payload;
      newReportState.reportList.forEach((childItem: ReportItem) => {
        childItem.hide = childItem.code.indexOf(reportAction.payload) < 0;
      });

      return newReportState;
  }

  return newReportState;
};
