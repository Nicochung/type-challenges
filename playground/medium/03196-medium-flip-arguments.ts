/*
  3196 - Flip Arguments
  -------
  by jiangshan (@jiangshanmeta) #medium #arguments

  ### Question

  Implement the type version of lodash's ```_.flip```.

  Type ```FlipArguments<T>``` requires function type ```T``` and returns a new function type which has the same return type of T but reversed parameters.

  For example:

  ```typescript
  type Flipped = FlipArguments<(arg0: string, arg1: number, arg2: boolean) => void>
  // (arg0: boolean, arg1: number, arg2: string) => void
  ```

  > View on GitHub: https://tsch.js.org/3196
*/

/* _____________ Your Code Here _____________ */

type Reverse<T extends unknown[]> =
  T extends [infer Head, ...infer Tail]
  ? [...Reverse<Tail>, Head]
  : T
;

// type FlipArguments<T extends (...args: any[]) => unknown> =
//   T extends (...args: infer Args) => infer R
//   ? (...args: Reverse<Args>) => R
//   : never
// ;

type FlipArguments<T extends (...args: any[]) => unknown> =
  (...args: Reverse<Parameters<T>>) => ReturnType<T>
;

type A = FlipArguments<() => boolean>;
    //^?
type B = FlipArguments<(foo: string) => number>;
    //^?
type C = FlipArguments<(arg0: string, arg1: number, arg2: boolean) => void>;
    //^?

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<FlipArguments<() => boolean>, () => boolean>>,
  Expect<Equal<FlipArguments<(foo: string) => number>, (foo: string) => number>>,
  Expect<Equal<FlipArguments<(arg0: string, arg1: number, arg2: boolean) => void>, (arg0: boolean, arg1: number, arg2: string) => void>>,
]

type errors = [
  // @ts-expect-error
  FlipArguments<'string'>,
  // @ts-expect-error
  FlipArguments<{ key: 'value' }>,
  // @ts-expect-error
  FlipArguments<['apple', 'banana', 100, { a: 1 }]>,
  // @ts-expect-error
  FlipArguments<null | undefined>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/3196/answer
  > View solutions: https://tsch.js.org/3196/solutions
  > More Challenges: https://tsch.js.org
*/
