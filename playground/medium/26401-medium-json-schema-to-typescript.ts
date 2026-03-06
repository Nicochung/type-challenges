/*
  26401 - JSON Schema to TypeScript
  -------
  by null (@aswinsvijay) #medium #JSON

  ### Question

  Implement the generic type JSONSchema2TS which will return the TypeScript type corresponding to the given JSON schema.

  Additional challenges to handle:
  * additionalProperties
  * oneOf, anyOf, allOf
  * minLength and maxLength

  > View on GitHub: https://tsch.js.org/26401
*/

/* _____________ Your Code Here _____________ */

type PrimitiveType = { type: 'string' } | { type: 'number' } | { type: 'boolean' }
type EnumType = { type: 'string', enum: string[] } | { type: 'number', enum: number[] }
type ObjectType = { type: 'object', properties?: Record<string, PossibleType>, required?: string[] }
type ArrayType = { type: 'array', items?: PossibleType }

type PossibleType = PrimitiveType | EnumType | ObjectType | ArrayType

// Primitive
type PrimitiveJSONSchema2TS<T extends PrimitiveType> = {
  'number': number
  'string': string
  'boolean': boolean
}[T['type']]

// Enum
type EnumJSONSchema2TS<T extends EnumType> = T['enum'][number]

// Object
type Pretty<T> = {
  [P in keyof T]: T[P];
}

type ObjectJSONSchema2TS<T extends ObjectType> =
  T['properties'] extends Object
    ? T['required'] extends string[]
      ? Pretty<
        { [K in keyof T['properties'] as Extract<K, T['required'][number]>]: JSONSchema2TS<T['properties'][K]> }
        & { [K in keyof T['properties'] as Exclude<K, T['required'][number]>]?: JSONSchema2TS<T['properties'][K]> }
>
      : { [K in keyof T['properties']]?: JSONSchema2TS<T['properties'][K]> }
    : Record<string, unknown>

// Array
type ArrayJSONSchema2TS<T extends ArrayType> =
  T['items'] extends PossibleType
    ? JSONSchema2TS<T['items']>[]
    : unknown[]

type JSONSchema2TS<T extends PossibleType> =
  T extends ArrayType
    ? ArrayJSONSchema2TS<T>
    : T extends ObjectType
      ? ObjectJSONSchema2TS<T>
      : T extends EnumType
        ? EnumJSONSchema2TS<T>
        : T extends PrimitiveType
          ? PrimitiveJSONSchema2TS<T>
          : never

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

// + Primitive types
type Type1 = JSONSchema2TS<{
  type: 'string'
}>
type Expected1 = string
type Result1 = Expect<Equal<Type1, Expected1>>

type Type2 = JSONSchema2TS<{
  type: 'number'
}>
type Expected2 = number
type Result2 = Expect<Equal<Type2, Expected2>>

type Type3 = JSONSchema2TS<{
  type: 'boolean'
}>
type Expected3 = boolean
type Result3 = Expect<Equal<Type3, Expected3>>
// - Primitive types

// + Enums
type Type4 = JSONSchema2TS<{
  type: 'string'
  enum: ['a', 'b', 'c']
}>
type Expected4 = 'a' | 'b' | 'c'
type Result4 = Expect<Equal<Type4, Expected4>>

type Type5 = JSONSchema2TS<{
  type: 'number'
  enum: [1, 2, 3]
}>
type Expected5 = 1 | 2 | 3
type Result5 = Expect<Equal<Type5, Expected5>>
// - Enums

// + Object types
type Type6 = JSONSchema2TS<{
  type: 'object'
}>
type Expected6 = Record<string, unknown>
type Result6 = Expect<Equal<Type6, Expected6>>

type Type7 = JSONSchema2TS<{
  type: 'object'
  properties: {}
}>
type Expected7 = {}
type Result7 = Expect<Equal<Type7, Expected7>>

type Type8 = JSONSchema2TS<{
  type: 'object'
  properties: {
    a: {
      type: 'string'
    }
  }
}>
type Expected8 = {
  a?: string
}
type Result8 = Expect<Equal<Type8, Expected8>>
// - Object types

// + Arrays
type Type9 = JSONSchema2TS<{
  type: 'array'
}>
type Expected9 = unknown[]
type Result9 = Expect<Equal<Type9, Expected9>>

type Type10 = JSONSchema2TS<{
  type: 'array'
  items: {
    type: 'string'
  }
}>
type Expected10 = string[]
type Result10 = Expect<Equal<Type10, Expected10>>

type Type11 = JSONSchema2TS<{
  type: 'array'
  items: {
    type: 'object'
  }
}>
type Expected11 = Record<string, unknown>[]
type Result11 = Expect<Equal<Type11, Expected11>>
// - Arrays

// + Mixed types
type Type12 = JSONSchema2TS<{
  type: 'object'
  properties: {
    a: {
      type: 'string'
      enum: ['a', 'b', 'c']
    }
    b: {
      type: 'number'
    }
  }
}>
type Expected12 = {
  a?: 'a' | 'b' | 'c'
  b?: number
}
type Result12 = Expect<Equal<Type12, Expected12>>

type Type13 = JSONSchema2TS<{
  type: 'array'
  items: {
    type: 'object'
    properties: {
      a: {
        type: 'string'
      }
    }
  }
}>
type Expected13 = {
  a?: string
}[]
type Result13 = Expect<Equal<Type13, Expected13>>
// - Mixed types

// + Required fields
type Type14 = JSONSchema2TS<{
  type: 'object'
  properties: {
    req1: { type: 'string' }
    req2: {
      type: 'object'
      properties: {
        a: {
          type: 'number'
        }
      }
      required: ['a']
    }
    add1: { type: 'string' }
    add2: {
      type: 'array'
      items: {
        type: 'number'
      }
    }
  }
  required: ['req1', 'req2']
}>
type Expected14 = {
  req1: string
  req2: { a: number }
  add1?: string
  add2?: number[]
}
type Result14 = Expect<Equal<Type14, Expected14>>
// - Required fields

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/26401/answer
  > View solutions: https://tsch.js.org/26401/solutions
  > More Challenges: https://tsch.js.org
*/
