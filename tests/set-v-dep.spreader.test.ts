import { S_SVDP as VALIDATOR_NAME } from '@lib/names';
import { setVDep as validator } from '@lib/spreaders/set-v-dep';
import { emptyFunction, emptyMeta, paramsCases } from '@test/utilities';

describe(`validator › ${VALIDATOR_NAME}`, () => {
  describe('params', () => {
    paramsCases(
      validator,
      [
        ['f1', emptyFunction(), emptyFunction()]
      ],
      [
        ['', emptyFunction()],
        ['f1', null],
        ['f1', undefined],
        ['f1', 0],
        ['f1', 1],
        ['f1', {}],
        ['f1'],
        []
      ],
      VALIDATOR_NAME
    );

    const meta = { ...emptyMeta() };

    test('base › r_0', () => {
      validator('f1', emptyFunction())('value' as any, null, meta);

      expect(meta._deps['f1'][0]).toEqual(emptyFunction());
    });

    test('base › r_1', () => {
      validator('f2', emptyFunction(), emptyFunction())('value' as any, null, meta);

      expect(meta._deps['f2'][0]).toEqual(emptyFunction());
      expect(meta._deps['f2'][1]).toEqual(emptyFunction());
    });
  });
});