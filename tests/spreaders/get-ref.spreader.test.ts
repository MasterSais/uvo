import { S_GDP as VALIDATOR_NAME } from '@lib/base-api/names';
import { getRef as validator } from '@lib/base-api/spreaders/get-ref';
import { equal } from '@lib/base-api/validators/is';
import { emptyFunction, emptyMeta, paramsCases } from '@test/utilities';

describe(`spreader › ${VALIDATOR_NAME}`, () => {
  describe('params', () => {
    paramsCases(
      validator,
      [
        ['f1', emptyFunction()],
        ['f1', null],
        ['f1', undefined],
        ['f1', 0],
        ['f1', 1],
        ['f1', {}]
      ],
      [
        ['', emptyFunction()],
        []
      ],
      VALIDATOR_NAME
    );

    test('base › r_0', () => {
      expect(
        validator('f1', (f1: any) => equal(f1))('value', null, { ...emptyMeta(), _deps: { f1: 'value' } })
      ).toEqual('value');
    });

    test('base › r_1', () => {
      expect(
        validator('f1', (f1: any) => equal(f1))('value', null, { ...emptyMeta(), _deps: { f1: '' } })
      ).toEqual(null);
    });

    test('base › r_2', () => {
      expect(
        validator('f1', () => null)('value', null, { ...emptyMeta(), _deps: { f1: '' } })
      ).toEqual('value');
    });

    test('base › r_3', () => {
      expect(
        validator('f1')('value', null, { ...emptyMeta(), _deps: { f1: '' } })
      ).toEqual('');
    });

    test('base › r_4', () => {
      expect(
        validator('f1')('', null, { ...emptyMeta(), _deps: { f1: 'value' } })
      ).toEqual('value');
    });

    test('base › w_0', () => {
      expect(
        () => validator('f1', () => 1 as any)('value', null, { ...emptyMeta(), _deps: { f1: '' } })
      ).toThrow(VALIDATOR_NAME);
    });
  });
});