/* eslint-disable no-undef */

let code = 0;

const getCode = () => code++;

export const LSB = {
  literals: ['['], code: getCode()
};

export const RSB = {
  literals: [']'], code: getCode()
};

export const LRB = {
  literals: ['('], code: getCode()
};

export const RRB = {
  literals: [')'], code: getCode()
};

export const LFB = {
  literals: ['{'], code: getCode(),
  composerToken: true
};

export const RFB = {
  literals: ['}'], code: getCode(),
  composerToken: true
};

export const DLM = {
  literals: [':'], code: getCode()
};

export const GT = {
  literals: ['>'], code: getCode(),
  composerToken: true
};

export const LT = {
  literals: ['<'], code: getCode(),
  composerToken: true
};

export const EQ = {
  literals: ['='], code: getCode(),
  composerToken: true
};

export const OMT = {
  literals: [' ', '\n', '\r'], code: getCode(),
  omit: true
};

export const VL = {
  literals: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_-0123456789'.split(''), code: getCode(),
  compound: true,
  composerToken: true
};

export const lexemeBase = new Map();

([
  LSB, RSB, LRB, RRB, LFB, RFB, DLM, GT, LT, EQ, OMT, VL
])
  .forEach(
    ({ code, literals, compound, omit, composerToken }) => literals
      .forEach(
        literal => lexemeBase.set(literal, { code, value: literal, compound, omit, composerToken })
      )
  );