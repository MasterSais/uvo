import { withErrors } from '@lib/classic-api/containers/with-errors';
import { withMeta } from '@lib/classic-api/containers/with-meta';
import { withPromise } from '@lib/classic-api/containers/with-promise';
import { consecutive } from '@lib/classic-api/groupers/consecutive';
import { getDep } from '@lib/classic-api/spreaders/get-dep';
import { setDep } from '@lib/classic-api/spreaders/set-dep';
import { wait } from '@lib/classic-api/spreaders/wait';
import { array } from '@lib/classic-api/validators/array';
import { async } from '@lib/classic-api/validators/async';
import { number } from '@lib/classic-api/validators/number';
import { object } from '@lib/classic-api/validators/object';
import { object2 } from '@lib/classic-api/validators/object2';
import { promise } from '@lib/classic-api/validators/promise';
import { string } from '@lib/classic-api/validators/string';
import { asyncCases, resolve } from '@test/utilities';
import { cases1, cases2, cases3, cases4 } from './cases';

describe(`async form › object`, () => {
  asyncCases(
    withMeta(
      withPromise(
        object({
          id: number(),
          name: string(),
        })
      )
    ), cases1
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
    ), cases1
  )
});

describe(`async form › object › dynamic`, () => {
  asyncCases(
    withMeta(
      withPromise(
        consecutive(
          object2([
            ['id', number()],
            ['name', string()],
          ]),
          (obj: any) => resolve(obj)
        )
      )
    ), cases1
  )
});

describe(`async form › array`, () => {
  asyncCases(
    withMeta(
      withPromise(
        array([number()])
      )
    ), cases2
  )
});

describe(`async form › errors`, () => {
  asyncCases(
    withMeta(
      withErrors(
        withPromise(
          consecutive(
            promise('promiseErr'),
            object2([
              ['id', promise(), number('numberErr')],
              ['name', string('stringErr')],
            ], 'objectErr')
          )
        )
      )
    ), cases3
  )
});

describe(`async form › wait`, () => {
  asyncCases(
    withMeta(
      withPromise(
        object2([
          ['user', async('user'), (
            object({
              id: [number(), setDep('userId')],
              name: [string()]
            })
          )],
          ['roles',
            wait('user'),
            getDep('userId'),
            (userId: number) => resolve([userId])
          ],
        ])
      )
    ), cases4
  )
});