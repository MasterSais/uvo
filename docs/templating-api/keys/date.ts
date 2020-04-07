/**
 * @name {date}
 * 
 * @desc Checks value to be a date compatible. `d` - short version.
 */

//#example
import { template, tml } from 'uvo/template';

template(`@date`)()(851720400000);

tml`@date`()(851720400000);

tml`@d`()(851720400000);