/*
  2257 - MinusOne
  -------
  by Mustafo Faiz (@fayzzzm) #medium #math

  ### Question

  Given a number (always positive) as a type. Your type should return the number decreased by one.

  For example:

  ```ts
  type Zero = MinusOne<1> // 0
  type FiftyFour = MinusOne<55> // 54
  ```

  > View on GitHub: https://tsch.js.org/2257
*/

/* _____________ Your Code Here _____________ */

// Approach 1. Turn number into a tuple -> remove 1 item -> return tuple["length"]
// Failed, Type instantiation is excessively deep and possibly infinite
// type TupleWithLength<T extends number, Acc extends unknown[] = []> =
//   1 extends 0
//   ? never
//   : T extends Acc["length"]
//     ? Acc
//     : TupleWithLength<T, [...Acc, Acc["length"]]>
// ;

// type MinusOne<T extends number> =
//   TupleWithLength<T> extends [any, ...infer Tail]
//   ? Tail["length"]
//   : never
// ;

// From youtube michigan typescript
type Increment <T extends unknown[]> = [...T, T["length"]];

type Times<N extends number, Acc extends unknown[] = []> =
  1 extends 0
  ? never
  : Acc["length"] extends N
    ? Acc
    : Times<N, Increment<Acc>>
;

type Pop<T extends unknown[]> =
  T extends [... infer Heads, unknown]
  ? Heads
  : never
;

type MinusOne<T extends number, TIMES_RESULT extends number[] = Times<T>> =
  Pop<TIMES_RESULT>["length"]
;

// Approach 2. Turn number into string -> Perform minus 1 in string, handle borrow subtraction -> trim leading 0 if needed

type A = MinusOne<1>;
  // ^?
type B = MinusOne<55>;
  // ^?
/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<MinusOne<1>, 0>>,
  Expect<Equal<MinusOne<55>, 54>>,
  Expect<Equal<MinusOne<3>, 2>>,
  Expect<Equal<MinusOne<100>, 99>>,
  Expect<Equal<MinusOne<1101>, 1100>>,
  // Expect<Equal<MinusOne<9_007_199_254_740_992>, 9_007_199_254_740_991>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/2257/answer
  > View solutions: https://tsch.js.org/2257/solutions
  > More Challenges: https://tsch.js.org
*/
