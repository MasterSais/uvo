/**
 * @name {default}
 * 
 * @desc Provides default value into sequence.
 */

//#example
import { template } from 'uvo/template';

template(`@default(10, @number)`)();

template(`@default($0, @number)`)([() => 10]);