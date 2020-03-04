import { G_CONS, V_OBJ as VALIDATOR_NAME } from '@lib/names';
import { gte } from '@lib/validators/gte';
import { len } from '@lib/validators/len';
import { maxLen } from '@lib/validators/max-len';
import { number } from '@lib/validators/number';
import { object2 as validator } from '@lib/validators/object2';
import { string } from '@lib/validators/string';
import { baseCasesWithParams, emptyArray, emptyFunction, emptyMeta, emptyObject, errorMetaCase, notNullError, paramsCases, withErrorCases } from '@test/utilities';

describe(`validator › ${VALIDATOR_NAME}`, () => {
  describe('params', () => {
    paramsCases(
      validator,
      [
        [],
        [0],
        [undefined],
        [null],
        [false],
        [[]],
        [[['f1', number()]]],
        [[['f1', number()], ['f2']]],
        [[['f1', number()], ['f2', string()]]],
        [[['f1', number()], ['f2', string(), len(10)]]]
      ],
      [
        [1],
        ['1'],
        [true],
        [{ f1: '1' }],
        [[['f1', number()], ['', string()]]],
        [['f1', number()]],
        [emptyObject()]
      ],
      VALIDATOR_NAME
    );

    paramsCases(
      validator,
      [],
      [
        [[['f1', 1]]],
        [[['f1', number()], ['f2', string(), null]]],
        [[['f1', number()], ['f2', string(), undefined]]]
      ],
      G_CONS
    );
  });

  describe('base', () => {
    baseCasesWithParams<any>(
      validator,
      [
        [[], {}],
        [[null], {}],
        [[false], {}],
        [[], { f1: '' }],
        [[], { f1: 12 }],
        [[[]], {}],
        [[[]], { f1: null }, {}],
        [[[]], { f1: true }, {}],
        [[[['f1', number()], ['f2']]], { f1: 12, f2: '12' }],
        [[[['f1', number()]]], { f1: 12 }],
        [[[['f1', number()]]], { f1: '12' }, { f1: 12 }],
        [[[['f1', number()]]], { f1: 'abc' }, { f1: null }],
        [[[['f1', number(), gte(10)]]], { f1: 11 }, { f1: 11 }],
        [[[['f1', number(), gte(10)]]], { f1: '11' }, { f1: 11 }],
        [[[['f1', number(), gte(10)]]], { f1: '9' }, { f1: null }]
      ],
      [
        [[], 1],
        [[], '1'],
        [[], true],
        [[], null],
        [[], undefined],
        [[], emptyArray()],
        [[], emptyFunction()],
        [[[]], 1],
        [[[['f1', number()]]], '1'],
        [[[['f1', number()]]], true],
        [[[['f1', string()]]], null],
        [[[['f1', string()]]], undefined],
        [[[['f1', string()], ['f2', number()]]], emptyArray()],
        [[[['f1', string()], ['f2', number()]]], emptyFunction()],
        [[[['f1', string(), maxLen(10)], ['f2', number()]]], emptyFunction()]
      ]
    );
  });

  describe('with error', () => {
    withErrorCases<any>(
      validator(null, notNullError()),
      [[{}], [1]]
    );
  });

  describe('with meta', () => {
    withErrorCases<any>(
      validator(null, errorMetaCase([], [null], VALIDATOR_NAME)),
      [[1]],
      emptyMeta()
    );
  });
});