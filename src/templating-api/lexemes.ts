import { Lexeme, LexemeScheme } from '@lib/templating-api/types';

export const lexemeBase = new Map<string, Array<Lexeme>>();

let code = -1;

const makeLexeme = (literals: string, omitToken?: boolean, omit?: boolean, compound?: boolean): LexemeScheme => {
  const scheme: LexemeScheme = { literals, code: ++code, omitToken, omit, compound };

  for (const literal of literals) {
    const lexemes: Array<Lexeme> = lexemeBase.get(literal);

    const lexeme: Lexeme = { code, value: literal, compound, omit, omitToken };

    lexemes
      ? lexemes.push(lexeme)
      : lexemeBase.set(literal, [lexeme]);
  }

  return scheme;
};

export const VLD: LexemeScheme = makeLexeme('@');

export const ERR: LexemeScheme = makeLexeme('!');

export const INJ: LexemeScheme = makeLexeme('$');

export const CND: LexemeScheme = makeLexeme('?');

export const REF: LexemeScheme = makeLexeme('#');

export const CNT: LexemeScheme = makeLexeme('~');

export const LRB: LexemeScheme = makeLexeme('(', true);

export const RRB: LexemeScheme = makeLexeme(')', true);

export const SQ: LexemeScheme = makeLexeme('\'');

export const DLM: LexemeScheme = makeLexeme(',');

export const DLM2: LexemeScheme = makeLexeme(':', true);

export const GRC: LexemeScheme = makeLexeme('>');

export const GRO: LexemeScheme = makeLexeme('<');

export const GT: LexemeScheme = makeLexeme('>');

export const LT: LexemeScheme = makeLexeme('<');

export const EQ: LexemeScheme = makeLexeme('=');

export const NOT: LexemeScheme = makeLexeme('!');

export const MLP: LexemeScheme = makeLexeme('%');

export const MNS: LexemeScheme = makeLexeme('-');

export const OMT: LexemeScheme = makeLexeme(' \n\r', false, true);

export const VL: LexemeScheme = makeLexeme('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_.-+0123456789', false, false, true);