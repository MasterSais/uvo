/**
 * @name {injection}
 * 
 * @desc External injections for scheme.
 */

//#example
import { template, tml } from 'uvo/template';

template(`
  @object(
    id : @number : @compare(>$minId),
    name : @string : @length(>=$minNameLength)
  )
`)({ minId: 0, minNameLength: () => 10 });

tml`
  @o(
    id @n @c(>$0),
    name @s @l(>=$1)
  )
`([0, () => 10]);

// Dynamic validators. `<( ... )>` - consecutive grouper.
template(`
  @object(
    id : @number : @compare(>0),
    name : $cond ? <( @string : @length(>=10) )>
  )
`)({ 
  cond: () => true // Condition for dynamic validation.
});

// Dynamic validators on reference
template(`
  @object(
    id : @number : @compare(>0) : #id,
    name : #id ? <( @string : @length(>=10) )>
  )
`)(); // Will validate name if 'id' ref is defined.

// Dynamic validators with reference in injection
template(`
  @object(
    id : @number : @compare(>0) : #id,
    name : $cond(#id) ? <( @string : @length(>=10) )>
  )
`)({ 
  cond: (id: number) => !!id
});