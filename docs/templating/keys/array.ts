/**
 * @name {array}
 * 
 * @desc Checks value to be an array. `a` - short version.
 */

//#example
import { template, tml } from 'uvo/template';

template(`@array`)()({});

tml`@array`()({});

tml`
  @array(
    @string : @length(<8)
  )
`()({});

tml`@a`()({});

tml`
  @a(
    @s @l(<8)
  )
`()({});