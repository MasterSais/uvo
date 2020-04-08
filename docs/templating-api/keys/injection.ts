/**
 * @name {injection}
 * 
 * @desc External injections for scheme.
 */

//#example
import { template, tml } from 'uvo/template';

template(`
  @object(
    id : @number : @compare(>$0),
    name : @string : @length(>=$1)
  )
`)([0, () => 10]);

tml`
  @object(
    id : @number : @compare(>$minId),
    name : @string : @length(>=$minNameLength)
  )
`({ minId: 0, minNameLength: () => 10 });