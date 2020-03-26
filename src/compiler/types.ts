export type LexemeScheme = {
  literals: Array<string>;
  code: number;
  omit?: boolean;
  compound?: boolean;
  composerToken?: boolean;
};

export type Lexeme = {
  value: string;
  code: number;
  omit?: boolean;
  compound?: boolean;
  composerToken?: boolean;
};

export type Injections = Array<any> | Record<any, any>;

export type CompilerMeta = {
  injections: Injections;
};

export type ValidatorWithParams = {
  name: string;
  params: Array<any>;
};

export type ValidatorData = string | ValidatorWithParams;