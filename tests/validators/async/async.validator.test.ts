import { withPromise } from '@lib/base-api/containers/with-promise';
import { V_ASYNC as VALIDATOR_NAME } from '@lib/base-api/names';
import { async as validator } from '@lib/base-api/validators/async';
import { template, tml } from '@lib/templating-api/template';
import { asyncCases } from '@test/utilities';
import { cases } from './cases';

describe(`validator › ${VALIDATOR_NAME}`, () => {
  describe('base', () =>
    asyncCases(withPromise(validator()), cases)
  );

  describe('base › template', () =>
    asyncCases(template('@async ~promise')(), cases)
  );

  describe('base › template › short', () =>
    asyncCases(tml`@p ~p`(), [cases[0]])
  );
});