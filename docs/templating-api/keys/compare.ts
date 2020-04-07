/**
 * @name {compare}
 * 
 * @desc Checks value with provided comparator. `c` - short version.
 * 
 * Comparators: `>` `>=` `<` `<=` `=` `!=` `%` (multiple to) `!%` (not multiple to)
 */

//#example
import { template, tml } from 'uvo/template';

template(`@compare(>=0)`)()(2);

template(`@compare(!=null)`)()(10);

template(`@compare(=true)`)()(true);

tml`@compare(='2')`()('2');

tml`@compare(>#refName)`()(2);

tml`@compare(!=$param)`({ param: 10 })(2);

tml`@c(%2)`()(2);

tml`@c(<=$0)`([10])(2);