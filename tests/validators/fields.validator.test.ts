import { V_FIELDS as VALIDATOR_NAME } from '@lib/names';
import { fields as validator } from '@lib/validators/fields';
import { baseCasesWithParams, emptyFunction, emptyMeta, errorMetaCase, notNullError, paramsCases, withErrorCases } from '@test/utilities';

describe(`validator › ${VALIDATOR_NAME}`, () => {
  describe('params', () => {
    paramsCases(
      validator,
      [
        ['f1'],
        [['|', 'f1', 'f2']],
        [['&', ['|', 'f1', 'f3'], 'f2']],
        [['&', ['|', 'f1', 'f3'], ['^', 'f2', 'f4']]]
      ],
      [
        [],
        [''],
        [[]],
        [['^']],
        [['f1']],
        [['^', 'f1']],
        [['&', 'f1']],
        [['|', 'f1']],
        [['|', [], 'f2']],
        [['|', '', 'f2']],
        [['|', ['&'], 'f2']],
        [['|', ['f1'], 'f2']],
        [['|', ['&', 'f1'], 'f2']]
      ],
      VALIDATOR_NAME
    );
  });

  describe('base', () => {
    baseCasesWithParams<any>(
      validator,
      [
        [['f1'], { f1: 1 }],
        [[['&', 'f1', 'f2']], { f1: 1, f2: true }],
        [[['|', 'f1', 'f2']], { f1: 'abc', f2: 1 }],
        [[['|', 'f1', 'f2']], { f1: 1, f2: null }],
        [[['|', 'f1', 'f2']], { f1: null, f2: {} }],
        [[['^', 'f1', 'f2']], { f1: null, f2: 1 }],
        [[['^', 'f1', 'f2']], { f1: 1, f2: undefined }],
        [[['&', ['|', 'f1', 'f2'], 'f3']], { f1: false, f3: 1 }],
        [[['&', ['|', 'f1', 'f2'], 'f3']], { f2: 1, f3: 1 }],
        [[['&', ['|', 'f1', 'f2'], 'f3']], { f1: [], f2: 1, f3: 1 }],
        [[['&', ['^', 'f1', 'f2'], 'f3']], { f1: 1, f3: 1 }],
        [[['&', ['^', 'f1', 'f2'], 'f3']], { f2: 1, f3: 1 }],
        [[['&', ['^', 'f1', 'f2'], ['|', 'f3', 'f4']]], { f1: 1, f3: 1, f4: 1 }]
      ],
      [
        [['f1'], null],
        [['f1'], undefined],
        [['f1'], []],
        [['f1'], 1],
        [['f1'], '1'],
        [['f1'], true],
        [['f1'], emptyFunction()],
        [['f1'], { f2: 1 }],
        [[['&', 'f1', 'f2']], { f1: 1, f2: null }],
        [[['&', 'f1', 'f2']], { f1: undefined, f2: 1 }],
        [[['&', 'f1', 'f2']], { f1: '', f2: '' }],
        [[['|', 'f1', 'f2']], { f1: '', f2: undefined }],
        [[['^', 'f1', 'f2']], { f1: 1, f2: 1 }],
        [[['^', 'f1', 'f2']], {}],
        [[['&', ['|', 'f1', 'f2'], 'f3']], { f3: 1 }],
        [[['&', ['^', 'f1', 'f2'], 'f3']], { f3: 1 }],
        [[['&', ['^', 'f1', 'f2'], 'f3']], { f1: 1, f2: 1, f3: 1 }]
      ]
    );
  });

  describe('with error', () => {
    withErrorCases<any>(
      validator('f1', notNullError()),
      [[{ f1: 1 }], [{ f2: 1 }]]
    );
  });

  describe('with meta', () => {
    withErrorCases<any>(
      validator('f1', errorMetaCase([], ['f1'], VALIDATOR_NAME)),
      [[{ f2: 1 }]],
      emptyMeta()
    );
  });
});