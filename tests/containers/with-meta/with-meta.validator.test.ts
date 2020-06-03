import { withErrors } from '@lib/base-api/containers/with-errors';
import { withMeta as validator } from '@lib/base-api/containers/with-meta';
import { integer } from '@lib/base-api/extensions/validators/integer';
import { consecutive } from '@lib/base-api/groupers/consecutive';
import { parallel } from '@lib/base-api/groupers/parallel';
import { C_MET as VALIDATOR_NAME } from '@lib/base-api/names';
import { gte } from '@lib/base-api/validators/is';
import { number } from '@lib/base-api/validators/number';
import { compile } from '@lib/templating-api/template';
import { baseCasesWithParams } from '@test/utilities';
import { cases1, cases2, templateCases1 } from './cases';

describe(`container › ${VALIDATOR_NAME}`, () => {
  describe('base 1', () =>
    baseCasesWithParams(() => validator(
      withErrors(
        consecutive(
          number(({ validator }) => validator),
          gte(0, ({ validator }) => validator),
          integer(({ validator }) => validator)
        )
      )
    ), cases1, [])
  );

  describe('base 2', () =>
    baseCasesWithParams(() => validator(
      withErrors(
        consecutive(
          number(({ validator }) => validator),
          parallel(
            gte(0, ({ validator }) => validator),
            integer(({ validator }) => validator)
          )
        )
      )
    ), cases2, [])
  );

  describe('base 1 › compile', () =>
    baseCasesWithParams(() => compile('@number!err : @compare(>=0)!err : @compare(%1)!err ~e ~m')(
      null,
      { err: ({ validator }) => validator }
    ), templateCases1, [])
  );

  test('base › logs', () => {
    validator(
      withErrors(
        consecutive(
          number(),
          gte(0),
        )
      ), logs => expect(logs).toEqual([
        ['number', 10, []],
        ['gte', 10, [0]]
      ])
    )(10)
  });

  // test('base › logs › template', () => {
  //   template('@number : @compare(>=0) ~m($0)')(
  //     [
  //       (logs: any) => expect(logs).toEqual([
  //         ['number', 10, []],
  //         ['gte', 10, [0]]
  //       ])
  //     ]
  //   )(10)
  // });
});