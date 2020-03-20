/* eslint-disable no-undef */

let code = 0;

const getCode = () => code++;

const L_VALIDATOR_OPEN = {
  values: ['['], code: getCode()
};

const L_VALIDATOR_CLOSE = {
  values: [']'], code: getCode()
};

const L_PARAMS_OPEN = {
  values: ['('], code: getCode()
};

const L_PARAMS_CLOSE = {
  values: [')'], code: getCode()
};

const L_EXTERNAL_PARAMS_OPEN = {
  values: ['{'], code: getCode()
};

const L_EXTERNAL_PARAMS_CLOSE = {
  values: ['}'], code: getCode()
};

const L_VALIDATOR_SEPARATOR = {
  values: [':'], code: getCode()
};

const L_GREATER = {
  values: ['>'], code: getCode()
};

const L_LOWER = {
  values: ['<'], code: getCode()
};

const L_EQUAL = {
  values: ['='], code: getCode()
};

const L_EXCESS = {
  values: [' ', '\n', '\r'], code: getCode(),
  omit: true
};

const L_LITERALS = {
  values: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_-0123456789'.split(''), code: getCode(),
  compound: true
};

const base = new Map();

([
  L_VALIDATOR_OPEN, L_VALIDATOR_CLOSE,
  L_PARAMS_OPEN, L_PARAMS_CLOSE,
  L_EXTERNAL_PARAMS_OPEN, L_EXTERNAL_PARAMS_CLOSE,
  L_VALIDATOR_SEPARATOR,
  L_GREATER, L_LOWER, L_EQUAL,
  L_EXCESS, L_LITERALS
])
  .forEach(
    ({ code, values, compound, omit }) => values
      .forEach(
        literal => base.set(literal, { code, value: literal, compound, omit })
      )
  );

module.exports = {
  L_VALIDATOR_OPEN, L_VALIDATOR_CLOSE,
  L_PARAMS_OPEN, L_PARAMS_CLOSE,
  L_EXTERNAL_PARAMS_OPEN, L_EXTERNAL_PARAMS_CLOSE,
  L_VALIDATOR_SEPARATOR,
  L_GREATER, L_LOWER, L_EQUAL,
  L_EXCESS, L_LITERALS,
  base
};