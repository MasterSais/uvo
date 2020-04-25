import { clamp as processor } from '@lib/base-api/processors/clamp';
import { baseCasesWithParams } from '@test/utilities';

describe('processor › clamp', () => {
  describe('base', () => {
    baseCasesWithParams<any>(
      processor,
      [
        [[0, 5], 2, 2],
        [[0, 5], 0, 0],
        [[0, 5], 5, 5],
        [[0, 5], -1, 0],
        [[0, 5], 6, 5],
        [[0, 5], '2', '2'],
        [[0, 5], '-1', 0],
        [[0, 5], '6', 5],
        [[0, 5], -Infinity, 0],
        [[0, 5], Infinity, 5],
        [['b', 'e'], 'c', 'c'],
        [['b', 'e'], 'b', 'b'],
        [['b', 'e'], 'e', 'e'],
        [['b', 'e'], 'a', 'b'],
        [['b', 'e'], 'f', 'e'],
        [[false, true], false, false],
        [[false, true], true, true],
        [[false, true], -1, false],
        [[false, true], 2, true]
      ],
      []
    );
  });
});