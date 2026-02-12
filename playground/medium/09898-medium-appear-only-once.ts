/*
  9898 - Appear only once
  -------
  by X.Q. Chen (@brenner8023) #medium

  ### Question

  Find the elements in the target array that appear only once. For example：input: `[1,2,2,3,3,4,5,6,6,6]`，output: `[1,4,5]`.

  > View on GitHub: https://tsch.js.org/9898
*/

/* _____________ Your Code Here _____________ */

type IsSame<A, B> = 
  [A] extends [B]
  ? [B] extends [A]
    ? true
    : false
  : false
;

type CountElement<T extends unknown[], Ele = unknown, Count extends 1[] = []> =
  T extends [infer Head, ...infer Tail]
  ? CountElement<Tail, Ele, IsSame<Head, Ele> extends true ? [...Count, 1]: Count>
  : Count["length"]
;

type A1 = CountElement<[1, 2, 2, 3, 3, 4, 5, 6, 6, 6], 2>;
  // ^?
type E1 = CountElement<[1, 2, number, number], number>;
  // ^?

type FindEles<T extends any[], Original extends any[] = T> = 
  T extends [infer Head, ...infer Tail]
  ? CountElement<Original, Head> extends 1 ? [Head, ...FindEles<Tail, Original>] : FindEles<Tail, Original>
  : []
;

type A = FindEles<[1, 2, 2, 3, 3, 4, 5, 6, 6, 6]>;
  // ^?
type B = FindEles<[2, 2, 3, 3, 6, 6, 6]>;
  // ^?
type C = FindEles<[1, 2, 3]>;
  // ^?
type D = FindEles<[1, 2, number]>;
  // ^?
type E = FindEles<[1, 2, number, number]>;
  // ^?
/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<FindEles<[1, 2, 2, 3, 3, 4, 5, 6, 6, 6]>, [1, 4, 5]>>,
  Expect<Equal<FindEles<[2, 2, 3, 3, 6, 6, 6]>, []>>,
  Expect<Equal<FindEles<[1, 2, 3]>, [1, 2, 3]>>,
  Expect<Equal<FindEles<[1, 2, number]>, [1, 2, number]>>,
  Expect<Equal<FindEles<[1, 2, number, number]>, [1, 2]>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/9898/answer
  > View solutions: https://tsch.js.org/9898/solutions
  > More Challenges: https://tsch.js.org
*/
