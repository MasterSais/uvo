import { withErrors } from '@lib/containers/with-errors';
import { withMeta } from '@lib/containers/with-meta';
import { withPromise } from '@lib/containers/with-promise';
import { consecutive } from '@lib/groupers/consecutive';
import { parallel } from '@lib/groupers/parallel';
import { C_PRM as VALIDATOR_NAME } from '@lib/names';
import { gte } from '@lib/validators/gte';
import { integer } from '@lib/validators/integer';
import { number } from '@lib/validators/number';

test(`validator › ${VALIDATOR_NAME}`, () => {
  const promiseOne = (
    withPromise(
      withErrors(
        withMeta(
          consecutive(
            number(({ validator }) => validator),
            gte(0, ({ validator }) => validator),
            integer(({ validator }) => validator)
          )
        )
      )
    )
  );

  promiseOne(12).then(data => expect(data).toEqual(12));

  promiseOne('abc').catch(errors => expect(errors).toEqual(['number']));

  promiseOne(-1).catch(errors => expect(errors).toEqual(['gte']));

  promiseOne(2.2).catch(errors => expect(errors).toEqual(['integer']));

  const promiseToo = (
    withPromise(
      withErrors(
        withMeta(
          consecutive(
            number(({ validator }) => validator),
            parallel(
              gte(0, ({ validator }) => validator),
              integer(({ validator }) => validator)
            )
          )
        )
      )
    )
  );

  promiseToo(12).then(data => expect(data).toEqual(12));

  promiseToo('abc').catch(errors => expect(errors).toEqual(['number']));

  promiseToo(-1).catch(errors => expect(errors).toEqual(['gte']));

  promiseToo(2.2).catch(errors => expect(errors).toEqual(['integer']));

  promiseToo(-2.2).catch(errors => expect(errors).toEqual(['gte', 'integer']));
});