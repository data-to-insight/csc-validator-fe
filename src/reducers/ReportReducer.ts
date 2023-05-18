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

// export type Child = {
//   LAchildID: string;
//   Assessments: any;
//   CINdetails: any;
//   CINplanDates: any;
//   ChildCharacteristics: any;
//   ChildIdentifiers: any;
//   ChildProtectionPlans: any;
//   Disabilities: any;
//   Header: any;
//   Reviews: any;
//   Section47: any;
//   errors: Errors;
//   hide: boolean;
// };

export type Child = {
  CHILD: string;
  Header: any;
  Episodes: any;
  Reviews: any;
  UASC: any;
  OC2: any;
  OC3: any;
  AD1: any;
  PlacedAdoption: any;
  PrevPerm: any;
  Section47: any;
  Missing: any;
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
  laWide?: any;
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
      // TODO regularise this to either use (CHILD or child_id) or LAchildID
      if (!output[value.CHILD]) {
        output[value.CHILD] = { errors: {} };
      }
    });
  });

  JSON.parse(errors[0]).forEach((error: any) => {
    const match = `${error.rule_code} ${error.tables_affected}_${error.columns_affected}_${error.row_id}`;

    // TODO this check is not necessary for LAC
    if (!error.child_id) {
      //TODO - these are Header errors
      return false;
    }

    // const ruleMeta = JSON.parse(errors[1]).filter((rule: any) => {
    //   return rule['Rule code'] === error.rule_code;
    // })[0];

    // output[error.LAchildID].errors[match] = { ...error, ...ruleMeta };
    output[error.child_id].errors[match] = { ...error };
  });

  Object.keys(children).forEach((childKey) => {
    const values = JSON.parse(children[childKey]);

    values.forEach((value: any) => {
      if (output[value.CHILD]) {
        if (!output[value.CHILD][childKey]) {
          output[value.CHILD][childKey] = [value];
        } else {
          output[value.CHILD][childKey].push(value);
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
      // newReportState.laWide = JSON.parse(reportAction.payload.errors[1]);

      newReportState.tables = reportAction.payload.tables;

      return newReportState;

    case ReportActionType.SET_CHILD:
      return newReportState;

    case ReportActionType.HIDE_ROWS:
      if (!newReportState.children) {
        return newReportState;
      }

      newReportState.filter = reportAction.payload;

      // Object.values(newReportState.children).forEach((childItem: LAchildID) => {
      //   if (!childItem.CINdetails) {
      //     return false;
      //   }

      //   childItem.hide =
      //     childItem.CINdetails.LAchildID.indexOf(reportAction.payload) < 0;
      // });

      // Object.values(newReportState.children).forEach((childItem: child_id) => {
      //   if (!childItem.Header) {
      //     return false;
      //   }

      //   childItem.hide =
      //     childItem.Header.child_id.indexOf(reportAction.payload) < 0;
      // });

      return newReportState;
  }

  return newReportState;
};
