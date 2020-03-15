import { round as processor } from '@lib/processors/round';
import { baseCasesWithParams } from '@test/utilities';

describe('processor › round', () => {
  describe('base', () => {
    baseCasesWithParams<any>(
      processor,
      [
        [[], 10, 10],
        [[], 10.2, 10],
        [[], 10.5, 11],
        [[], 10.7, 11],
        [['floor'], 10, 10],
        [['floor'], 10.2, 10],
        [['floor'], 10.5, 10],
        [['floor'], 10.7, 10],
        [['ceil'], 10, 10],
        [['ceil'], 10.2, 11],
        [['ceil'], 10.5, 11],
        [['ceil'], 10.7, 11]
      ],
      []
    );
  });
});