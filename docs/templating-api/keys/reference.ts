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
    a @d @c(>$now) #a,
    b @d @c(>=#a) #b,
    c @d @c(>=#b)
  ) ~m
`({ now: Date.now() });