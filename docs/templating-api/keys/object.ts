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

template(`
  @object(
    $0 : @number : @compare(>0),
    $1 : @string : @length(>=10),
    $2 : @bool
  )
`)([
  'id',
  /.*(name)/,
  ['isValid', 'isActive']
]);

tml`
  @o(
    id @n @c(>0),
    name @s @l(>=10)
  )
`();