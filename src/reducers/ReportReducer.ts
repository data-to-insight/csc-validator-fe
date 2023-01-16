export type ReportAction = {
  type: ReportActionType;
  payload: any;
};

export enum ReportActionType {
  UPDATE = "UPDATE",
  SET_CHILDREN = "SET_CHILDREN",
  SET_CHILD = "SET_CHILD",
  SET_RULES = "SET_RULES",
  HIDE_ROWS = "HIDE_ROWS",
  RESET = "RESET",
}

export type Child = {
  LAChildId: string;
  Assessments: any;
  CINdetails: any;
  CINplanDates: any;
  ChildCharacteristics: any;
  ChildIdentifiers: any;
  ChildProtectionPlans: any;
  Disabilities: any;
  Header: any;
  Reviews: any;
  Section47: any;
  Errors: Errors;
  hide: boolean;
};

export type Errors = Error[];

export type Error = {
  ERROR_ID: string | null;
  ROW_ID: string;
  columns_affected: string;
  la_level: string | null;
  rule_code: number;
  rule_description: string | null;
  rule_type: number;
  tables_affected: string;
};

export type Rule = {
  "Rule Message": string;
  "Rule Code": number;
};

export type Rules = Rule[];

export type Report = {
  children?: Children;
  rules?: Rules;
  filter?: string;
};

export interface Children {
  [key: string]: any;
}

const parseChildren = (children: any, errors: any[]) => {
  const output: Children = {};

  Object.keys(children).forEach((childKey) => {
    const values = JSON.parse(children[childKey]);

    values.forEach((value: any) => {
      if (!output[value.LAchildID]) {
        output[value.LAchildID] = { hide: false };
      }

      output[value.LAchildID][childKey] = value;
    });
  });

  JSON.parse(errors[0]).forEach((error: any) => {
    if (!error.LAchildID) {
      //TODO - these are LA wide errors
      return false;
    }
    //this is where Tambe's change to the error structure needs to be mapped. LAchildID is a guess...
    if (!output[error.LAchildID].errors) {
      output[error.LAchildID].errors = [];
    }

    output[error.LAchildID].errors.push(error);
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

    case ReportActionType.SET_RULES:
      newReportState.rules = reportAction.payload;
      return newReportState;

    case ReportActionType.SET_CHILDREN:
      newReportState.children = parseChildren(
        reportAction.payload.tables,
        reportAction.payload.errors
      );

      return newReportState;

    case ReportActionType.SET_CHILD:
      return newReportState;

    case ReportActionType.HIDE_ROWS:
      if (!newReportState.children) {
        return newReportState;
      }

      newReportState.filter = reportAction.payload;

      Object.values(newReportState.children).forEach((childItem: Child) => {
        childItem.hide =
          childItem.CINdetails.LAchildID.indexOf(reportAction.payload) < 0;
      });

      return newReportState;
  }

  return newReportState;
};
