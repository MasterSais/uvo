/**
 * @name {compare}
 * 
 * @desc Checks value with provided comparator. `c` - short version.
 * 
 * Comparators: `>` `>=` `<` `<=` `=` `!=` `%` (multiple to) `!%` `->` (one of) `!->` `*` regex match `!*`
 */

//#example
import { template, tml } from 'uvo/template';

template(`@compare(>=0)`)(); // number

template(`@compare(>=0,<=100)`)(); // few comparisons

template(`@compare(!=null)`)(); // null literal

tml`@c(='2')`(); // string literal

tml`@c(>#refName)`(); // reference

tml`@c(!=$param)`({ param: 10 }); // injection.

tml`@c(*$0)`([/[0-9]/]); // Regex.

tml`@c(%2)`(); // multiple to.

tml`@c(->$0)`([[1, 2, 3]]); // one of.