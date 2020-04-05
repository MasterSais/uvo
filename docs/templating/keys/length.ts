/**
 * @name {length}
 * 
 * @desc Checks value's length with provided comparator. `l` - short version.
 * 
 * Comparators: `>` `>=` `<` `<=` `=` `!=` `%` (multiple to) `!%` (not multiple to)
 */

//#example
import { template, tml } from 'uvo/template';

template(`@length(>=0)`)()('abc');

tml`@length(=2)`()([1, 2]);

tml`@length(>#refName)`()('abc');

tml`@length(!=$param)`({ param: 10 })({ length: 2 });

tml`@l(%2)`()('abcd');

tml`@l(<=$0)`([10])([0]);