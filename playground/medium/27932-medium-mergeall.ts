/*
  27932 - MergeAll
  -------
  by scarf (@scarf005) #medium #object #array #union

  ### Question

  Merge variadic number of types into a new type. If the keys overlap, its values should be merged into an union.

  For example:

  ```ts
  type Foo = { a: 1; b: 2 }
  type Bar = { a: 2 }
  type Baz = { c: 3 }

  type Result = MergeAll<[Foo, Bar, Baz]> // expected to be { a: 1 | 2; b: 2; c: 3 }
  ```

  > View on GitHub: https://tsch.js.org/27932
*/

/* _____________ Your Code Here _____________ */
type Pretty<T> = {
  [P in keyof T]: T[P];
}

type MergeAll<XS extends Record<string, unknown>[], Acc extends Record<string, unknown> = {}> =
  XS extends [infer Head, ...infer Tail extends Record<string, unknown>[]]
  ? MergeAll<Tail, Pretty<
                    // Intersection
                    { [P in Extract<keyof Head, keyof Acc>]: Head[P] | Acc[P] }
                  & { [P in Exclude<keyof Head, keyof Acc>]: Head[P]  }
                  & { [P in Exclude<keyof Acc, keyof Head>]: Acc[P] }>
              >
  : Acc
;

type A1 = MergeAll<[]>;
  // ^?
type A2 = MergeAll<[{a: 1}]>;
  // ^?
type A3 = MergeAll<[{ a: string }, { a: string }]>;
  // ^?
type A4 = MergeAll<[{ }, { a: string }]>;
  // ^?
type A5 = MergeAll<[{ a: 1 }, { c: 2 }]>;
  // ^?
type A6 = MergeAll<[{ a: 1, b: 2 }, { a: 2 }, { c: 3 }]>;
  // ^?
type A7 = MergeAll<[{ a: 1 }, { a: number }]>;
  // ^?
type A8 = MergeAll<[{ a: number }, { a: 1 }]>;
  // ^?
type A9 = MergeAll<[{ a: 1 | 2 }, { a: 1 | 3 }]>;
  // ^?

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<MergeAll<[]>, {} >>,
  Expect<Equal<MergeAll<[{ a: 1 }]>, { a: 1 }>>,
  Expect<Equal<
    MergeAll<[{ a: string }, { a: string }]>,
    { a: string }
>
  >,
  Expect<Equal<
    MergeAll<[{ }, { a: string }]>,
    { a: string }
>
  >,
  Expect<Equal<
    MergeAll<[{ a: 1 }, { c: 2 }]>,
    { a: 1, c: 2 }
>
  >,
  Expect<Equal<
    MergeAll<[{ a: 1, b: 2 }, { a: 2 }, { c: 3 }]>,
    { a: 1 | 2, b: 2, c: 3 }
>
  >,
  Expect<Equal<MergeAll<[{ a: 1 }, { a: number }]>, { a: number }>>,
  Expect<Equal<MergeAll<[{ a: number }, { a: 1 }]>, { a: number }>>,
  Expect<Equal<MergeAll<[{ a: 1 | 2 }, { a: 1 | 3 }]>, { a: 1 | 2 | 3 }>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/27932/answer
  > View solutions: https://tsch.js.org/27932/solutions
  > More Challenges: https://tsch.js.org
*/
