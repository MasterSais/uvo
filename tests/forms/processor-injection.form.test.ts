import { consecutive } from '@lib/classic-api/groupers/consecutive';
import { array } from '@lib/classic-api/validators/array';
import { gte } from '@lib/classic-api/validators/is';
import { number } from '@lib/classic-api/validators/number';

test('processor injection', () => {
  const simpleOne = (
    consecutive(
      array([
        number(),
        gte(0)
      ]),
      (data: Array<number>) => data.filter(value => !!value)
    )
  );

  expect(simpleOne([-1, 2, 3])).toEqual([2, 3]);
  
  expect(simpleOne([-1, -2, 3])).toEqual([3]);

  expect(simpleOne([-1, -2, 'abc'])).toEqual([]);
});