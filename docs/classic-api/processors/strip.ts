/**
 * @name {strip}
 * 
 * @scheme {strip<T extends ObjectLike, K>(field: string | RegExp, condition: boolean | ((value: K) => boolean) = true): Validator<T, T>}
 * 
 * @desc Removes field from object conditionally.
 * 
 * {@link docs/classic-api/type-processor}
 * 
 * @param {string | RegExp} field Field to remove.
 * 
 * @param {boolean | Function} condition Condition. Can be a function
 * 
 * {@link docs/classic-api/processor-result}
 */

//#example
import * as v from 'uvo';

v.strip('f1')({ f1: 'abc', f2: 10 });
// => { f2: 10 }

v.strip('f1', false)({ f1: 'abc', f2: 10 });
// => { f1: 'abc', f2: 10 }

v.strip('f1', (value: string) => value === 'abc')({ f1: 'abc', f2: 10 });
// => { f2: 10 }

v.strip('f1', (value: string) => value === 'a')({ f1: 'abc', f2: 10 });
// => { f1: 'abc', f2: 10 }

v.strip(/f1|f2/, (value: any) => value === null)({ f1: null, f2: 10 });
// => { f2: 10 }

v.strip(/f1|f2/, (value: any) => value === null)({ f1: null, f2: null });
// => {}

v.strip(/f1|f2/)({ f1: 10, f2: 'abc' });
// => {}