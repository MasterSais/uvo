/**
 * @name {transform<T, R>(...processors: Array<Processor<T | R, R>>): Processor<T | R, R>}
 * 
 * @desc Groups processors sequentially.
 * Passes value through a sequence of processors.
 * Takes only processors (doesn't check errors).
 * 
 * {@link docs/type-grouper}
 * 
 * @param {...Processor} processors Processors list.
 * 
 * {@link docs/processor-result}
 * 
 * @throws {string} Will throw an error if 'processors' is invalid.
 */

//#example
import * as v from 'usov';

const uchi = (
  v.transform(
    v.round(),
    v.clamp(0, 10)
  )
);

uchi(10.5);
// => 10

uchi(8.3);
// => 8