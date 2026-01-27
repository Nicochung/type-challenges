/*
  5140 - Trunc
  -------
  by jiangshan (@jiangshanmeta) #medium #template-literal

  ### Question

  Implement the type version of ```Math.trunc```, which takes string or number and returns the integer part of a number by removing any fractional digits.

  For example:

  ```typescript
  type A = Trunc<12.34> // 12
  ```

  > View on GitHub: https://tsch.js.org/5140
*/

/* _____________ Your Code Here _____________ */

// Convert signed string into number, trunc to closest 0
type Helper<T extends string> =
  T extends ""
  ? "0"
  : T extends "-"
    ? "-0"
    : T
;

type Trunc<T extends number | string> =
  `${T}` extends `${infer Head}.${string}`
  ? Helper<Head>
  : Helper<`${T}`>
;

type A = Trunc<0.1>;
  // ^?
type B = Trunc<0.2>;
  // ^?
type C = Trunc<1.234>;
  // ^?
type D = Trunc<12.345>;
  // ^?
type E = Trunc<-5.1>;
  // ^?
type F = Trunc<'.3'>;
  // ^?
type G = Trunc<'1.234'>;
  // ^?
type H = Trunc<"-.3">;
  // ^?
type I = Trunc<"-10.234">;
  // ^?
type J = Trunc<"10">;
  // ^?

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Trunc<0.1>, '0'>>,
  Expect<Equal<Trunc<0.2>, '0'>>,
  Expect<Equal<Trunc<1.234>, '1'>>,
  Expect<Equal<Trunc<12.345>, '12'>>,
  Expect<Equal<Trunc<-5.1>, '-5'>>,
  Expect<Equal<Trunc<'.3'>, '0'>>,
  Expect<Equal<Trunc<'1.234'>, '1'>>,
  Expect<Equal<Trunc<'-.3'>, '-0'>>,
  Expect<Equal<Trunc<'-10.234'>, '-10'>>,
  Expect<Equal<Trunc<10>, '10'>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/5140/answer
  > View solutions: https://tsch.js.org/5140/solutions
  > More Challenges: https://tsch.js.org
*/
