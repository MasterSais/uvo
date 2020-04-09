/**
 * @name {length}
 * 
 * @desc Checks value's length with provided comparator. `l` - short version.
 * 
 * Comparators: `>` `>=` `<` `<=` `=` `!=` `%` (multiple to) `!%` (not multiple to)
 */

//#example
import { template, tml } from 'uvo/template';

template(`@length(>=0)`)();

template(`@length(>=10,<=100)`)();

template(`@length(=2)`)();

tml`@l(>#refName)`();

tml`@l(!=$param)`({ param: 10 });

tml`@l(%2)`();

tml`@l(<=$0)`([10]);