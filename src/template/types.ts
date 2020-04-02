export type LexemeScheme = {
  literals: Array<string>;
  code: number;
  omit?: boolean;
  compound?: boolean;
  omitToken?: boolean;
};

export type Lexeme = {
  value: string;
  codes: Array<number>;
  omit?: boolean;
  compound?: boolean;
  omitToken?: boolean;
};

export type Injections = Array<any> | Record<any, any>;

export type CompilerMeta = {
  injections: Injections;
  errors: Injections;
};

export type ValidatorData = {
  code: number;
  value: string;
  params: Array<any>;
  error?: number | string;
};