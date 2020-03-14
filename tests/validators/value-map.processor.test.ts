import { valueMap as processor } from '@lib/processors/value-map';
import { baseCasesWithParams } from '@test/utilities';

describe('processor › strip', () => {
  describe('base', () => {
    baseCasesWithParams<any>(
      processor,
      [
        [[[['yes', true], ['no', false]]], 'yes', true],
        [[[['yes', true], ['no', false]]], 'no', false],
        [[[['yes', true], ['no', false]]], true, true],
        [[[['yes', true], ['no', false]]], 'nope', 'nope'],
        [[[['yes', true], [(value: string) => ['no', 'nope'].includes(value), false]]], 'nope', false],
        [[[['yes', true], [/no|nope/, false]]], 'nope', false],
        [[[['yes', true], [/no|nope/, (value: string) => `${value}?`]]], 'nope', 'nope?']
      ],
      []
    );
  });
});