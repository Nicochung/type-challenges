/*
  30301 - IsOdd
  -------
  by jiangshan (@jiangshanmeta) #medium #string

  ### Question

  return true is a number is odd

  > View on GitHub: https://tsch.js.org/30301
*/

/* _____________ Your Code Here _____________ */

type IsOdd<T extends number> = `${T}` extends `${bigint | ""}${1 | 3 | 5 | 7 | 9}`
  ? true
  : false;

type A1 = IsOdd<5>;
  // ^?
type A2 = IsOdd<2023>;
  // ^?
type A3 = IsOdd<1456>;
  // ^?
type A4 = IsOdd<1926>;
  // ^?
type A5 = IsOdd<2.3>;
  // ^?
type A6 = IsOdd<3e23>;
  // ^?
type A7 = IsOdd<3e0>;
  // ^?
type A8 = IsOdd<number>;
  // ^?

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<IsOdd<5>, true>>,
  Expect<Equal<IsOdd<2023>, true>>,
  Expect<Equal<IsOdd<1453>, true>>,
  Expect<Equal<IsOdd<1926>, false>>,
  Expect<Equal<IsOdd<2.3>, false>>,
  Expect<Equal<IsOdd<3e23>, false>>,
  Expect<Equal<IsOdd<3e0>, true>>,
  Expect<Equal<IsOdd<number>, false>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/30301/answer
  > View solutions: https://tsch.js.org/30301/solutions
  > More Challenges: https://tsch.js.org
*/
