import { S_SDP as VALIDATOR_NAME } from '@lib/base-api/names';
import { setRef as validator } from '@lib/base-api/spreaders/set-ref';
import { emptyFunction, emptyMeta, paramsCases } from '@test/utilities';

describe(`spreader › ${VALIDATOR_NAME}`, () => {
  describe('params', () => {
    paramsCases(
      validator,
      [
        [],
        ['', emptyFunction()],
        ['f1'],
        ['f1', emptyFunction()],
        ['f1', null],
        ['f1', undefined],
        ['f1', 0],
        ['f1', 1],
        ['f1', {}]
      ],
      [],
      VALIDATOR_NAME
    );

    const meta = { ...emptyMeta() };

    test('base › r_0', () => {
      validator('f1')('value', null, meta);

      expect(meta._deps['f1']).toEqual('value');
    });

    test('base › r_1', () => {
      expect(validator('f2', 'ext')('value', null, meta)).toEqual('value');

      expect(meta._deps['f2']).toEqual('ext');
    });

    test('base › r_2', () => {
      expect(validator('f3', () => 'extDynamic')('value', null, meta)).toEqual('value');

      expect(meta._deps['f3']).toEqual('extDynamic');
    });

    test('base › r_3', () => {
      expect(validator('f4', (value: string) => value + ':extDynamic')('value', null, meta)).toEqual('value');

      expect(meta._deps['f4']).toEqual('value:extDynamic');
    });
  });
});