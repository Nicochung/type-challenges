/*
  9989 - Count Element Number To Object
  -------
  by 凤之兮原 (@kongmingLatern) #medium

  ### Question

  With type ``CountElementNumberToObject``, get the number of occurrences of every item from an array and return them in an object. For example:

  ~~~ts
  type Simple1 = CountElementNumberToObject<[]> // return {}
  type Simple2 = CountElementNumberToObject<[1,2,3,4,5]>
  // return {
  //   1: 1,
  //   2: 1,
  //   3: 1,
  //   4: 1,
  //   5: 1
  // }

  type Simple3 = CountElementNumberToObject<[1,2,3,4,5,[1,2,3]]>
  // return {
  //   1: 2,
  //   2: 2,
  //   3: 2,
  //   4: 1,
  //   5: 1
  // }
  ~~~

  > View on GitHub: https://tsch.js.org/9989
*/

/* _____________ Your Code Here _____________ */

// type IsSame<A, B> =
//   [A] extends [B]
//   ? [B] extends [A]
//     ? true
//     : false
//   : false
// ;

// type CountElement<T extends unknown[], Ele = unknown, Count extends 1[] = []> =
//   T extends [infer Head, ...infer Tail]
//   ? CountElement<Tail, Ele, IsSame<Head, Ele> extends true ? [...Count, 1]: Count>
//   : Count["length"]
// ;

// type Flatten<T extends unknown[]> =
//   T extends [infer Head, ...infer Tail]
//   ? Head extends unknown[]
//     ? [...Flatten<Head>, ...Flatten<Tail>]
//     : [Head, ...Flatten<Tail>]
//   : []
// ;

// type Helper<T extends unknown[], Original extends unknown[] = T, Acc = {}> =
//   T extends [infer Head extends PropertyKey, ...infer Tail]
//   ? Acc & {[P in Head]: CountElement<Original, P>} & Helper<Tail, Original>
//   : Acc
// ;

// type Pretty<T> = {
//   [P in keyof T]: T[P];
// }

// type CountElementNumberToObject<T extends unknown[], Temp = Helper<Flatten<T>>> = [Temp] extends [never] ? {} : Pretty<Temp>;

type IsSame<A, B> =
  [A] extends [B]
    ? [B] extends [A]
        ? true
        : false
    : false

type CountElement<T extends unknown[], Ele = unknown, Count extends 1[] = []> =
  T extends [infer Head, ...infer Tail]
    ? CountElement<Tail, Ele, IsSame<Head, Ele> extends true ? [...Count, 1] : Count>
    : Count['length']

type Flatten<T extends unknown[]> =
  T extends [infer Head, ...infer Tail]
    ? Head extends unknown[]
      ? [...Flatten<Head>, ...Flatten<Tail>]
      : [Head, ...Flatten<Tail>]
    : []

type Helper<T extends unknown[], Union = T[number]> = {
  [P in Union as P extends PropertyKey ? P : never]: CountElement<T, P>;
}

type CountElementNumberToObject<T extends unknown[]> = Helper<Flatten<T>>;

type A = CountElementNumberToObject<[1, 2, 3, 4, 5]>
  // ^?
type B = CountElementNumberToObject<[1, 2, 3, 4, 5, [1, 2, 3]]>
  // ^?
type C = CountElementNumberToObject<[1, 2, 3, 4, 5, [1, 2, 3, [4, 4, 1, 2]]]>
  // ^?
type D = CountElementNumberToObject<[never]>
  // ^?
type E = CountElementNumberToObject<['1', '2', '0']>
  // ^?
type F = CountElementNumberToObject<['a', 'b', ['c', ['d']]]>
  // ^?

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<CountElementNumberToObject<[1, 2, 3, 4, 5]>, {
    1: 1
    2: 1
    3: 1
    4: 1
    5: 1
  } >>,
  Expect<Equal<CountElementNumberToObject<[1, 2, 3, 4, 5, [1, 2, 3]]>, {
    1: 2
    2: 2
    3: 2
    4: 1
    5: 1
  }>>,
  Expect<Equal<CountElementNumberToObject<[1, 2, 3, 4, 5, [1, 2, 3, [4, 4, 1, 2]]]>, {
    1: 3
    2: 3
    3: 2
    4: 3
    5: 1
  }>>,
  Expect<Equal<CountElementNumberToObject<[never]>, {}>>,
  Expect<Equal<CountElementNumberToObject<['1', '2', '0']>, {
    0: 1
    1: 1
    2: 1
  }>>,
  Expect<Equal<CountElementNumberToObject<['a', 'b', ['c', ['d']]]>, {
    'a': 1
    'b': 1
    'c': 1
    'd': 1
  }>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/9989/answer
  > View solutions: https://tsch.js.org/9989/solutions
  > More Challenges: https://tsch.js.org
*/
