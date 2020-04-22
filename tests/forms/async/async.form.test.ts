import { withMeta } from '@lib/classic-api/containers/with-meta';
import { withPromise } from '@lib/classic-api/containers/with-promise';
import { array } from '@lib/classic-api/validators/array';
import { number } from '@lib/classic-api/validators/number';
import { object } from '@lib/classic-api/validators/object';
import { object2 } from '@lib/classic-api/validators/object2';
import { string } from '@lib/classic-api/validators/string';
import { asyncCases, resolve } from '@test/utilities';
import { cases1, cases2 } from './cases';

describe(`async form › object`, () => {
  asyncCases(
    withMeta(
      withPromise(
        object({
          id: number(),
          name: string(),
        })
      )
    ), cases1, []
  )
});

describe(`async form › object › advanced`, () => {
  asyncCases(
    withMeta(
      withPromise(
        object2([
          ['id', number()],
          ['name', string()],
        ])
      )
    ), cases1, []
  )
});

describe(`async form › object › advanced › dynamic`, () => {
  asyncCases(
    withMeta(
      withPromise(
        object2([
          ['id', number(), (id: number) => resolve(id)],
          ['name', string(), (name: string) => resolve(name)],
        ])
      )
    ), cases1, []
  )
});

describe(`async form › array`, () => {
  asyncCases(
    withMeta(
      withPromise(
        array(number())
      )
    ), cases2, []
  )
});