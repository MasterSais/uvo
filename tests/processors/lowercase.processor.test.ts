import { lowercase as processor } from '@lib/classic-api/processors/lowercase';
import { baseCasesWithParams } from '@test/utilities';

describe('processor › lowercase', () => {
  describe('base', () => {
    baseCasesWithParams<any>(
      processor,
      [
        [[], 'Abc', 'abc'],
        [[], 'ABC', 'abc'],
        [[], 'abc', 'abc']
      ],
      []
    );
  });
});