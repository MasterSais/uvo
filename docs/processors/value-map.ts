/**
 * @name {valueMap}
 * 
 * @scheme {valueMap<T, R>(...mappers: Array<[Primitive | ((value: T) => boolean) | RegExp, Primitive | ((value: T) => R)]>): Validator<T, R>}
 * 
 * @desc Maps value with custom mappers.
 * 
 * {@link docs/type-processor}
 * 
 * @param {...Array} mappers Value mappers.
 *
 * {@link docs/processor-result}
 */

//#example
import * as v from 'uvo';

v.valueMap(['yes', true], ['no', false])('yes');
// => true

v.valueMap(['yes', true], ['no', false])(true);
// => true

v.valueMap(['yes', true], ['no', false])('nope');
// => 'nope'

v.valueMap(['yes', true], [(value: string) => ['no', 'nope'].includes(value), false])('nope');
// => false

v.valueMap(['yes', true], [/no|nope/, false])('nope');
// => false

v.valueMap(['yes', true], [/no|nope/, (value: string) => `${value}?`])('nope');
// => 'nope?'