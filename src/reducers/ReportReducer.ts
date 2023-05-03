export type ReportAction = {
  type: ReportActionType;
  payload: any;
};

export enum ReportActionType {
  UPDATE = 'UPDATE',
  SET_CHILDREN = 'SET_CHILDREN',
  SET_TABLES = 'SET_TABLES',
  SET_CHILD = 'SET_CHILD',
  SET_RULES = 'SET_RULES',
  SET_VALIDATION_RULES = 'SET_VALIDATION_RULES',
  HIDE_ROWS = 'HIDE_ROWS',
  RESET = 'RESET',
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
  errors: Errors;
  hide: boolean;
};

export type Errors = Error[];

export type Error = {
  row_id: number;
  columns_affected: string;
  la_level: string | null;
  rule_code: number;
  rule_description: string | null;
  rule_type: number;
  tables_affected: string;
  'Rule Message': string;
};

export type Rule = {
  'Rule Message': string;
  'Rule Code': number;
};

export type Rules = Rule[];

export type ValidationRule = {
  value: '';
  label: '';
};

export type Report = {
  children?: Children;
  rules?: Rules;
  filter?: string;
  tables?: any;
  userReport?: any;
  validationRules?: ValidationRule[];
};

export interface Children {
  [key: string]: any;
}

const parseChildren = (children: any, errors: any[]) => {
  const output: Children = {};

  Object.keys(children).forEach((childKey) => {
    const values = JSON.parse(children[childKey]);

    // get all children and dump them into the output
    values.forEach((value: any) => {
      if (!output[value.LAchildID]) {
        output[value.LAchildID] = { errors: {} };
      }
    });
  });

  JSON.parse(errors[0]).forEach((error: any) => {
    const match = `${error.rule_code} ${error.tables_affected}_${error.columns_affected}_${error.row_id}`;

    if (!error.LAchildID) {
      //TODO - these are Header errors
      return false;
    }

    const ruleMeta = JSON.parse(errors[1]).filter((rule: any) => {
      return rule['Rule code'] === error.rule_code;
    })[0];

    output[error.LAchildID].errors[match] = { ...error, ...ruleMeta };
  });

  Object.keys(children).forEach((childKey) => {
    const values = JSON.parse(children[childKey]);

    values.forEach((value: any) => {
      if (output[value.LAchildID]) {
        if (!output[value.LAchildID][childKey]) {
          output[value.LAchildID][childKey] = [value];
        } else {
          output[value.LAchildID][childKey].push(value);
        }
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

    case ReportActionType.SET_VALIDATION_RULES:
      newReportState.validationRules = reportAction.payload;
      return newReportState;

    case ReportActionType.SET_RULES:
      newReportState.rules = reportAction.payload;
      return newReportState;

    case ReportActionType.SET_TABLES:
      newReportState.tables = reportAction.payload.tables;
      return newReportState;

    case ReportActionType.SET_CHILDREN:
      newReportState.children = parseChildren(
        reportAction.payload.tables,
        reportAction.payload.errors
      );
      newReportState.userReport = JSON.parse(reportAction.payload.errors[3]);

      newReportState.tables = reportAction.payload.tables;

      return newReportState;

    case ReportActionType.SET_CHILD:
      return newReportState;

    case ReportActionType.HIDE_ROWS:
      if (!newReportState.children) {
        return newReportState;
      }

      newReportState.filter = reportAction.payload;

      Object.values(newReportState.children).forEach((childItem: Child) => {
        if (!childItem.CINdetails) {
          return false;
        }

        childItem.hide =
          childItem.CINdetails.LAchildID.indexOf(reportAction.payload) < 0;
      });

      return newReportState;
  }

  return newReportState;
};
