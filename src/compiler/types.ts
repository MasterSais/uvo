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