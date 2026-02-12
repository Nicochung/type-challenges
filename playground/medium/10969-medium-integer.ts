/*
  10969 - Integer
  -------
  by HuaBing (@hbcraft) #medium #template-literal

  ### Question

  Please complete type `Integer<T>`, type `T` inherits from `number`, if `T` is an integer return it, otherwise return `never`.

  > View on GitHub: https://tsch.js.org/10969
*/

/* _____________ Your Code Here _____________ */

// type IsSame<A, B> =
//   [A] extends [B]
//   ? [B] extends [A]
//     ? true
//     : false
//   : false
// ;

// type IsValidDecimalPlaces<T extends string> =
//   T extends ""
//   ? true
//   : T extends `${infer Head extends "0"}${infer Tail}`
//     ? true & IsValidDecimalPlaces<Tail>
//     : false
// ;

// type A1 = IsValidDecimalPlaces<"000">;
//   // ^?
// type A2 = IsValidDecimalPlaces<"010">;
//   // ^?
// type A3 = IsValidDecimalPlaces<"">;
//   // ^?

// type Integer<T extends number> =
//   IsSame<T, number> extends true
//   ? never
//   : `${T}` extends `${infer Head}.${infer Tail}`
//     ? IsValidDecimalPlaces<Tail> extends true
//       ? T
//       : never
//     : T
// ;
// type IsSame<A, B> =
//   [A] extends [B]
//   ? [B] extends [A]
//     ? true
//     : false
//   : false
// ;

// type IsValidDecimalPlaces<T extends string> =
//   T extends ""
//   ? true
//   : T extends `${infer Head extends "0"}${infer Tail}`
//     ? true & IsValidDecimalPlaces<Tail>
//     : false
// ;

// type A1 = IsValidDecimalPlaces<"000">;
//   // ^?
// type A2 = IsValidDecimalPlaces<"010">;
//   // ^?
// type A3 = IsValidDecimalPlaces<"">;
//   // ^?

// type Integer<T extends number> =
//   IsSame<T, number> extends true
//   ? never
//   : `${T}` extends `${infer Head}.${infer Tail}`
//     ? IsValidDecimalPlaces<Tail> extends true
//       ? T
//       : never
//     : T
// ;

// type Integer<T extends number> =
//   number extends T
//   ? never
//   : `${T & number}` extends `${string}.${string}`
//     ? never // Exclude floating point
//     : T
// ;
type Integer<T extends number> =
  `${T}` extends `${bigint}`
  ? T
  : never
;

type A = Integer<1>;
  // ^?
type B = Integer<1.1>;
  // ^?
type D = Integer<1.000000000>;
  // ^?
type E = Integer<0.5>;
  // ^?
type F = Integer<28.00>;
  // ^?
type G = Integer<28.101>;
  // ^?
type H = Integer<typeof x>;
  // ^?
type I = Integer<typeof y>;
  // ^?

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

let x = 1
let y = 1 as const

type cases1 = [
  Expect<Equal<Integer<1>, 1>>,
  Expect<Equal<Integer<1.1>, never>>,
  Expect<Equal<Integer<1.0>, 1>>,
  Expect<Equal<Integer<1.000000000>, 1>>,
  Expect<Equal<Integer<0.5>, never>>,
  Expect<Equal<Integer<28.00>, 28>>,
  Expect<Equal<Integer<28.101>, never>>,
  Expect<Equal<Integer<typeof x>, never>>,
  Expect<Equal<Integer<typeof y>, 1>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/10969/answer
  > View solutions: https://tsch.js.org/10969/solutions
  > More Challenges: https://tsch.js.org
*/
