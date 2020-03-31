import { Lexeme, LexemeScheme } from './types';

let code = 0;

const getCode = (): number => code++;

export const VLD: LexemeScheme = {
  literals: ['@'], code: getCode()
};

export const INJ: LexemeScheme = {
  literals: ['$'], code: getCode()
};

export const REF: LexemeScheme = {
  literals: ['#'], code: getCode()
};

export const LRB: LexemeScheme = {
  literals: ['('], code: getCode(),
  omitToken: true
};

export const RRB: LexemeScheme = {
  literals: [')'], code: getCode(),
  omitToken: true
};

export const SQ: LexemeScheme = {
  literals: ['\''], code: getCode()
};

export const DLM: LexemeScheme = {
  literals: [','], code: getCode()
};

export const GT: LexemeScheme = {
  literals: ['>'], code: getCode()
};

export const LT: LexemeScheme = {
  literals: ['<'], code: getCode()
};

export const EQ: LexemeScheme = {
  literals: ['='], code: getCode()
};

export const NOT: LexemeScheme = {
  literals: ['!'], code: getCode()
};

export const MLP: LexemeScheme = {
  literals: ['%'], code: getCode()
};

export const OMT: LexemeScheme = {
  literals: [' ', ':', '\n', '\r'], code: getCode(),
  omit: true
};

export const VL: LexemeScheme = {
  literals: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_.-0123456789'.split(''), code: getCode(),
  compound: true
};

export const lexemeBase = new Map<string, Lexeme>();

([
  VLD, INJ, REF, LRB, RRB, SQ, DLM, GT, LT, EQ, NOT, MLP, OMT, VL
])
  .forEach(
    ({ code, literals, compound, omit, omitToken }) => literals
      .forEach(
        literal => lexemeBase.set(literal, { code, value: literal, compound, omit, omitToken })
      )
  );