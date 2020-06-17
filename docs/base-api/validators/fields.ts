/**
 * @name {fields}
 * 
 * @scheme {fields<T extends ObjectLike>(spec: FieldsSpec, error?: ValidatorError): Validator<T>}
 * 
 * @desc Checks for fields in the input object.
 * 
 * {@link docs/base-api/type-validator}
 * 
 * @param {Array|string} spec FieldsSpec specification.
 * If array, the first element represents a logical operation, otherwise a name of single field.
 * Operations: OR - '|', AND - '&', XOR - '^'. 
 * 
 * {@link docs/base-api/error-param}
 * 
 * {@link docs/base-api/validator-result}
 * 
 * @throws {string} Will throw an error if 'spec' is invalid.
 */

//#example
import * as v from 'uvo';

v.fields('f1')({ f1: 1 }); // requires 'f1' field.
// => { f1: 1 }

v.fields('f1')({ f1: 1, f2: 2 });
// => { f1: 1 }

v.fields(['&', 'f1', 'f2'])({ f1: 1, f2: 2 }); // requires both of fields.
// => { f1: 1, f2: 2 }

v.fields(['&', 'f1', 'f2'])({ f1: 1, f2: null });
// => null

v.fields(['|', 'f1', 'f2'])({ f1: 1, f2: 2 }); // requires at least one field.
// => { f1: 1, f2: 2 }

v.fields(['|', 'f1', 'f2'])({ f1: 1, f2: null });
// => { f1: 1, f2: null }

v.fields(['|', 'f1', 'f2'])({ f1: null });
// => null

v.fields(['^', 'f1', 'f2'])({ f1: 1, f2: 2 }); // requires at only one field.
// => null

v.fields(['^', 'f1', 'f2'])({ f1: 1, f2: null });
// => { f1: 1, f2: null }

v.fields(['^', 'f1', 'f2'])({ f1: null });
// => null

// complex conditions
v.fields(['&', ['^', 'id', 'guid'], 'role', ['|', 'fullname', 'nickname']]);
// requires identifier ('id' either 'guid'), 'role', name ('fullname' or 'nickname' or both).