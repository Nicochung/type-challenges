/*
  4260 - AllCombinations
  -------
  by 蛭子屋双六 (@sugoroku-y) #medium #template-literal #infer #union

  ### Question

  Implement type ```AllCombinations<S>``` that return all combinations of strings which use characters from ```S``` at most once.

  For example:

  ```ts
  type AllCombinations_ABC = AllCombinations<'ABC'>;
  // should be '' | 'A' | 'B' | 'C' | 'AB' | 'AC' | 'BA' | 'BC' | 'CA' | 'CB' | 'ABC' | 'ACB' | 'BAC' | 'BCA' | 'CAB' | 'CBA'
  ```

  > View on GitHub: https://tsch.js.org/4260
*/

/* _____________ Your Code Here _____________ */

type StringToUnion<T extends string> =
  T extends `${infer Head}${infer Tail}`
    ? Head | StringToUnion<Tail>
    : never
;

type Replace<S extends string, From extends string, To extends string> =
  S extends `${infer Head}${From}${infer Tail}`
  ? `${Head}${To}${Tail}`
  : S
;

// type AllCombinations<S extends string, Acc extends string = "", K extends string = StringToUnion<S>> =
//   [K] extends [never]
//   ? Acc
//   : K extends K
//     ? Acc | AllCombinations<Replace<S, K, "">,`${K}${Acc}`>
//     : never
// ;

type AllCombinations<S extends string, Acc extends string = ""> =
  S extends `${infer Head}${infer Tail}`
  ? `${Head}${AllCombinations<`${Acc}${Tail}`>}` | AllCombinations<Tail, `${Acc}${Head}`>
  : ""
;

// type AllCombinations<S extends string, Acc extends string = StringToUnion<S>> =
//   [Acc] extends [never]
//   ? ""
//   : "" | {
//     [K in Acc]: `${K}${AllCombinations<never,Exclude<Acc, K>>}`
//   }[Acc]
// ;

type A = AllCombinations<"">;
  // ^?
type B = AllCombinations<"A">;
  // ^?
type C = AllCombinations<"AB">;
  // ^?
type D = AllCombinations<"ABC">;
  // ^?
type E = AllCombinations<"ABCD">;
  // ^?

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<AllCombinations<''>, ''>>,
  Expect<Equal<AllCombinations<'A'>, '' | 'A'>>,
  Expect<Equal<AllCombinations<'AB'>, '' | 'A' | 'B' | 'AB' | 'BA'>>,
  Expect<Equal<AllCombinations<'ABC'>, '' | 'A' | 'B' | 'C' | 'AB' | 'AC' | 'BA' | 'BC' | 'CA' | 'CB' | 'ABC' | 'ACB' | 'BAC' | 'BCA' | 'CAB' | 'CBA'>>,
  Expect<Equal<AllCombinations<'ABCD'>, '' | 'A' | 'B' | 'C' | 'D' | 'AB' | 'AC' | 'AD' | 'BA' | 'BC' | 'BD' | 'CA' | 'CB' | 'CD' | 'DA' | 'DB' | 'DC' | 'ABC' | 'ABD' | 'ACB' | 'ACD' | 'ADB' | 'ADC' | 'BAC' | 'BAD' | 'BCA' | 'BCD' | 'BDA' | 'BDC' | 'CAB' | 'CAD' | 'CBA' | 'CBD' | 'CDA' | 'CDB' | 'DAB' | 'DAC' | 'DBA' | 'DBC' | 'DCA' | 'DCB' | 'ABCD' | 'ABDC' | 'ACBD' | 'ACDB' | 'ADBC' | 'ADCB' | 'BACD' | 'BADC' | 'BCAD' | 'BCDA' | 'BDAC' | 'BDCA' | 'CABD' | 'CADB' | 'CBAD' | 'CBDA' | 'CDAB' | 'CDBA' | 'DABC' | 'DACB' | 'DBAC' | 'DBCA' | 'DCAB' | 'DCBA'>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/4260/answer
  > View solutions: https://tsch.js.org/4260/solutions
  > More Challenges: https://tsch.js.org
*/
