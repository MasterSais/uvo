/**
 * @name {bool}
 * 
 * @desc Checks value to be a boolean compatible. `b` - short version.
 */

//#example
import { template, tml } from 'uvo/template';

template(`@bool`)()(true);

tml`@bool`()(true);

tml`@b`()(true);