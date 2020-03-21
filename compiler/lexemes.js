/* eslint-disable no-undef */

let code = 0;

const getCode = () => code++;

const LSB = {
  literals: ['['], code: getCode()
};

const RSB = {
  literals: [']'], code: getCode()
};

const LRB = {
  literals: ['('], code: getCode()
};

const RRB = {
  literals: [')'], code: getCode()
};

const LFB = {
  literals: ['{'], code: getCode()
};

const RFB = {
  literals: ['}'], code: getCode()
};

const DLM = {
  literals: [':'], code: getCode()
};

const GT = {
  literals: ['>'], code: getCode()
};

const LT = {
  literals: ['<'], code: getCode()
};

const EQ = {
  literals: ['='], code: getCode()
};

const OMT = {
  literals: [' ', '\n', '\r'], code: getCode(),
  omit: true
};

const VL = {
  literals: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_-0123456789'.split(''), code: getCode(),
  compound: true
};

const base = new Map();

([
  LSB, RSB, LRB, RRB, LFB, RFB, DLM, GT, LT, EQ, OMT, VL
])
  .forEach(
    ({ code, literals, compound, omit }) => literals
      .forEach(
        literal => base.set(literal, { code, value: literal, compound, omit })
      )
  );

module.exports = {
  LSB, RSB, LRB, RRB, LFB, RFB, DLM, GT, LT, EQ, OMT, VL, base
};