/*
  4518 - Fill
  -------
  by キリサメ qianxi (@qianxi0410) #medium #tuple

  ### Question

  `Fill`, a common JavaScript function, now let us implement it with types.
  `Fill<T, N, Start?, End?>`, as you can see,`Fill` accepts four types of parameters, of which `T` and `N` are required parameters, and `Start` and `End` are optional parameters.
  The requirements for these parameters are: `T` must be a `tuple`, `N` can be any type of value, `Start` and `End` must be integers greater than or equal to 0.

  ```ts
  type exp = Fill<[1, 2, 3], 0> // expected to be [0, 0, 0]
  ```
  In order to simulate the real function, the test may contain some boundary conditions, I hope you can enjoy it :)

  > View on GitHub: https://tsch.js.org/4518
*/

/* _____________ Your Code Here _____________ */

type GreaterThan<A extends number, B extends number, Count extends 1[] = []> =
  Count["length"] extends A
  ? false
  : Count["length"] extends B
    ? true
    : GreaterThan<A, B, [...Count, 1]>
;

type IsSameNumber<A extends number, B extends number> =
  A extends B
  ? B extends A
    ? true
    : false
  : false
;

// type Fill<
//   T extends unknown[],
//   N,
//   Start extends number = 0,
//   End extends number = T['length'],
// > =
//   IsSameNumber<Start, End> extends true
//   ? T
//   : GreaterThan<Start, End> extends true
//     ? T
//     : InternalFill<T, N, Start, End, false>
// ;

// type InternalFill<T extends unknown[], N, Start extends number, End extends number, ShouldReplace extends boolean, Acc extends unknown[] = []> =
//   T extends [infer Head, ...infer Tail]
//   ? Start extends Acc["length"]
//     // Start replace from this index
//     ? InternalFill<Tail, N, Start, End, true, [...Acc, N]>
//     : Acc["length"] extends End
//       // Stop replacing from this index
//       ? InternalFill<Tail, N, Start, End, false, [...Acc, Head]>
//         // Within Start - End Range
//       : ShouldReplace extends true
//         ? InternalFill<Tail, N, Start, End, true, [...Acc, N]>
//         : InternalFill<Tail, N, Start, End, false, [...Acc, Head]>
//   : Acc
// ;


type Fill<
  T extends unknown[],
  N,
  Start extends number = 0,
  End extends number = T['length'],
  Acc extends unknown[] = [],
> =
  T extends [infer Head, ...infer Tail]
  ? [...Acc, unknown][Start] extends undefined
    // Don't replace if Acc not yet fill up to index Start
    ? Fill<Tail, N, Start, End, [...Acc, Head]>
    : [...Acc, unknown][End] extends undefined
      // Replace if Acc is at length between Start < length <= End
      ? Fill<Tail, N, Start, End, [...Acc, N]>
        // Stop replacing if Acc already fill up to index End
      : Fill<Tail, N, Start, End, [...Acc, Head]>
  : Acc
;

type A = Fill<[], 0>;
  // ^?
type B = Fill<[], 0, 0, 3>;
  // ^?
type C = Fill<[1, 2, 3], 0, 0, 0>;
  // ^?
type D = Fill<[1, 2, 3], 0, 2, 2>;
  // ^?
type E = Fill<[1, 2, 3], 0>;
  // ^?
type F = Fill<[1, 2, 3], true>;
  // ^?
type G = Fill<[1, 2, 3], true, 0, 1>;
  // ^?
type H = Fill<[1, 2, 3], true, 1, 3>;
  // ^?
type I = Fill<[1, 2, 3], true, 10, 0>;
  // ^?
type J = Fill<[1, 2, 3], true, 10, 20>;
  // ^?
type K = Fill<[1, 2, 3], true, 0, 10>;
  // ^?
/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Fill<[], 0>, []>>,
  Expect<Equal<Fill<[], 0, 0, 3>, []>>,
  Expect<Equal<Fill<[1, 2, 3], 0, 0, 0>, [1, 2, 3]>>,
  Expect<Equal<Fill<[1, 2, 3], 0, 2, 2>, [1, 2, 3]>>,
  Expect<Equal<Fill<[1, 2, 3], 0>, [0, 0, 0]>>,
  Expect<Equal<Fill<[1, 2, 3], true>, [true, true, true]>>,
  Expect<Equal<Fill<[1, 2, 3], true, 0, 1>, [true, 2, 3]>>,
  Expect<Equal<Fill<[1, 2, 3], true, 1, 3>, [1, true, true]>>,
  Expect<Equal<Fill<[1, 2, 3], true, 10, 0>, [1, 2, 3]>>,
  Expect<Equal<Fill<[1, 2, 3], true, 10, 20>, [1, 2, 3]>>,
  Expect<Equal<Fill<[1, 2, 3], true, 0, 10>, [true, true, true]>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/4518/answer
  > View solutions: https://tsch.js.org/4518/solutions
  > More Challenges: https://tsch.js.org
*/
