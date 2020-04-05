/**
 * @name {number}
 * 
 * @desc Checks value to be a number. `n` - short version.
 */

//#example
import { template, tml } from 'uvo/template';

template(`@number`)()(10);

tml`@number`()(10);

tml`@n`()(10);