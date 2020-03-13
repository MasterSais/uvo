/**
 * @name {transform<T, R>(...processors: Array<Validator<T | R, R>>): Validator<T | R, R>}
 * 
 * @desc Groups processors sequentially.
 * Passes value through a sequence of processors.
 * Takes only processors (doesn't check errors).
 * 
 * {@link docs/type-grouper}
 * 
 * @param {...Processor} processors Validators list.
 * 
 * {@link docs/processor-result}
 * 
 * @throws {string} Will throw an error if 'processors' is invalid.
 */

//#example
import * as v from 'baridetta';

const unchi = (
  v.transform(
    v.round(),
    v.clamp(0, 10)
  )
);

unchi(10.5);
// => 10

unchi(8.3);
// => 8

const niUnchi = (
  v.transform((value: any) => value + 1) // custom transform.
);

niUnchi(10.5);
// => 11.5

niUnchi(8.3);
// => 9.3