import { Error } from '@lib/base-api/types';

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

export type Errors = Array<Error> | Record<string, Error>;

export type CompilerMeta = {
  injections: Injections;
  errors: Injections;
};

export type ValidatorData = {
  code: number;
  value: string;
  params: Array<any>;
  error?: number | string;
  state?: number;
};

export type CompilerProps = {
  in: string;
  out: string;
  err: boolean;
  name: () => string;
};