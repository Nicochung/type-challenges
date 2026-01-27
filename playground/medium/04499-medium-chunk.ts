/*
  4499 - Chunk
  -------
  by キリサメ qianxi (@qianxi0410) #medium #tuple

  ### Question

  Do you know `lodash`? `Chunk` is a very useful function in it, now let's implement it.
  `Chunk<T, N>` accepts two required type parameters, the `T` must be a `tuple`, and the `N` must be an `integer >=1`

  ```ts
  type exp1 = Chunk<[1, 2, 3], 2> // expected to be [[1, 2], [3]]
  type exp2 = Chunk<[1, 2, 3], 4> // expected to be [[1, 2, 3]]
  type exp3 = Chunk<[1, 2, 3], 1> // expected to be [[1], [2], [3]]
  ```

  > View on GitHub: https://tsch.js.org/4499
*/

/* _____________ Your Code Here _____________ */

// type Chunk<T extends unknown[], Length extends number> = InternalChunk<T, Length>;

// type InternalChunk<T extends unknown[], Length extends number, Temp extends unknown[] = [], Acc extends unknown[] = []> =
//   T extends [infer Head, ...infer Tail]
//   // Acc full push item into Acc and count from zero
//   ? Temp["length"] extends Length
//     ? InternalChunk<Tail, Length,[Head], [...Acc, Temp]>
//     : InternalChunk<Tail, Length,[...Temp, Head], Acc>
//   // If we still have items in temp, need to push it to Acc as well
//   : Temp["length"] extends 0
//     ? Acc
//     : [...Acc, Temp];
// ;

type Chunk<T extends unknown[], Length extends number, Acc extends unknown[] = []> =
  T extends [infer Head, ...infer Tail]
  ? Acc["length"] extends Length
    ? [Acc, ...Chunk<T, Length>]
    : Chunk<Tail, Length,[...Acc, Head]>
  // If we still have items in temp, need to push it to Acc as well
  : Acc["length"] extends 0
    ? Acc
    : [Acc];
;

type A = Chunk<[], 1>;
  // ^?
type B = Chunk<[1, 2, 3], 1>;
  // ^?
type C = Chunk<[1, 2, 3], 2>;
  // ^?
type D = Chunk<[1, 2, 3, 4], 2>;
  // ^?
type E = Chunk<[1, 2, 3, 4], 5>;
  // ^?
type F = Chunk<[1, true, 2, false], 2>;
  // ^?

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Chunk<[], 1>, []>>,
  Expect<Equal<Chunk<[1, 2, 3], 1>, [[1], [2], [3]]>>,
  Expect<Equal<Chunk<[1, 2, 3], 2>, [[1, 2], [3]]>>,
  Expect<Equal<Chunk<[1, 2, 3, 4], 2>, [[1, 2], [3, 4]]>>,
  Expect<Equal<Chunk<[1, 2, 3, 4], 5>, [[1, 2, 3, 4]]>>,
  Expect<Equal<Chunk<[1, true, 2, false], 2>, [[1, true], [2, false]]>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/4499/answer
  > View solutions: https://tsch.js.org/4499/solutions
  > More Challenges: https://tsch.js.org
*/
