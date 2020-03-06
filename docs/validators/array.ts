/**
 * @name {array<T>(itemSpec?: Array<Processor<any, T>> | Processor<any, T>, error?: Error): Processor<Array<any>, Array<T>>}
 * 
 * @desc Checks value to be an array.
 * 
 * {@link docs/type-validator-processor}
 * 
 * @param {Array=} itemSpec Validator(s) of array elements. 
 * 
 * {@link docs/error-param}
 * 
 * {@link docs/processor-result}
 * 
 * @throws {string} Will throw an error if 'itemSpec' is invalid.
 */

//#example
import * as v from 'usov';

const simpleOne = (
  v.array([ // is array?
    v.number(), // is element can be a number?
    v.gte(0) // is element positive or zero?
  ])
);

simpleOne('abc' as unknown as Array<any>); // not an array.
// => null

simpleOne([0, 1, 2]); // right.
// => [0, 1, 2]

simpleOne([0, -1, 2]); // '-1' is negative.
// => [0, null, 2]

simpleOne([0, 1, 'a']); // 'a' is a string.
// => [0, 1, null]

//but
simpleOne([0, 1, '2']); // right.
// => [0, 1, 2]

const anotherOne = (
  v.consecutive( // checks input sequentially with few validators.
    v.array([
      v.number(),
      v.clamp(0, 10) // clamps value between provided boundaries.
    ]),
    v.maxLen(3) // checks array's length.
  )
);

anotherOne([0, 1, 2]); // right.
// => [0, 1, 2]

anotherOne([0, 1, 20]); // '20' will be clamped to '10'.
// => [0, 1, 10]

anotherOne([0, 1, 2, 3]); // too long.
// => null