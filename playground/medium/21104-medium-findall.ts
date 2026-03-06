/*
  21104 - FindAll
  -------
  by tunamagur0 (@tunamagur0) #medium #template-literal #string

  ### Question

  Given a pattern string P and a text string T, implement the type `FindAll<T, P>` that returns an Array that contains all indices (0-indexed) from T where P matches.

  > View on GitHub: https://tsch.js.org/21104
*/

/* _____________ Your Code Here _____________ */

type FindAllHelper<T extends string, P extends string, Count extends 1 [] = []> = 
  T extends ""
  ? []
  : P extends ""
    ? []
    : T extends `${infer Head}${infer Tail}`
      ? T extends `${P}${string}`
        ? [Count["length"], ...FindAllHelper<Tail, P, [...Count, 1]>]
        : [...FindAllHelper<Tail, P, [...Count, 1]>]
      : []
;

type FindAll<T extends string, P extends string> = FindAllHelper<T, P>;

type A1 = FindAll<'Collection of TypeScript type challenges', 'Type'>;
  // ^?
type A2 = FindAll<'Collection of TypeScript type challenges', 'pe'>;
  // ^?
type A3 = FindAll<'Collection of TypeScript type challenges', ''>;
  // ^?
type A4 = FindAll<'', 'Type'>;
  // ^?
type A5 = FindAll<'', ''>;
  // ^?
type A6 = FindAll<'AAAA', 'A'>;
  // ^?
type A7 = FindAll<'AAAA', 'AA'>;
  // ^?

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<FindAll<'Collection of TypeScript type challenges', 'Type'>, [14]>>,
  Expect<Equal<FindAll<'Collection of TypeScript type challenges', 'pe'>, [16, 27]>>,
  Expect<Equal<FindAll<'Collection of TypeScript type challenges', ''>, []>>,
  Expect<Equal<FindAll<'', 'Type'>, []>>,
  Expect<Equal<FindAll<'', ''>, []>>,
  Expect<Equal<FindAll<'AAAA', 'A'>, [0, 1, 2, 3]>>,
  Expect<Equal<FindAll<'AAAA', 'AA'>, [0, 1, 2]>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/21104/answer
  > View solutions: https://tsch.js.org/21104/solutions
  > More Challenges: https://tsch.js.org
*/
