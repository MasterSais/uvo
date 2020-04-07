import { withMeta } from '@lib/classic-api/containers/with-meta';
import { getDep } from '@lib/classic-api/spreaders/get-dep';
import { setVDep } from '@lib/classic-api/spreaders/set-v-dep';
import { gte } from '@lib/classic-api/validators/is';
import { number } from '@lib/classic-api/validators/number';
import { object } from '@lib/classic-api/validators/object';
import { object2 } from '@lib/classic-api/validators/object2';

test('recursive', () => {
  const validator = (
    withMeta(
      object({
        id: [number(), gte(0)],
        node: setVDep('node',
          object({
            id: [number(), gte(0)],
            node: getDep('node', validators => validators)
          })
        )
      })
    )
  );

  expect(
    validator({ id: 1, node: { id: 2, node: { id: 3, node: { id: 4 } } } })
  ).toEqual({ id: 1, node: { id: 2, node: { id: 3, node: { id: 4, node: null } } } });

  expect(
    validator({ id: 1, node: { id: -1, node: { id: 3, node: { id: 4 } } } })
  ).toEqual({ id: 1, node: { id: null, node: { id: 3, node: { id: 4, node: null } } } });

  expect(
    validator({ id: 1, node: { id: -1, node: [1] } })
  ).toEqual({ id: 1, node: { id: null, node: null } });
});

test('recursive 2', () => {
  const validator = (
    withMeta(
      object2([
        ['id', number(), gte(0)],
        ['node', setVDep('node',
          object2([
            ['id', number(), gte(0)],
            ['node', getDep('node', validators => validators)]
          ])
        )]
      ])
    )
  );

  expect(
    validator({ id: 1, node: { id: 2, node: { id: 3, node: { id: 4 } } } })
  ).toEqual({ id: 1, node: { id: 2, node: { id: 3, node: { id: 4, node: null } } } });

  expect(
    validator({ id: 1, node: { id: -1, node: { id: 3, node: { id: 4 } } } })
  ).toEqual({ id: 1, node: { id: null, node: { id: 3, node: { id: 4, node: null } } } });

  expect(
    validator({ id: 1, node: { id: -1, node: [1] } })
  ).toEqual({ id: 1, node: { id: null, node: null } });
});