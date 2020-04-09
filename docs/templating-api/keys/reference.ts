/**
 * @name {reference}
 * 
 * @desc Provides references across the scheme.
 * 
 * `#...` in validation sequence settles current value as specific reference. 
 * 
 * `#...` in parameters retrieves value from specific reference. 
 * 
 * Meta required.
 */

//#example
import { template, tml } from 'uvo/template';

template(`
  @object(
    a : @date : @compare(>$now) : #a,
    b : @date : @compare(>=#a) : #b,
    c : @date : @compare(>=#b)
  ) ~meta
`)({ now: Date.now() });

tml`
  @o(
    a @d @c(>$0) #a,
    b @d @c(>=#a) #b,
    c @d @c(>=#b)
  ) ~m
`([Date.now()]);

// Additional reference value processing via injected function.
tml`
  @o(
    a @d @c(>$0) #a,
    b @d @c(>=$1(#a)) #b,
    c @d @c(>=#b)
  ) ~m
`([
  Date.now(),
  a => a + 1000 // 'b' must be greater or equal than 'a' + 1000.
]);