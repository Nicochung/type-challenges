/*
  5317 - LastIndexOf
  -------
  by jiangshan (@jiangshanmeta) #medium #array

  ### Question

  Implement the type version of ```Array.lastIndexOf```, ```LastIndexOf<T, U>```  takes an Array ```T```, any ```U``` and returns the index of the last ```U``` in Array ```T```

  For example:

  ```typescript
  type Res1 = LastIndexOf<[1, 2, 3, 2, 1], 2> // 3
  type Res2 = LastIndexOf<[0, 0, 0], 2> // -1
  ```

  > View on GitHub: https://tsch.js.org/5317
*/

/* _____________ Your Code Here _____________ */

type IsSame<A,B> =
  A extends B
  ? B extends A
    ? true
    : false
  : false
;

// type LastIndexOf<T extends unknown[], U, lastIndex extends number = -1, Count extends 1[] = []> =
//   T["length"] extends Count["length"]
//   ? lastIndex
//   : IsSame<T[Count["length"]], U> extends true
//     ? LastIndexOf<T, U, Count["length"], [...Count, 1]>
//     : LastIndexOf<T, U, lastIndex, [...Count, 1]>
;
type LastIndexOf<T extends unknown[], U> =
  T extends [...infer Head, infer Tail]
  ? IsSame<Tail, U> extends true
    ? Head["length"]
    : LastIndexOf<Head, U>
  : -1
;


type A = LastIndexOf<[1, 2, 3, 2, 1], 2>;
  // ^?
type B = LastIndexOf<[2, 6, 3, 8, 4, 1, 7, 3, 9], 3>;
  // ^?
type C = LastIndexOf<[0, 0, 0], 2>;
  // ^?
type D = LastIndexOf<[string, 2, number, 'a', number, 1], number>;
  // ^?
type E = LastIndexOf<[string, any, 1, number, 'a', any, 1], any>;
  // ^?

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<LastIndexOf<[1, 2, 3, 2, 1], 2>, 3>>,
  Expect<Equal<LastIndexOf<[2, 6, 3, 8, 4, 1, 7, 3, 9], 3>, 7>>,
  Expect<Equal<LastIndexOf<[0, 0, 0], 2>, -1>>,
  Expect<Equal<LastIndexOf<[string, 2, number, 'a', number, 1], number>, 4>>,
  Expect<Equal<LastIndexOf<[string, any, 1, number, 'a', any, 1], any>, 5>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/5317/answer
  > View solutions: https://tsch.js.org/5317/solutions
  > More Challenges: https://tsch.js.org
*/
