/* eslint-disable no-undef */

import { consecutive, date, is, length, number, object2, string } from '../dist/es/index.min.js';
import { EQ, GT, LFB, LRB, LSB, LT, RFB, RRB, RSB, VL } from './lexemes.js';

const generateTree = (lexemes, base) => {
  const tree = [];

  const stack = [tree];

  const states = [];

  let slice = tree;

  for (let i = 1; i < lexemes.length; i++) {
    const lexeme = lexemes[i];

    const state = states[states.length - 1];

    if (lexeme.code === VL.code) {
      if (state === 'field') {
        slice.push(lexeme.value);

        states.pop();

        continue;
      }

      if (state === 'injection') {
        slice[slice.length - 1] += lexeme.value;

        continue;
      }

      if (state === 'params') {
        slice.push(lexeme.value);

        continue;
      }

      const validator = base.get(lexeme.value);

      if (validator) {
        slice.push(validator);
      }

      continue;
    }

    if (lexeme.code === LSB.code) {
      states.push('validator', 'field');

      continue;
    }

    if (lexeme.code === RSB.code) {
      states.pop();

      continue;
    }

    if (lexeme.code === LRB.code) {
      slice.push([]);

      stack.push(slice[slice.length - 1]);

      slice = slice[slice.length - 1];

      states.push('params');

      continue;
    }

    if (lexeme.code === RRB.code) {
      stack.pop();

      states.pop();

      slice = stack[stack.length - 1];

      continue;
    }

    if (lexeme.code === LFB.code) {
      states.push('injection');

      slice.push(lexeme.value);

      continue;
    }

    if (lexeme.code === RFB.code) {
      states.pop();

      slice[slice.length - 1] += lexeme.value;

      continue;
    }

    const comparators = [GT.code, LT.code, EQ.code];

    if (comparators.indexOf(lexeme.code) >= 0) {
      if (comparators.indexOf(lexemes[i - 1].code) >= 0) {
        slice[slice.length - 1] += lexeme.value;
      } else {
        slice.push(lexeme.value);
      }

      continue;
    }
  }

  return tree;
};

const validatorBase = new Map();

validatorBase.set('object', (params) => {
  params = params.reverse();
  
  object2;
});

validatorBase.set('date', () => {
  date;
});

validatorBase.set('compare', () => {
  is;
});

validatorBase.set('number', () => {
  number;
});

validatorBase.set('string', () => {
  string;
});

validatorBase.set('length', () => {
  length;
});

const createValidator = (tree) => {
  let params = null;

  const validators = [];

  for (const branch of tree) {
    if (Array.isArray(branch)) {
      params = branch;

      continue;
    }

    if (typeof branch === 'function') {
      validators.push(branch(params));

      params = null;
    }
  }

  return consecutive(...validators);
};

export const composer = (lexemes) => {
  const tree = generateTree(lexemes, validatorBase).reverse();

  console.log(tree);

  return createValidator(tree);
};