/* eslint-disable no-undef */

let code = 0;

const getCode = () => code++;

const S_ENTRY = getCode();

const S_OUTPUT = getCode();

const S_NESTED = getCode();

module.exports = {
  S_ENTRY, S_OUTPUT, S_NESTED
};