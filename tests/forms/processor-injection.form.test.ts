import { consecutive } from '@lib/groupers/consecutive';
import { array } from '@lib/validators/array';
import { gte } from '@lib/validators/gte';
import { number } from '@lib/validators/number';

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