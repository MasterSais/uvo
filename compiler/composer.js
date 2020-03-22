/* eslint-disable no-undef */

import { date, is, length, number, object2, string } from '../dist/es/index.min.js';
import { EQ, GT, LFB, LRB, LSB, LT, RFB, RRB, RSB, VL } from './lexemes.js';

const validatorBase = new Map([
  ['object', { callee: object2 }],
  ['date', { callee: date }],
  ['compare', { callee: is }],
  ['number', { callee: number }],
  ['string', { callee: string }],
  ['length', { callee: length }]
]);

export const composer = (lexemes) => {
  const validatorsTree = [];
  const stack = [validatorsTree];
  const states = [];
  
  let validators = validatorsTree;

  lexemes = lexemes.slice(1);

  for (const lexeme of lexemes) {
    let state = states[states.length - 1];

    if ([GT.code, LT.code, EQ.code].includes(lexeme.code)) {
      if (state === 'comparator') {
        validators[validators.length - 1] += lexeme.value;
      } else {
        validators.push(lexeme.value);
        states.push('comparator');
      }

      continue;
    } else {
      if (state === 'comparator') {
        states.pop();
      }
    }

    state = states[states.length - 1];

    if (lexeme.code === VL.code) {
      if (state === 'field') {
        validators.push('f_' + lexeme.value);

        states.pop();

        continue;
      }

      if (state === 'injection') {
        validators[validators.length - 1] += lexeme.value;

        continue;
      }

      if (state === 'params') {
        validators.push('p_' + lexeme.value);

        continue;
      }

      const validator = validatorBase.get(lexeme.value);

      if (validator) {
        validators.push('v_' + lexeme.value);
      }

      continue;
    }

    if (lexeme.code === LSB.code) {
      states.push('validator');

      states.push('field');
    }

    if (lexeme.code === RSB.code) {
      states.pop();
    }

    if (lexeme.code === LRB.code) {
      validators.push([]);

      stack.push(validators[validators.length - 1]);

      validators = validators[validators.length - 1];

      states.push('params');

      continue;
    }

    if (lexeme.code === RRB.code) {
      stack.pop();

      validators = stack[stack.length - 1];

      states.pop();

      continue;
    }

    if (lexeme.code === LFB.code) {
      states.push('injection');

      validators.push(lexeme.value);

      continue;
    }

    if (lexeme.code === RFB.code) {
      states.pop();

      validators[validators.length - 1] += lexeme.value;

      continue;
    }
  }

  console.log(validatorsTree);
};