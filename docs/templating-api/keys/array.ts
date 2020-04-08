/**
 * @name {array}
 * 
 * @desc Checks value to be an array. `a` - short version.
 */

//#example
import { template, tml } from 'uvo/template';

template(`
  @array(
    @string : @length(<8)
  )
`)();

tml`
  @a(
    @s @l(<8)
  )
`();