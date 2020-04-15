/**
 * @name {errors}
 * 
 * @desc Errors for scheme. Use `!` after validator. 
 */

//#example
import { template, tml } from 'uvo/template';

template(`
  @object(
    id : @number!err1 : @compare(>0)!err2,
    name : @string!err3 : @length(>=10)!err4
  ) ~error
`)(null, { err1: 'ERR1', err2: () => 'ERR2', err3: 'ERR3', err4: () => 'ERR4' });

tml`
  @o(
    id @n!0 @c(>0)!1,
    name @s!2 @l(>=10)!3
  ) ~e
`(null, ['ERR1', () => 'ERR2', 'ERR3', () => 'ERR4']);

// Common error processor with logs
template(`
  @object(
    id : @number!0 : @compare(>0)!1,
    name : @string!2 : @length(>=10)!3
  ) ~error($0) ~meta($1)
`)(
  [
    (error, { validator }) => ({ error, validator }),
    logs => console.log(logs)
  ], 
  ['ERR1', () => 'ERR2', 'ERR3', () => 'ERR4']
);