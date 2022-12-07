import { startCase } from "lodash";

export const pascalToReadable = (str: string): string => {
  return startCase(str);
};
