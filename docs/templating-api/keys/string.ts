/**
 * @name {string}
 * 
 * @desc Checks value to be a string. `s` - short version.
 */

//#example
import { template, tml } from 'uvo/template';

template(`@string`)()('str');

tml`@string`()('str');

tml`@s`()('str');