/*
  27958 - CheckRepeatedTuple
  -------
  by bowen (@jiaowoxiaobala) #medium

  ### Question

  Implement type `CheckRepeatedChars<T>` which will return whether type `T` contains duplicated member

  For example:

  ```ts
  type CheckRepeatedTuple<[1, 2, 3]>   // false
  type CheckRepeatedTuple<[1, 2, 1]>   // true
  ```

  > View on GitHub: https://tsch.js.org/27958
*/

/* _____________ Your Code Here _____________ */

type IsInArray<T, Arr extends unknown[] = []> =
  Arr extends [infer Head, ... infer Tail]
  ? Equal<T, Head> extends true
    ? true
    : IsInArray<T, Tail>
  : false;
;

type B1 = IsInArray<1, [1]>;
  // ^?
type B2 = IsInArray<1, []>;
  // ^?
type B3 = IsInArray<3, [4]>;
  // ^?

type CheckRepeatedTuple<T extends unknown[], Acc extends unknown[] = []> =
  T extends [infer Head, ... infer Tail]
  ? IsInArray<Head, Acc> extends true
    ? true
    : CheckRepeatedTuple<Tail, [...Acc, Head]>
  : false
;

type A1 = CheckRepeatedTuple<[number, number, string, boolean]>;
  // ^?
type A2 = CheckRepeatedTuple<[number, string]>;
  // ^?
type A3 = CheckRepeatedTuple<[1, 2, 3]>;
  // ^?
type A4 = CheckRepeatedTuple<[1, 2, 1]>;
  // ^?
type A5 = CheckRepeatedTuple<[]>;
  // ^?
type A6 = CheckRepeatedTuple<string[]>;
  // ^?
type A7 = CheckRepeatedTuple<[number, 1, string, '1', boolean, true, false, unknown, any]>;
  // ^?
type A8 = CheckRepeatedTuple<[never, any, never]>;
  // ^?

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<CheckRepeatedTuple<[number, number, string, boolean]>, true>>,
  Expect<Equal<CheckRepeatedTuple<[number, string]>, false>>,
  Expect<Equal<CheckRepeatedTuple<[1, 2, 3]>, false>>,
  Expect<Equal<CheckRepeatedTuple<[1, 2, 1]>, true>>,
  Expect<Equal<CheckRepeatedTuple<[]>, false>>,
  Expect<Equal<CheckRepeatedTuple<string[]>, false>>,
  Expect<Equal<CheckRepeatedTuple<[number, 1, string, '1', boolean, true, false, unknown, any]>, false>>,
  Expect<Equal<CheckRepeatedTuple<[never, any, never]>, true>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/27958/answer
  > View solutions: https://tsch.js.org/27958/solutions
  > More Challenges: https://tsch.js.org
*/
