/** @jsxImportSource @emotion/react */
/* eslint-disable react-hooks/exhaustive-deps */

import React, { useState, useEffect } from 'react';

import {
  ReportActionType,
  ValidationRule,
  Report,
} from 'reducers/ReportReducer';
import { FileActionType } from 'reducers/FileReducer';

import { generateCSV } from 'utils/file/generateCSV';

import { RouteProps, RouteValue, Tool } from '../../Router';

import { downloadFile } from 'utils/file/download';
import LoadDataCIN from './LoadDataCIN';
import LoadData903 from './LoadData903';

export enum FileYear {
  THIS_YEAR = 'this year',
  PREVIOUS_YEAR = 'previous year',
}

interface LoadDataPageProps extends RouteProps {
  handleRouteChange: (route: RouteValue) => void;
}

type Rule = {
  value: string;
  label: string;
};

export interface LoadDataViewProps {
  getTotalFilesLength: () => number;
  data: Report;
  handleResetClick: () => void;
  handleNextClick: (rpcName: string, fileObject: any, args?: any) => void;
  handleGenerateCSVClick: () => void;
  selectedValidationRules: string[];
  fileDispatch: React.Dispatch<any>;
  fileState: any;
  loading: boolean;
  loadingMessage: string;
  validationRules: ValidationRule[] | undefined;
  getValidationRulesSummary: () => string;
  getInitialSelectedRuleState: (rules: ValidationRule[]) => string[];
  setSelectedValidationRules: (rules: string[]) => void;
}

const LoadData = (props: LoadDataPageProps) => {
  const { dispatch, api, fileState, fileDispatch, data } = props;
  const validationRules = data.validationRules;

  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');

  useEffect(() => {
    const init = async () => {
      setLoadingMessage('Loading rules');
      setLoading(true);

      const rules = await api.call('get_rules', {});
      const parsedRules = JSON.parse(rules).map(
        (rule: { code: string; description: string }) => {
          return {
            value: rule.code,
            label: rule.description,
          };
        }
      );

      dispatch({
        type: ReportActionType.SET_VALIDATION_RULES,
        payload: parsedRules,
      });

      setSelectedValidationRules(getInitialSelectedRuleState(parsedRules));
      setLoading(false);
    };

    init();
  }, []);

  const getInitialSelectedRuleState = (rules: Rule[]): string[] => {
    if (rules.length === 0) {
      return [];
    }

    return rules.map((rule) => rule.value);
  };

  const [selectedValidationRules, setSelectedValidationRules] = useState<
    string[]
  >([]);

  const handleResetClick = () => {
    dispatch({ type: ReportActionType.RESET, payload: {} });
    fileDispatch({ type: FileActionType.CLEAR_FILES, payload: {}, year: '' });
  };

  const generateCSVFile = (tables: any): void => {
    Object.keys(tables).forEach((table) => {
      const output = generateCSV(Object.values(JSON.parse(tables[table])));

      if (output) {
        downloadFile(output, `${table}.csv`);
      }
    });
  };

  const getTotalFilesLength = (): number => {
    return Object.values(fileState).reduce((prevVal, currVal) => {
      return (prevVal as number) + Object.values(currVal as Object).length;
    }, 0) as number;
  };

  const handleNextClick = async (
    rpcName: string,
    fileObject: any,
    args?: any
  ) => {
    if (api) {
      try {
        setLoadingMessage('Running analysis, this may take some time');
        setLoading(true);

        const errorArgs: any[] = [fileObject];

        if (args) {
          errorArgs.push(args);
        }

        if (selectedValidationRules.length > 0) {
          errorArgs.push(selectedValidationRules);
        }

        const errors = await api.call(rpcName, errorArgs);

        if (args && args.collectionYear) {
          errorArgs.push(args.collectionYear);
        }

        const tables: any = errors.data_tables;

        setLoading(false);
        dispatch({
          type: ReportActionType.SET_CHILDREN,
          payload: { tables, errors },
        });

        props.handleRouteChange(RouteValue.REPORT);
      } catch (ex) {
        setLoading(false);
        console.log('API add_files request failed', ex);
        alert('Something went wrong!');
      }
    }
  };

  const handleGenerateCSVClick = async () => {
    if (api && fileState && data) {
      if (!data.tables) {
        const file = fileState['2023'];

        try {
          setLoadingMessage('Generating CSV file');
          setLoading(true);

          const fileObject: any = Object.values(file)[0] as any;
          const tables = await api.call('generate_tables', fileObject.file);
          setLoading(false);

          generateCSVFile(tables);

          dispatch({
            type: ReportActionType.SET_TABLES,
            payload: { tables },
          });
        } catch (ex) {
          setLoading(false);
          console.log('API add_files request failed', ex);
          alert('Something went wrong!');
        }
      }
    } else {
      generateCSVFile(data.tables);
    }
  };

  const getValidationRulesSummary = () => {
    if (!validationRules) {
      return '';
    }

    const totalRulesLength = validationRules.length;
    const selectedRulesLength = selectedValidationRules.length;
    const unselectedRulesLength = totalRulesLength - selectedRulesLength;

    return `${selectedRulesLength} selected, ${unselectedRulesLength} unselected`;
  };

  const transferProps = {
    getTotalFilesLength,
    data,
    handleResetClick,
    handleNextClick,
    handleGenerateCSVClick,
    selectedValidationRules,
    fileDispatch,
    fileState,
    loading,
    loadingMessage,
    validationRules,
    getValidationRulesSummary,
    getInitialSelectedRuleState,
    setSelectedValidationRules,
  };

  return (
    <div>
      {props.tool === Tool.ToolCIN ? (
        <LoadDataCIN {...transferProps} />
      ) : (
        <LoadData903 {...transferProps} />
      )}
    </div>
  );
};

export default LoadData;
