/* eslint-disable no-undef */

import { date, is, length, number, object2, string } from '../dist/es/index.min.js';

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

export const composer = (semanticTree) => {
  console.log(semanticTree);

};