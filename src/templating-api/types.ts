import { ValidatorError } from '@lib/base-api/types';

export type LexemeScheme = {
  literals: string;
  code: number;
  omit?: boolean;
  compound?: boolean;
  omitToken?: boolean;
};

export type Lexeme = {
  value: string;
  code: number;
  omit?: boolean;
  compound?: boolean;
  omitToken?: boolean;
};

export type Injections = Array<any> | Record<string, any>;

export type Errors = Array<ValidatorError> | Record<string, ValidatorError>;

export type CompilerMeta = {
  path: Array<string | number>;
  validator?: string;
  params: Array<any>;
  deps?: string;
  logs?: string;
  asyncStack?: string;
};

export type ValidatorData = {
  code: number;
  code2?: number;
  value: string;
  params?: Array<ValidatorData>;
  error?: number | string;
};

export type CompilerProps = {
  in: string;
  out: string;
  errors?: string;
  meta?: CompilerMeta;
  components: Map<number, any>;
  name: () => string;
  content?: (props: CompilerProps) => Array<string>;
};