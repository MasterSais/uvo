import { withErrors } from '@lib/base-api/containers/with-errors';
import { withMeta } from '@lib/base-api/containers/with-meta';
import { withPromise } from '@lib/base-api/containers/with-promise';
import { consecutive } from '@lib/base-api/groupers/consecutive';
import { getDep } from '@lib/base-api/spreaders/get-dep';
import { setDep } from '@lib/base-api/spreaders/set-dep';
import { wait } from '@lib/base-api/spreaders/wait';
import { array } from '@lib/base-api/validators/array';
import { async } from '@lib/base-api/validators/async';
import { number } from '@lib/base-api/validators/number';
import { object } from '@lib/base-api/validators/object';
import { object2 } from '@lib/base-api/validators/object2';
import { promise } from '@lib/base-api/validators/promise';
import { string } from '@lib/base-api/validators/string';
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
            (userId: number) => userId ? resolve([userId]) : null
          ],
        ])
      )
    ), cases4
  )
});