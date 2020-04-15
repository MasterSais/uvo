/**
 * @name {groupers}
 * 
 * @desc Provides grouping for validators.
 * 
 * <( ... )> - consecutive.
 * 
 * <[ ... ]> - or.
 * 
 * <{ ... }> - parallel.
 */

//#example
import { template, tml } from 'uvo/template';

template(`
  @object(
    id : <[ 
      <( @number : @compare(>=0) )>
      <( @string : @length(=36) )> 
    ]>,
    name : @string : <{ @length(>=10) : #name }>
  )
`)();

tml`
  @o(
    id <[ 
      <( @n @c(>=0) )>
      <( @s @l(=36) )> 
    ]>,
    name @s <{ @l(>=10) #name }>
  )
`();