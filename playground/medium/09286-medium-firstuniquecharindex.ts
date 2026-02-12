/*
  9286 - FirstUniqueCharIndex
  -------
  by jiangshan (@jiangshanmeta) #medium #string

  ### Question

  Given a string s, find the first non-repeating character in it and return its index. If it does not exist, return -1. (Inspired by [leetcode 387](https://leetcode.com/problems/first-unique-character-in-a-string/))

  > View on GitHub: https://tsch.js.org/9286
*/

/* _____________ Your Code Here _____________ */

type StringToArray<T extends string> =
  T extends `${infer Head}${infer Tail}`
  ? [Head, ...StringToArray<Tail>]
  : []
;

type A1 = StringToArray<'leetcode'>;
  // ^?
type B1 = StringToArray<'loveleetcode'>;
  // ^?
type C1 = StringToArray<''>;
  // ^?

type FirstUniqueArrayIndex<T extends string[], Acc = "", Idx = -1, By = ""> = 
  T extends [...infer Head extends string [], infer Tail]
  ? FirstUniqueArrayIndex<Head, Tail | Acc, Tail extends Acc 
                                            ? Tail extends By
                                              ? -1
                                              : Idx
                                            : Head["length"], Tail extends Acc ? By : Tail>
  : Idx
;

// Start from tail and work backwards to find first unique Char
type FirstUniqueCharIndex<T extends string> = FirstUniqueArrayIndex<StringToArray<T>>;

type A = FirstUniqueCharIndex<'leetcode'>;
  // ^?
type B = FirstUniqueCharIndex<'loveleetcode'>;
  // ^?
type C = FirstUniqueCharIndex<'aabb'>;
  // ^?
type D = FirstUniqueCharIndex<''>;
  // ^?
type E = FirstUniqueCharIndex<'aaa'>;
  // ^?

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<FirstUniqueCharIndex<'leetcode'>, 0>>,
  Expect<Equal<FirstUniqueCharIndex<'loveleetcode'>, 2>>,
  Expect<Equal<FirstUniqueCharIndex<'aabb'>, -1>>,
  Expect<Equal<FirstUniqueCharIndex<''>, -1>>,
  Expect<Equal<FirstUniqueCharIndex<'aaa'>, -1>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/9286/answer
  > View solutions: https://tsch.js.org/9286/solutions
  > More Challenges: https://tsch.js.org
*/
