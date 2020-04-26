import { gte } from '@lib/base-api/validators/is';
import { number } from '@lib/base-api/validators/number';
import { object2 } from '@lib/base-api/validators/object2';
import { template } from '@lib/templating-api/template';
import { baseCasesWithParams } from '@test/utilities';
import { cases } from './cases';

describe('several fields', () => {
  baseCasesWithParams(param => (
    object2([
      [param, number(), gte(0)],
    ])
  ), cases, []);
});

describe('several fields › template', () => {
  baseCasesWithParams((param) => (
    template(`
      @object(
        $0 : @number : @compare(>=0)
      )
    `)([param])
  ), cases, []);
});