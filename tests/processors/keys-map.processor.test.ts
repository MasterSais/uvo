import { keysMap as processor } from '@lib/base-api/processors/keys-map';
import { baseCasesWithParams } from '@test/utilities';

describe('processor › strip', () => {
  describe('base', () => {
    baseCasesWithParams<any>(
      processor,
      [
        [[(key: string) => `_${key}`], { f1: 10, f2: 1 }, { _f1: 10, _f2: 1 }],
        [[(key: string) => key.toUpperCase()], { f1: 10, f2: 1 }, { F1: 10, F2: 1 }],
        [[(key: string) => key === 'f1' ? 'f2' : key], { f1: 10 }, { f2: 10 }]
      ],
      []
    );
  });
});