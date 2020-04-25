/**
 * @name {keysMap}
 * 
 * @scheme {keysMap<T extends ObjectLike>(mapper: (key: string) => string): Validator<T, T>}
 * 
 * @desc Maps object keys with custom mapper.
 * 
 * {@link docs/base-api/type-processor}
 * 
 * @param {Function} mapper Field's mapper.
 *
 * {@link docs/base-api/processor-result}
 */

//#example
import * as v from 'uvo';

v.keysMap((key: string) => `_${key}`)({ f1: 'abc', f2: 10 });
// => { _f1: 'abc', _f2: 10 }

v.keysMap((key: string) => key.toUpperCase())({ f1: 'abc', f2: 10 });
// => { F1: 'abc', F2: 10 }

v.keysMap((key: string) => key === 'f1' ? 'f2' : key)({ f1: 'abc' }); // moves/renames field
// => { f2: 'abc' }