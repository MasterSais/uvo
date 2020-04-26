import { uppercase as processor } from '@lib/base-api/processors/uppercase';
import { baseCasesWithParams } from '@test/utilities';

describe('processor › uppercase', () => {
  describe('base', () => {
    baseCasesWithParams<any>(
      processor,
      [
        [[], 'Abc', 'ABC'],
        [[], 'ABC', 'ABC'],
        [[], 'abc', 'ABC']
      ],
      []
    );
  });
});