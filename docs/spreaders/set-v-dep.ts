/**
 * @name {setVDep<T>(field: string, ...validators: Array<Validator<T>>): Validator<T>}
 * 
 * @desc Puts validators into spreaded structure.
 * Might be used for recursive schemes.
 * 
 * {@link docs/type-spreader}
 * 
 * @param {string} field Spreaded value name.
 * @param {..Validator} validators Validators to save.
 * 
 * {@link docs/validator-result}
 * 
 * @throws {string} Will throw an error if 'field' or 'validators' or 'meta' is invalid.
 */

//#example
import * as v from 'baridetta';

const recursiveOne = (
  v.withMeta( // meta schema is required.
    v.setVDep('node', // sets validators into meta schema.
      v.object({
        id: [v.number(), v.gte(0)],
        node: v.getDep('node', validators => validators)
      })
    )
  )
);

recursiveOne({ id: 1, node: { id: 2, node: { id: 3, node: { id: 4 } } } });
// => { id: 1, node: { id: 2, node: { id: 3, node: { id: 4, node: null } } } }

recursiveOne({ id: 1, node: { id: -1, node: { id: 3, node: { id: 4 } } } });
// => { id: 1, node: { id: null, node: { id: 3, node: { id: 4, node: null } } } }

recursiveOne({ id: 1, node: { id: -1, node: [1] } });
// => { id: 1, node: { id: null, node: null } }