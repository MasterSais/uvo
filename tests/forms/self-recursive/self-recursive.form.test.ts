import { withMeta } from '@lib/classic-api/containers/with-meta';
import { getDep } from '@lib/classic-api/spreaders/get-dep';
import { setVDep } from '@lib/classic-api/spreaders/set-v-dep';
import { gte } from '@lib/classic-api/validators/is';
import { number } from '@lib/classic-api/validators/number';
import { object } from '@lib/classic-api/validators/object';
import { object2 } from '@lib/classic-api/validators/object2';
import { baseCasesWithParams } from '@test/utilities';
import { cases } from './cases';

describe('inline conditions form', () => {
  baseCasesWithParams(() => (
    withMeta(
      setVDep('node',
        object({
          id: [number(), gte(0)],
          node: getDep('node', validators => validators)
        })
      )
    )
  ), cases, []);
});

describe('inline conditions form › advanced', () => {
  baseCasesWithParams(() => (
    withMeta(
      setVDep('node',
        object2([
          ['id', number(), gte(0)],
          ['node', getDep('node', validators => validators)]
        ])
      )
    )
  ), cases, []);
});