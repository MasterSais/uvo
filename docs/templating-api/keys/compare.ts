/**
 * @name {compare}
 * 
 * @desc Checks value with provided comparator. `c` - short version.
 * 
 * Comparators: `>` `>=` `<` `<=` `=` `!=` `%` (multiple to) `!%` (not multiple to)
 */

//#example
import { template, tml } from 'uvo/template';

template(`@compare(>=0)`)();

template(`@compare(!=null)`)();

tml`@c(='2')`();

tml`@c(>#refName)`();

tml`@c(!=$param)`({ param: 10 });

tml`@c(%2)`();