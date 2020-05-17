import { CompilerProps, ValidatorData } from '@lib/templating-api/types';

export const NO_PARAMS: number = 1;

export const SEQUENCE_PARAMS: number = 2;

export const COMMA_SEPARATED_PARAMS: number = 4;

export const FIRST_COMMA_PARAMS: number = 8;

export const check = (_props: CompilerProps, _data: ValidatorData, _errorCodes: number) => {
  return 0;
};