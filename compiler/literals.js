/* eslint-disable no-undef */

let code = 0;

const getCode = () => code++;

const LSB = {
  values: ['['], code: getCode()
};

const RSB = {
  values: [']'], code: getCode()
};

const LRB = {
  values: ['('], code: getCode()
};

const RRB = {
  values: [')'], code: getCode()
};

const LFB = {
  values: ['{'], code: getCode()
};

const RFB = {
  values: ['}'], code: getCode()
};

const DLM = {
  values: [':'], code: getCode()
};

const GT = {
  values: ['>'], code: getCode()
};

const LT = {
  values: ['<'], code: getCode()
};

const EQ = {
  values: ['='], code: getCode()
};

const OMT = {
  values: [' ', '\n', '\r'], code: getCode(),
  omit: true
};

const VL = {
  values: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_-0123456789'.split(''), code: getCode(),
  compound: true
};

const base = new Map();

([
  LSB, RSB, LRB, RRB, LFB, RFB, DLM, GT, LT, EQ, OMT, VL
])
  .forEach(
    ({ code, values, compound, omit }) => values
      .forEach(
        literal => base.set(literal, { code, value: literal, compound, omit })
      )
  );

module.exports = {
  LSB, RSB, LRB, RRB, LFB, RFB, DLM, GT, LT, EQ, OMT, VL, base
};