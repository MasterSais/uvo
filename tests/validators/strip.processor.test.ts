import { strip as processor } from '@lib/processors/strip';
import { baseCasesWithParams } from '@test/utilities';

describe('processor › strip', () => {
  describe('base', () => {
    baseCasesWithParams<any>(
      processor,
      [
        [['f1'], { f1: 10, f2: 1 }, { f2: 1 }],
        [['f1', true], { f1: 10, f2: 1 }, { f2: 1 }],
        [['f1', false], { f1: 10, f2: 1 }, { f1: 10, f2: 1 }],
        [['f1', () => true], { f1: 10, f2: 1 }, { f2: 1 }],
        [['f1', () => false], { f1: 10, f2: 1 }, { f1: 10, f2: 1 }],
        [['f1', (value: number) => value !== 10], { f1: 10, f2: 1 }, { f1: 10, f2: 1 }],
        [['f1', (value: number) => value !== 10], { f1: 11, f2: 1 }, { f2: 1 }],
        [[/f1|f2/, (value: number) => value !== 10], { f1: 11, f2: 1 }, {}],
        [[/f1|f2/, (value: number) => value !== 10], { f1: 10, f2: 10 }, { f1: 10, f2: 10 }],
        [[/f1|f2/], { f1: 10, f2: 10 }, {}]
      ],
      []
    );
  });
});