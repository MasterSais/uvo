/** 
 * @name {ObjectSpec}
 * @desc Specification for 'object' and 'object2' validators.
 * @type {Validator | Record<string, Array<Validator<any, any>>} 
 */

//#example
type ObjectSpec = Record<string, Array<Validator<any, any>> | Validator<any, any>>;