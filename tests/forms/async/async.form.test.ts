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
import { string } from '@lib/base-api/validators/string';
import { template } from '@lib/templating-api/template';
import { asyncCases, resolve } from '@test/utilities';
import { cases1, cases2, cases3, cases4 } from './cases';

describe(`async form › object`, () =>
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
);

describe(`async form › object › advanced`, () =>
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
);

describe(`async form › object › template`, () =>
  asyncCases(
    template(`
      @object(
        id : @number,
        name : @string
      ) ~p ~m
    `)(), cases1
  )
);

describe(`async form › object › dynamic`, () =>
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
);

describe(`async form › object › template › dynamic`, () =>
  asyncCases(
    template(`
      @object(
        id : @number,
        name : @string
      ) : $0 ~p ~m
    `)(
      [(obj: any) => resolve(obj)]
    ), cases1
  )
);

describe(`async form › array`, () =>
  asyncCases(
    withMeta(
      withPromise(
        array([number()])
      )
    ), cases2
  )
);

describe(`async form › array › template`, () =>
  asyncCases(
    template(`
      @array( @number ) ~p ~m
    `)(), cases2
  )
);

describe(`async form › errors`, () =>
  asyncCases(
    withMeta(
      withErrors(
        withPromise(
          consecutive(
            async(null, 'promiseErr'),
            object2([
              ['id', async(), number('numberErr')],
              ['name', string('stringErr')],
            ], 'objectErr')
          )
        )
      )
    ), cases3
  )
);

describe(`async form › template › errors`, () =>
  asyncCases(
    template(`
      @async!0 : @object(
        id : @async : @number!2,
        name : @string!3
      )!1 ~p ~e ~m
    `)(
      null, ['promiseErr', 'objectErr', 'numberErr', 'stringErr']
    ), cases3
  )
);

describe(`async form › wait`, () =>
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
            (userId: number) => userId ? resolve([userId]) : undefined
          ],
        ])
      )
    ), cases4
  )
);

describe(`async form › template › wait`, () =>
  asyncCases(
    template(`
      @o(
        user @p(0) @o(
          id @n #0,
          name @s
        ),
        roles @w(0) $0(#0)
      ) ~p ~m
    `)(
      [
        (userId: number) => resolve([userId])
      ]
    ), cases4
  )
);