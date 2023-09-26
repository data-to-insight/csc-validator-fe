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
  errorList?: string[];
  hide: boolean;
  id: string;
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
  allErrors?: ErrorList;
  selectedError?: string;
  selectedErrorKey?: string;
};

export interface Children {
  [key: string]: any;
}

export interface AllErrors {
  [key: string]: any;
}

export type ErrorList = any[][];

export const getChildAccessConfig = (children: any) => {
  const keys = Object.keys(children as Object).filter((key) => {
    return key !== 'Header' && key !== 'errors';
  });
  const childKey = keys[0];

  const child = Object.keys(JSON.parse(children[childKey])[0]);

  let childIDKey = 'LAchildID';

  if (child.indexOf('CHILD') > -1) {
    childIDKey = 'CHILD';
  }

  if (child.indexOf('child_id') > -1) {
    childIDKey = 'child_id';
  }

  return {
    childKey,
    childIDKey,
  };
};

const parseChildren = (children: any, errors: any) => {
  const output: Children = {};
  const allErrors: AllErrors = {};

  const childAccessKeys = getChildAccessConfig(children);

  Object.keys(children).forEach((childKey) => {
    const values = JSON.parse(children[childKey]);

    // get all children and dump them into the output
    values.forEach((value: any) => {
      if (!output[value[childAccessKeys.childIDKey]]) {
        output[value[childAccessKeys.childIDKey]] = {
          errors: {},
          errorList: [],
          id: value[childAccessKeys.childIDKey],
        };
      }
    });
  });

  JSON.parse(errors.issue_locations[0]).forEach((error: any) => {
    const match = `${error.rule_code} ${error.tables_affected}_${error.columns_affected}_${error.row_id}`;

    const subChildAccessKey = 'child_id';
    //console.log(error, subChildAccessKey);
    // TODO this check is not necessary for LAC
    if (!error[subChildAccessKey]) {
      //TODO - these are Header errors
      return false;
    }

    if (!allErrors[error.rule_code]) {
      allErrors[error.rule_code] = {
        description: error.rule_description,
        count: 1,
      };
    } else {
      allErrors[error.rule_code].count = allErrors[error.rule_code].count + 1;
    }

    output[error[subChildAccessKey]].errors[match] = { ...error };
    output[error[subChildAccessKey]].errorList.push(error.rule_code);
  });

  Object.keys(children).forEach((childKey) => {
    const values = JSON.parse(children[childKey]);

    values.forEach((value: any) => {
      if (output[value[childAccessKeys.childIDKey]]) {
        if (!output[value[childAccessKeys.childIDKey]][childKey]) {
          output[value[childAccessKeys.childIDKey]][childKey] = [value];
        } else {
          output[value[childAccessKeys.childIDKey]][childKey].push(value);
        }
      }
    });
  });

  return {
    children: output,
    allErrors,
  };
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
      const parsedValues = parseChildren(
        reportAction.payload.tables[0],
        reportAction.payload.errors
      );

      newReportState.children = parsedValues.children;
      newReportState.allErrors = Object.keys(parsedValues.allErrors).map(
        (key) => {
          return [
            key,
            parsedValues.allErrors[key].description,
            parsedValues.allErrors[key].count,
          ];
        }
      );

      newReportState.userReport = reportAction.payload.errors.user_report;

      newReportState.tables = reportAction.payload.tables;

      newReportState.filter = '';

      return newReportState;

    case ReportActionType.SET_CHILD:
      return newReportState;

    case ReportActionType.HIDE_ROWS:
      if (!newReportState.children) {
        return newReportState;
      }

      newReportState.filter = reportAction.payload.filter;
      newReportState.selectedError = reportAction.payload.selectedError;
      newReportState.selectedErrorKey = reportAction.payload.selectedErrorKey;

      if (!newReportState.children || newReportState.children === undefined) {
        return newReportState;
      }

      Object.keys(newReportState.children).forEach((childKey: string) => {
        if (newReportState.children) {
          console.log(childKey.indexOf(reportAction.payload.filter) < 0);

          const child = newReportState.children[childKey];
          child.hide = childKey.indexOf(reportAction.payload.filter) < 0;

          // is this child also subject to an error filter?
          if (reportAction.payload.selectedError && !child.hide) {
            if (
              child.errorList.indexOf(
                reportAction.payload.selectedError.toString()
              ) < 0
            ) {
              child.hide = true;
            }
          }
        }
      });

      console.log(newReportState);

      return newReportState;
  }
};
