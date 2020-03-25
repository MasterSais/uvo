import { Lexeme, LexemeScheme } from './types';

let code = 0;

const getCode = (): number => code++;

export const LSB: LexemeScheme = {
  literals: ['['], code: getCode()
};

export const RSB: LexemeScheme = {
  literals: [']'], code: getCode()
};

export const LRB: LexemeScheme = {
  literals: ['('], code: getCode()
};

export const RRB: LexemeScheme = {
  literals: [')'], code: getCode()
};

export const LFB: LexemeScheme = {
  literals: ['{'], code: getCode(),
  composerToken: true
};

export const RFB: LexemeScheme = {
  literals: ['}'], code: getCode(),
  composerToken: true
};

export const DLM: LexemeScheme = {
  literals: [':'], code: getCode()
};

export const GT: LexemeScheme = {
  literals: ['>'], code: getCode(),
  composerToken: true
};

export const LT: LexemeScheme = {
  literals: ['<'], code: getCode(),
  composerToken: true
};

export const EQ: LexemeScheme = {
  literals: ['='], code: getCode(),
  composerToken: true
};

export const OMT: LexemeScheme = {
  literals: [' ', '\n', '\r'], code: getCode(),
  omit: true
};

export const VL: LexemeScheme = {
  literals: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_-0123456789'.split(''), code: getCode(),
  compound: true,
  composerToken: true
};

export const lexemeBase = new Map<string, Lexeme>();

([
  LSB, RSB, LRB, RRB, LFB, RFB, DLM, GT, LT, EQ, OMT, VL
])
  .forEach(
    ({ code, literals, compound, omit, composerToken }) => literals
      .forEach(
        literal => lexemeBase.set(literal, { code, value: literal, compound, omit, composerToken })
      )
  );