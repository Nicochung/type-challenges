/*
  4182 - Fibonacci Sequence
  -------
  by windliang (@wind-liang) #medium

  ### Question

  Implement a generic `Fibonacci<T>` that takes a number `T` and returns its corresponding [Fibonacci number](https://en.wikipedia.org/wiki/Fibonacci_number).

  The sequence starts:
  1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, ...

  For example
  ```ts
  type Result1 = Fibonacci<3> // 2
  type Result2 = Fibonacci<8> // 21
  ```

  > View on GitHub: https://tsch.js.org/4182
*/

/* _____________ Your Code Here _____________ */

// This one is not 0 index, is 1 index
// Fib(1) = 1
// Fib(2) = 1
// Fib(3) = 2
// Fib(n) = Fib(n-1) + Fib(n-2)

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

// type FibHelper<T extends number> =
//   T extends 0
//   ? []
//   : T extends 1 | 2
//     ? [1]
//     : [...FibHelper<MinusOne<T>>, ...FibHelper<MinusOne<MinusOne<T>>>]
// ;

// type Fibonacci<T extends number> = FibHelper<T>["length"];

type FibHelper<T extends number, CurrentIndex extends 1[] = [1], Prev extends 1[] = [], Current extends 1[] = [1]> =
  T extends 0
  ? []
  : CurrentIndex["length"] extends T
    ? Current
    : FibHelper<T, [...CurrentIndex, 1], Current, [...Prev, ...Current]>
;

type Fibonacci<T extends number> = FibHelper<T>["length"];

type A0 = Fibonacci<0>;
  // ^?
type A = Fibonacci<1>;
  // ^?
type B = Fibonacci<2>;
  // ^?
type C = Fibonacci<3>;
  // ^?
type D = Fibonacci<8>;
  // ^?

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Fibonacci<1>, 1>>,
  Expect<Equal<Fibonacci<2>, 1>>,
  Expect<Equal<Fibonacci<3>, 2>>,
  Expect<Equal<Fibonacci<8>, 21>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/4182/answer
  > View solutions: https://tsch.js.org/4182/solutions
  > More Challenges: https://tsch.js.org
*/
