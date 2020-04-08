/**
 * @name {containers}
 * 
 * @desc Provides specific container for scheme.
 * 
 * `~error` - provides `withErrors` container. `~e` - short version.
 * 
 * `~meta` - provides `withMeta` container. `~m` - short version.
 * 
 * `~promise` - provides `withPromise` container. `~p` - short version.
 * 
 * The last container will be an outer one. `promise` must go later than others containers.
 */

//#example
import { template, tml } from 'uvo/template';

template(`
  @object(
    a : @date : #a,
    b : @date : @compare(>=#a) : #b,
    c : @date : @compare(>=#b)
  ) ~error ~meta
`)();

tml`
  @o(
    a @d #a,
    b @d @c(>=#a) #b,
    c @d @c(>=#b)
  ) ~e ~m
`();