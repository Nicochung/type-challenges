/*
  3243 - FlattenDepth
  -------
  by jiangshan (@jiangshanmeta) #medium #array

  ### Question

  Recursively flatten array up to depth times.

  For example:

  ```typescript
  type a = FlattenDepth<[1, 2, [3, 4], [[[5]]]], 2> // [1, 2, 3, 4, [5]]. flattern 2 times
  type b = FlattenDepth<[1, 2, [3, 4], [[[5]]]]> // [1, 2, 3, 4, [[5]]]. Depth defaults to be 1
  ```

  If the depth is provided, it's guaranteed to be positive integer.

  > View on GitHub: https://tsch.js.org/3243
*/

/* _____________ Your Code Here _____________ */

// type Increment <T extends unknown[]> = [...T, T["length"]];

// type Times<N extends number, Acc extends unknown[] = []> =
//   1 extends 0
//   ? never
//   : Acc["length"] extends N
//     ? Acc
//     : Times<N, Increment<Acc>>
// ;

// type Pop<T extends unknown[]> =
//   T extends [... infer Heads, unknown]
//   ? Heads
//   : never
// ;

// type MinusOne<T extends number, TIMES_RESULT extends number[] = Times<T>> =
//   Pop<TIMES_RESULT>["length"]
// ;

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

// type FlattenDepth<T extends unknown[], Depth extends number = 1> =
//   T extends [infer Head, ... infer Tail]
//   ? Depth extends 0
//     ? T
//     : Head extends unknown[]
//       ? [...FlattenDepth<Head, MinusOne<Depth>>, ...FlattenDepth<Tail, Depth>]
//       : [Head, ...FlattenDepth<Tail, Depth>]
//   : T
// ;

// type FlattenDepth<T extends unknown[], Depth extends number = 1> =
//   T extends [infer Head, ... infer Tail]
//   ? Head extends unknown[]
//     ? Depth extends 0
//       ? T
//       : [...FlattenDepth<Head, MinusOne<Depth>>, ...FlattenDepth<Tail, Depth>]
//     : Depth extends 0
//       ? T
//       : [Head, ...FlattenDepth<Tail, Depth>]
//   : []
// ;

type FlattenDepth<T extends unknown[], Depth extends number = 1,Count extends 1[] = []> =
  Count["length"] extends Depth
  ? T
  : T extends [infer Head, ...infer Tail]
    ? Head extends unknown[]
      ? [...FlattenDepth<Head, Depth, [...Count, 1]>, ...FlattenDepth<Tail, Depth, Count>]
      : [Head, ...FlattenDepth<Tail, Depth, Count>]
    : []
;

type A = FlattenDepth<[]>;
  // ^?
type B = FlattenDepth<[1, 2, 3, 4]>;
  // ^?
type C = FlattenDepth<[1, [2]]>;
  // ^?
type D = FlattenDepth<[1, 2, [3, 4], [[[5]]]], 2>;
  // ^?
type E = FlattenDepth<[1, 2, [3, 4], [[[5]]]]>;
  // ^?
type F = FlattenDepth<[1, [2, [3, [4, [5]]]]], 3>;
  // ^?
type G = FlattenDepth<[1, [2, [3, [4, [5]]]]], 19260817>;
  // ^?

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<FlattenDepth<[]>, []>>,
  Expect<Equal<FlattenDepth<[1, 2, 3, 4]>, [1, 2, 3, 4]>>,
  Expect<Equal<FlattenDepth<[1, [2]]>, [1, 2]>>,
  Expect<Equal<FlattenDepth<[1, 2, [3, 4], [[[5]]]], 2>, [1, 2, 3, 4, [5]]>>,
  Expect<Equal<FlattenDepth<[1, 2, [3, 4], [[[5]]]]>, [1, 2, 3, 4, [[5]]]>>,
  Expect<Equal<FlattenDepth<[1, [2, [3, [4, [5]]]]], 3>, [1, 2, 3, 4, [5]]>>,
  Expect<Equal<FlattenDepth<[1, [2, [3, [4, [5]]]]], 19260817>, [1, 2, 3, 4, 5]>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/3243/answer
  > View solutions: https://tsch.js.org/3243/solutions
  > More Challenges: https://tsch.js.org
*/
