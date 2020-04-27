/**
 * @name {fallback}
 * 
 * @desc Provides fallback into sequence. `f` - short version.
 */

//#example
import { template, tml } from 'uvo/template';

template(`@fallback(10, @number)`)();

template(`@fallback($0, @number)`)([() => 10]);

tml`@f(10, @n)`();