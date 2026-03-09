/*
  30430 - Tower of hanoi
  -------
  by null (@aswinsvijay) #medium #array

  ### Question

  Simulate the solution for the Tower of Hanoi puzzle. Your type should take the number of rings as input an return an array of steps to move the rings from tower A to tower B using tower C as additional. Each entry in the array should be a pair of strings `[From, To]` which denotes ring being moved `From -> To`.

  [Wikipedia](https://en.wikipedia.org/wiki/Tower_of_Hanoi)
  [GeeksForGeeks](https://www.geeksforgeeks.org/c-program-for-tower-of-hanoi)

  > View on GitHub: https://tsch.js.org/30430
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

// type B1 = MinusOne<5>;
//     // ^?

// type HanoiHelper<N extends number, From = 'A', To = 'B', Intermediate = 'C', Acc = []> = 
//   N extends 0
//   ? Acc
//   : N extends 1
//     ? HanoiHelper<0, From, Intermediate, To, [From, To]>
//     : [HanoiHelper<MinusOne<N>, From, Intermediate, To, [...Acc, [From, Intermediate]]>, HanoiHelper<0, From, Intermediate, To, [From, To]> ,HanoiHelper<MinusOne<N>, Intermediate, To, From>]

// type Hanoi<N extends number, From = 'A', To = 'B', Intermediate = 'C'> = HanoiHelper<N, From, To, Intermediate>;

type Hanoi<N extends number, From extends string = 'A', To extends string = 'B', Intermediate extends string = 'C', Count extends 1[] = []> = 
  Count['length'] extends N 
  ? [] 
  : [...Hanoi<N, From, Intermediate, To, [...Count, 1]>, 
     [From, To], 
     ...Hanoi<N, Intermediate, To, From, [...Count, 1]>
    ]
;

type A1 = Hanoi<0>;
  // ^?
type A2 = Hanoi<1>;
  // ^?
type A3 = Hanoi<2>;
  // ^?
type A4 = Hanoi<3>;
  // ^?
type A5 = Hanoi<5>;
  // ^?


/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type Tests = [
  Expect<Equal<Hanoi<0>, []>>,
  Expect<Equal<Hanoi<1>, [['A', 'B']]>>,
  Expect<Equal<Hanoi<2>, [['A', 'C'], ['A', 'B'], ['C', 'B']]>>,
  Expect<Equal<Hanoi<3>, [['A', 'B'], ['A', 'C'], ['B', 'C'], ['A', 'B'], ['C', 'A'], ['C', 'B'], ['A', 'B']]>>,
  Expect<Equal<Hanoi<5>, [['A', 'B'], ['A', 'C'], ['B', 'C'], ['A', 'B'], ['C', 'A'], ['C', 'B'], ['A', 'B'], ['A', 'C'], ['B', 'C'], ['B', 'A'], ['C', 'A'], ['B', 'C'], ['A', 'B'], ['A', 'C'], ['B', 'C'], ['A', 'B'], ['C', 'A'], ['C', 'B'], ['A', 'B'], ['C', 'A'], ['B', 'C'], ['B', 'A'], ['C', 'A'], ['C', 'B'], ['A', 'B'], ['A', 'C'], ['B', 'C'], ['A', 'B'], ['C', 'A'], ['C', 'B'], ['A', 'B']]>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/30430/answer
  > View solutions: https://tsch.js.org/30430/solutions
  > More Challenges: https://tsch.js.org
*/
