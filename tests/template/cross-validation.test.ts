import { template } from '@lib/template/template';
import { baseCasesWithParams } from '@test/utilities';

describe('cross validation', () => {
  const validator = template(`
    @object(
      a : @date : @compare(>$now) : #a,
      b : @date : @compare(>=#a) : #b,
      c : @date : @compare(>=#b)
    )
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

describe('cross validation › short', () => {
  const validator = template(`
    @o(
      a @d @c(>$now) #a,
      b @d @c(>=#a) #b,
      c @d @c(>=#b)
    )
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