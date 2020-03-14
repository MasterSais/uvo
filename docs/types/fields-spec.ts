/** 
 * @name {FieldsSpec}
 * 
 * @desc Specification for 'fields' validator.
 * 
 * @type {Array | string} 
 */

//#example
type FieldsSpec = (
  string
  | [
    ('&' | '|' | '^'),
    FieldsSpec | string,
    FieldsSpec | string,
    ...Array<FieldsSpec | string>
  ]
);