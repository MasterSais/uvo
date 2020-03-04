import { withMeta } from '@lib/containers/with-meta';
import { getDep } from '@lib/spreaders/get-dep';
import { setVDep } from '@lib/spreaders/set-v-dep';
import { gte } from '@lib/validators/gte';
import { number } from '@lib/validators/number';
import { object } from '@lib/validators/object';
import { object2 } from '@lib/validators/object2';

test('self recursive', () => {
  const validator = (
    withMeta(
      setVDep('node',
        object({
          id: [number(), gte(0)],
          node: getDep('node', validators => validators)
        })
      )
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
      setVDep('node',
        object2([
          ['id', number(), gte(0)],
          ['node', getDep('node', validators => validators)]
        ])
      )
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