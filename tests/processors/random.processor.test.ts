import { consecutive } from '@lib/groupers/consecutive';
import { random } from '@lib/processors/random';
import { gte } from '@lib/validators/is';
import { lte } from '@lib/validators/is';
import { number } from '@lib/validators/number';
import { oneOf } from '@lib/validators/is';

test('processor › random', () => {
  for (let i = 0; i < 10; i++) {
    expect(
      consecutive(number(), gte(0), lte(1))(
        random()(null)
      )
    ).not.toBeNull();
  }

  for (let i = 0; i < 10; i++) {
    expect(
      consecutive(number(), gte(5.5), lte(10))(
        random(5.5, 10, 3)(null)
      )
    ).not.toBeNull();
  }

  for (let i = 0; i < 10; i++) {
    expect(
      consecutive(number(), oneOf([1, 2, 3, 4]))(
        random(1, 4, 0)(null)
      )
    ).not.toBeNull();
  }
});