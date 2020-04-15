/**
 * @name {object}
 * 
 * @desc Checks value to be an object. `o` - short version.
 */

//#example
import { template, tml } from 'uvo/template';

template(`
  @object(
    id : @number : @compare(>0),
    name : @string : @length(>=10)
  )
`)();

tml`
  @o(
    id @n @c(>0),
    name @s @l(>=10)
  )
`();