/** 
 * @name {ObjectSpec}
 * @desc Specification for 'object' and 'object2' validators.
 * @type {Processor | Record<string, Array<Processor<any, any>>} 
 */

//#example
type ObjectSpec = Record<string, Array<Processor<any, any>> | Processor<any, any>>;