import { template } from '@lib/compiler/template';
import { baseCasesWithParams } from '@test/utilities';

describe('cross validation', () => {
  const validator = template(`
    [object(
      [a : date : compare(>{now}) : dep('a')]
      [b : date : compare(>=a) : dep('b')]
      [c : date : compare(>=b)]
    )]
  `)()({
    now: 1000
  });

  const now = Date.now();

  baseCasesWithParams(
    () => validator,
    [
      [[], { a: now, b: now + 1000, c: now + 2000 }, { a: now, b: now + 1000, c: now + 2000 }],
      [[], { a: now, b: now + 1000, c: now - 2000 }, { a: now, b: now + 1000, c: null }],
      [[], { a: now, b: now - 1000, c: now - 2000 }, { a: now, b: null, c: now - 2000 }]
    ],
    []
  );
});