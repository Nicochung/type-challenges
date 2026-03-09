/*
  30958 - Pascal's triangle
  -------
  by Aswin S Vijay (@aswinsvijay) #medium #array #math

  ### Question

  Given a number N, construct the Pascal's triangle with N rows.
  [Wikipedia](https://en.wikipedia.org/wiki/Pascal%27s_triangle)

  > View on GitHub: https://tsch.js.org/30958
*/

/* _____________ Your Code Here _____________ */


type Counter<T extends number, Count extends 1[] = []> = Count["length"] extends T
  ? Count
  : Counter<T, [...Count, 1]>;

type Addition<X extends number, Y extends number> = [
  ...Counter<X>,
  ...Counter<Y>
]["length"];

type ArrayAddition<A extends number[], B extends number[]> = [A, B] extends [
  [infer FirstA extends number, ...infer RestA extends number[]],
  [infer FirstB extends number, ...infer RestB extends number[]]
]
  ? [Addition<FirstA, FirstB>, ...ArrayAddition<RestA, RestB>]
  : [];

type Pascal<N extends number, Row extends number[] = [1]> = Row["length"] extends N
  ? [Row]
  : [Row, ...Pascal<N, ArrayAddition<[...Row, 0], [0, ...Row]>>];

// 帕斯卡三角第一行为 [1] ，之后每行的计算方式为将上一行本身与上一行右移一位的结果相加（空缺的项用0补上） ：

// // 第1行
// [1]

// // 计算第2行
// [0,1]
// [1,0]

// // 第2行
// [1,1]

// // 计算第3行
// [0,1,1]
// [1,1,0]

// // 第3行
// [1,2,1]

type A1 = Pascal<1>;
  // ^?
type A2 = Pascal<3>;
  // ^?
type A3 = Pascal<5>;
  // ^?
type A4 = Pascal<7>;
  // ^?

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<
    Equal<
      Pascal<1>,
      [
        [1],
      ]
    >
  >,
  Expect<
    Equal<
      Pascal<3>,
      [
        [1],
        [1, 1],
        [1, 2, 1],
      ]
    >
  >,
  Expect<
    Equal<
      Pascal<5>,
      [
        [1],
        [1, 1],
        [1, 2, 1],
        [1, 3, 3, 1],
        [1, 4, 6, 4, 1],
      ]
    >
  >,
  Expect<
    Equal<
      Pascal<7>,
      [
        [1],
        [1, 1],
        [1, 2, 1],
        [1, 3, 3, 1],
        [1, 4, 6, 4, 1],
        [1, 5, 10, 10, 5, 1],
        [1, 6, 15, 20, 15, 6, 1],
      ]
    >
  >,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/30958/answer
  > View solutions: https://tsch.js.org/30958/solutions
  > More Challenges: https://tsch.js.org
*/
