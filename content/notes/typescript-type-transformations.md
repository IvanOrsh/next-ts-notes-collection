---
title: "TypeScript: Type Transformations"
description: "These notes are covering such topics as: type inference, union and indexing, template literal, type helper patterns, conditional types and key mapping."
author: Ivan O
authorImage: https://images.unsplash.com/photo-1509396591411-549811e332fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80
coverImage: https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80
date: "2023-01-15"
---

- [1. Inference Basics](#1-inference-basics)
  - [1.1 `typeof`, `ReturnType` (get function return type)](#11-typeof-returntype-get-function-return-type)
  - [1.2 `Parameters` (get function parameters)](#12-parameters-get-function-parameters)
  - [1.3 `Awaited`](#13-awaited)
  - [1.4 `keyof` (get object keys)](#14-keyof-get-object-keys)
- [2. Union and Indexing](#2-union-and-indexing)
  - [2.1 Terminology: union, discriminated union, enum](#21-terminology-union-discriminated-union-enum)
  - [2.2 `Extract` from union, discriminated union](#22-extract-from-union-discriminated-union)
  - [2.3 `Exclude` from union, discriminated union (reverse of `Extract`)](#23-exclude-from-union-discriminated-union-reverse-of-extract)
  - [2.4 Union type in JS](#24-union-type-in-js)
  - [2.5 Indexed access](#25-indexed-access)
  - [2.6 Discriminated union to discriminator](#26-discriminated-union-to-discriminator)
  - [2.7 `as const`](#27-as-const)
  - [2.8 Exercise: indexed access with unions](#28-exercise-indexed-access-with-unions)
  - [2.9 Exercise: get object values](#29-exercise-get-object-values)
  - [2.10 Exercise: get array value](#210-exercise-get-array-value)
- [3. Template Literals](#3-template-literals)
  - [3.1 Template literals with strings](#31-template-literals-with-strings)
  - [3.2 `Extract` with template literals](#32-extract-with-template-literals)
  - [3.3 Unions in template literals](#33-unions-in-template-literals)
  - [3.4 (madness) Splitting string literals (using ts-toolbelt)](#34-madness-splitting-string-literals-using-ts-toolbelt)
  - [3.5 Template literals in object keys (and `Record`)](#35-template-literals-in-object-keys-and-record)
  - [3.6 Transforming string literal types](#36-transforming-string-literal-types)
- [4. Type Helpers Pattern](#4-type-helpers-pattern)
  - [4.1 Type helpers example (?) - return what i pass in](#41-type-helpers-example----return-what-i-pass-in)
  - [4.2 Maybe](#42-maybe)
  - [4.3 Constraints](#43-constraints)
  - [4.4 Multiple](#44-multiple)
  - [4.5 Defaults](#45-defaults)
  - [4.6 Function constraints](#46-function-constraints)
  - [4.7 Not undefined or null constraint](#47-not-undefined-or-null-constraint)
  - [4.8 Not empty array (this one)](#48-not-empty-array-this-one)
- [5. Conditional Types and `infer`](#5-conditional-types-and-infer)
  - [5.1 Conditional Types](#51-conditional-types)
  - [5.2 Returning `never`](#52-returning-never)
  - [5.3 `infer` with raw values](#53-infer-with-raw-values)
  - [5.4 `infer` with generics](#54-infer-with-generics)
  - [5.5 Template literal value extraction](#55-template-literal-value-extraction)
  - [5.6 Get result from async function (this one is particularly useful)](#56-get-result-from-async-function-this-one-is-particularly-useful)
  - [5.7 `infer` in union types](#57-infer-in-union-types)
  - [5.8 Distributive conditional types](#58-distributive-conditional-types)
- [6. Key Mapping](#6-key-mapping)
  - [6.1 Key mapping and union to object](#61-key-mapping-and-union-to-object)
  - [6.2 `K in keyof`](#62-k-in-keyof)
  - [6.3 `K in keyof as`](#63-k-in-keyof-as)
  - [6.4 `never` in key remapping](#64-never-in-key-remapping)
  - [6.5 Discriminated union to object (this one!)](#65-discriminated-union-to-object-this-one)
  - [6.6 Object to union of tuples](#66-object-to-union-of-tuples)
  - [6.7 Object to union of template literals](#67-object-to-union-of-template-literals)
  - [6.8 Discriminated union to union](#68-discriminated-union-to-union)
- [7. Challenges](#7-challenges)
  - [7.1 Get dynamic path params (madness)](#71-get-dynamic-path-params-madness)
  - [7.2 Mutually exclusive properties](#72-mutually-exclusive-properties)
  - [7.3 Discriminated union with unique values](#73-discriminated-union-with-unique-values)
  - [7.4 Deep partial (monstrosity)](#74-deep-partial-monstrosity)

# 1. Inference Basics

## 1.1 `typeof`, `ReturnType` (get function return type)

**`typeof`**:

- In TypeScript, the `typeof` keyword is a type operator that allows you to obtain the type of a value or a variable at compile time.
- The `typeof` operator returns a string literal type that represents the type of the given value.
- The `typeof` operator can also be used to obtain the type of a value at runtime. For example, if you have a function that takes an argument of type any, you can use the typeof operator to check the type of the argument at runtime
- It's worth noting that the `typeof` operator **only works with values that have a runtime representation, such as variables and function arguments**. It cannot be used with types or type expressions, as they do not have a runtime representation.

<br>

**`ReturnType`**:

- The `ReturnType` type in TypeScript is a utility type that allows you to extract the return type of a function type.
- This can be useful in situations where **you want to use the return type of a function in another part of your code, without having to explicitly write out the return type again**.

```ts
const myFunc = () => "hello";

type MyFuncReturn = ReturnType<typeof myFunc>;
```

- Using `ReturnType` can help make your code more maintainable by reducing the duplication of type information. If you ever change the return type of the greet function, you won't have to update the type of the greeting variable manually, as it will be inferred automatically using the ReturnType utility type.

## 1.2 `Parameters` (get function parameters)

- In TypeScript, the `Parameters` type is a utility type that **allows you to obtain the parameter types of a function type as a tuple type**.
- The `Parameters` type takes a function type as its argument and returns a tuple type that represents the types of the parameters of the function.

```ts
const makeQuery = (
  url: string,
  opts?: {
    method?: string;
    headers?: {
      [key: string]: string;
    };
    body?: string;
  }
) => {};

type MakeQueryParameters = Parameters<typeof makeQuery>;
type MakeQueryParametersSecondArgument = MakeQueryParameters[1];
```

- The Parameters type can be useful in situations where you need to manipulate the parameter types of a function dynamically, or when you want to create a new function type based on the parameter types of an existing function type.

- It's worth noting that the Parameters type only works with function types and not with regular function values. If you want to obtain the parameter types of a regular function value, you can first obtain the function type using the `typeof` operator and then apply the Parameters type to the function type.

## 1.3 `Awaited`

- In TypeScript, the `Awaited` utility type is a built-in utility type that **allows you to obtain the return type of a promise after it has been resolved**. (helps us to unwrap a promise)
- The `Awaited` type takes a promise type as its argument and returns the type of the resolved value of the promise.

```ts
const getUser = () => {
  return Promise.resolve({
    id: "123",
    name: "John",
    email: "john@example.com",
  });
};

type ReturnValue = Awaited<ReturnType<typeof getUser>>;
```

```ts
// above same as below:

type GetUserPromise = ReturnType<typeof getUser>;
type ReturnValue = Awaited<GetUserPromise>;
```

- The `Awaited` utility type can be **useful in situations where you want to handle the resolved value of a promise in a type-safe manner**.

- It's worth noting that the `Awaited` utility type only works with promise types and not with regular function types or values. If you want to obtain the return type of a regular function or value, you can use the ReturnType utility type.

## 1.4 `keyof` (get object keys)

- In TypeScript, the `keyof` keyword is a type operator that **allows you to obtain a union type of the keys of a given object type**.
- The `keyof` operator returns a union type of string literal types that represent the keys of the object type.

```ts
const testingFrameworks = {
  vitest: {
    label: "Vitest",
  },
  jest: {
    label: "Jest",
  },
  mocha: {
    label: "Mocha",
  },
};

type TestingFramework = keyof typeof testingFrameworks;
```

- The `keyof` operator can be useful in situations where you want to access or manipulate the keys of an object type dynamically. For example, you can use the keyof operator to define a function that retrieves a property value from an object given its key:

```ts
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}
```

- In the example above, the `getProperty` function takes an object of type `T`, a key of type `K` that must be a key of `T`, and returns the value of the property with the given key. By using the `keyof` operator and a generic type parameter `K` with a constraint that extends `keyof T`, the function ensures that the key argument is a valid key of the obj argument, and that the return type of the function is the same as the type of the property value with the given key.

- It's worth noting that the `keyof` operator only works with object types and not with other types such as primitive types or function types. If you want to obtain the parameter types or return type of a function type, you can use the `Parameters` and `ReturnType` utility types, respectively.

# 2. Union and Indexing

## 2.1 Terminology: union, discriminated union, enum

**discriminated union**

- A discriminated union is a **special kind of union type that uses a common property or a set of properties, known as the discriminant, to distinguish between the different variants of the union**. Each variant of the union corresponds to a specific value of the discriminant property.

```ts
type A =
  | {
      type: "a";
      a: string;
    }
  | {
      type: "b";
      b: string;
    }
  | {
      type: "c";
      c: string;
    };
```

```ts
type Shape =
  | { type: "circle"; radius: number }
  | { type: "rectangle"; width: number; height: number };

function getArea(shape: Shape): number {
  switch (shape.type) {
    case "circle":
      return Math.PI * shape.radius ** 2;
    case "rectangle":
      return shape.width * shape.height;
    default:
      throw new Error(`Invalid shape: ${shape}`);
  }
}
```

- The discriminated union pattern is useful for working with complex data structures that have different variants with different properties. It provides a type-safe way to access the properties of each variant without using type assertions or unsafe type casts.

<br>

---

**union**:

```ts
type B = "a" | "b" | "c";
```

<br>

---

**enum**:

```ts
enum C {
  A = "a",
  B = "b",
  C = "c",
}
```

## 2.2 `Extract` from union, discriminated union

- In TypeScript, the `Extract` utility type is used to **extract a subset of types from a union type that satisfy a given constraint**.

**syntax**:

```ts
type Extract<T, U>;
```

- where `T` is the union type and `U` is the type or union of types that we want to extract from `T`.
- The `Extract` type returns a new union type that includes only those types from `T` that are assignable to `U`.

<br>

**example**:

```ts
type Shape = "circle" | "rectangle" | "triangle";
type CircleOrRectangle = Extract<Shape, "circle" | "rectangle">;
```

<br>

**another example**:

- The `Extract` utility type is particularly **useful when working with generic types that have a union type as a type parameter**.
- For example, suppose you have a generic `ArrayItem` type that represents the type of the elements of an array:

```ts
type ArrayItem<T> = T extends Array<infer U> ? U : never;
```

- You can use the `Extract` utility type to extract a subset of elements of an array that satisfy a given constraint:

```ts
type NumbersOnly<T extends Array<any>> = Extract<ArrayItem<T>, number>;
```

- In this example, the `NumbersOnly` type is a generic type that takes an array type `T` as a type parameter and returns a new array type that includes only those elements of T that are numbers.

<br>

**example with discriminated union**:

```ts
export type Event =
  | {
      type: "click";
      event: MouseEvent;
    }
  | {
      type: "focus";
      event: FocusEvent;
    }
  | {
      type: "keydown";
      event: KeyboardEvent;
    };

// type ClickEvent = Extract<Event, { type: "click"}>;
// or
type ClickEvent = Extract<Event, { event: MouseEvent }>;
```

## 2.3 `Exclude` from union, discriminated union (reverse of `Extract`)

- In TypeScript, the `Exclude` utility type is used to **exclude a subset of types from a union type that satisfy a given constraint**.

**syntax**:

```ts
type Exclude<T, U>;
```

- where `T` is the union type and `U` is the type or union of types that we want to exclude from `T`.
- The `Exclude` type returns a new union type that includes only those types from `T` that are not assignable to `U`.

<br>

**example**:

```ts
type Shape = "circle" | "rectangle" | "triangle";
type NotTriangle = Exclude<Shape, "triangle">;
```

```ts
type ArrayItem<T> = T extends Array<infer U> ? U : never;
type NonNumbers<T extends Array<any>> = Exclude<ArrayItem<T>, number>;
```

<br>

**example with discriminated union**:

```ts
export type Event =
  | {
      type: "click";
      event: MouseEvent;
    }
  | {
      type: "focus";
      event: FocusEvent;
    }
  | {
      type: "keydown";
      event: KeyboardEvent;
    };

type NonKeyDownEvents = Exclude<Event, { type: "keydown" }>;
```

## 2.4 Union type in JS

- **In JavaScript, there is no direct equivalent to the union type in TypeScript**, because JavaScript does not have a static type system with type annotations.
- However, you can achieve similar behavior in JavaScript using the typeof operator, which allows you to determine the runtime type of a value.

- For example, suppose you have a function that can accept a string or a number as its argument:

```ts
function printValue(value: string | number) {
  console.log(value);
}
```

- In JavaScript, you can achieve similar behavior using the typeof operator to determine the runtime type of the value:

```js
function printValue(value) {
  if (typeof value === "string" || typeof value === "number") {
    console.log(value);
  } else {
    throw new Error("Value must be a string or a number");
  }
}
```

- This code checks whether the value is either a string or a number using the typeof operator, and prints it to the console if it is. If the value is not a string or a number, an error is thrown.

- Note that this approach is less safe than using the union type in TypeScript, because it relies on runtime checks rather than static type checks. However, it can be a useful technique for writing more robust JavaScript code.

## 2.5 Indexed access

**syntax**:

```ts
type MyType = SomeType["propertyName"];
```

<br>

**example**:

```ts
type Person = {
  name: string;
  age: number;
};

type NameType = Person["name"];

type People = {
  person1: Person;
  person2: Person;
};

type Names = People["person1" | "person2"]["name"];
```

<br>

**another example**:

```ts
export const fakeDataDefaults = {
  String: "Default string",
  Int: 1,
  Float: 1.14,
  Boolean: true,
  ID: "id",
};

type FakeDataDefaultsType = typeof fakeDataDefaults;

export type StringType = FakeDataDefaultsType["String"];
export type IntType = FakeDataDefaultsType["Int"];
export type FloatType = FakeDataDefaultsType["Float"];
export type BooleanType = FakeDataDefaultsType["Boolean"];
export type IDType = FakeDataDefaultsType["ID"];

type tests = [
  Expect<Equal<StringType, string>>,
  Expect<Equal<IntType, number>>,
  Expect<Equal<FloatType, number>>,
  Expect<Equal<BooleanType, boolean>>,
  Expect<Equal<IDType, string>>
];
```

## 2.6 Discriminated union to discriminator

- When using indexed access on a union type, the resulting type is a union of the types of the key in each constituent type of the union, even if one or more of those types are incompatible.
- For example, if you have a union type of objects that have both a name property of type `string` and a name property of type `number`, accessing the name property using indexed access will result in a union type of `string | number`.

```ts
export type Event =
  | {
      type: "click";
      event: MouseEvent;
    }
  | {
      type: "focus";
      event: FocusEvent;
    }
  | {
      type: "keydown";
      event: KeyboardEvent;
    };

type EventType = Event["type"];

type tests = [Expect<Equal<EventType, "click" | "focus" | "keydown">>];
```

## 2.7 `as const`

- The `as const` syntax in TypeScript is a **way to create a readonly or constant array, tuple, or object literal type**.
- When you use as const on an expression, TypeScript infers a more specific literal type for the expression that has all the properties or elements marked as readonly.

```ts
const myArray = [1, 2, 3] as const;

myArray.push(4); // Error: Property 'push' does not exist on type 'readonly [1, 2, 3]'
```

- Similarly, you can use `as const` on object literals and tuple types to create readonly or constant object types:

```ts
const myObj = { foo: 1, bar: 2 } as const;
const myTuple = [1, "hello", true] as const;
```

- Overall, `as const` is a powerful feature of TypeScript that allows you to create more specific literal types that are readonly or constant, which can help you catch potential bugs and ensure that your code is more robust.

<br>

**example**:

```ts
export const programModeEnumMap = {
  GROUP: "group",
  ANNOUNCEMENT: "announcement",
  ONE_ON_ONE: "1on1",
  SELF_DIRECTED: "selfDirected",
  PLANNED_ONE_ON_ONE: "planned1on1",
  PLANNED_SELF_DIRECTED: "plannedSelfDirected",
} as const;

export type GroupProgram = (typeof programModeEnumMap)["GROUP"];
export type AnnouncementProgram = (typeof programModeEnumMap)["ANNOUNCEMENT"];
export type OneOnOneProgram = (typeof programModeEnumMap)["ONE_ON_ONE"];
export type SelfDirectedProgram = (typeof programModeEnumMap)["SELF_DIRECTED"];
export type PlannedOneOnOneProgram =
  (typeof programModeEnumMap)["PLANNED_ONE_ON_ONE"];
export type PlannedSelfDirectedProgram =
  (typeof programModeEnumMap)["PLANNED_SELF_DIRECTED"];

type tests = [
  Expect<Equal<GroupProgram, "group">>,
  Expect<Equal<AnnouncementProgram, "announcement">>,
  Expect<Equal<OneOnOneProgram, "1on1">>,
  Expect<Equal<SelfDirectedProgram, "selfDirected">>,
  Expect<Equal<PlannedOneOnOneProgram, "planned1on1">>,
  Expect<Equal<PlannedSelfDirectedProgram, "plannedSelfDirected">>
];
```

- In the example above `as const`:
  - freezes the values, make sure that they are inferred from their literals
  - adds `readonly` annotation

<br>

- We can achieve the same effect by using `Object.freeze()`
  - but `Object.freeze()` works only on first level (does not go deep)

## 2.8 Exercise: indexed access with unions

```ts
export const programModeEnumMap = {
  GROUP: "group",
  ANNOUNCEMENT: "announcement",
  ONE_ON_ONE: "1on1",
  SELF_DIRECTED: "selfDirected",
  PLANNED_ONE_ON_ONE: "planned1on1",
  PLANNED_SELF_DIRECTED: "plannedSelfDirected",
} as const;

export type IndividualProgram = (typeof programModeEnumMap)[Exclude<
  keyof typeof programModeEnumMap,
  "GROUP" | "ANNOUNCEMENT"
>];

type tests = [
  Expect<
    Equal<
      IndividualProgram,
      "1on1" | "selfDirected" | "planned1on1" | "plannedSelfDirected"
    >
  >
];
```

also valid:

```ts
export type IndividualProgram = (typeof programModeEnumMap)[
  | "ONE_ON_ONE"
  | "SELF_DIRECTED"
  | "PLANNED_ONE_ON_ONE"
  | "PLANNED_SELF_DIRECTED"];
```

## 2.9 Exercise: get object values

```ts
const frontendToBackendEnumMap = {
  singleModule: "SINGLE_MODULE",
  multiModule: "MULTI_MODULE",
  sharedModule: "SHARED_MODULE",
} as const;

type BackendModuleEnum =
  (typeof frontendToBackendEnumMap)[keyof typeof frontendToBackendEnumMap];

type tests = [
  Expect<
    Equal<BackendModuleEnum, "SINGLE_MODULE" | "MULTI_MODULE" | "SHARED_MODULE">
  >
];
```

## 2.10 Exercise: get array value

```ts
const fruits = ["apple", "banana", "orange"] as const;

type FruitsType = typeof fruits;

type AppleOrBanana = FruitsType[0 | 1];
type Fruit = FruitsType[number];

type tests = [
  Expect<Equal<AppleOrBanana, "apple" | "banana">>,
  Expect<Equal<Fruit, "apple" | "banana" | "orange">>
];
```

# 3. Template Literals

## 3.1 Template literals with strings

- **Template literal** is a new feature in TypeScript 4.1 that allow you to specify the type of a string literal. This can be useful for ensuring that a string literal is a valid value for a particular property or function.

- For example, the following code uses a template literal type to extract the components of a SemVer string:

```ts
type SemVerString =
  `${number}.${number}.${number}${optionalPrerelease}${optionalBuild}`;

type SemVer = {
  major: number;
  minor: number;
  patch: number;
  prerelease?: string;
  build?: string;
};

const semVerString = "1.2.3-beta.1";

const semVer = {
  major: semVerString.split(".")[0] as number,
  minor: semVerString.split(".")[1] as number,
  patch: semVerString.split(".")[2] as number,
  prerelease: semVerString.split("-")[1] as string,
  build: semVerString.split("-")[2] as string,
};
```

<br>

**another example**:

```ts
type Route = `/${string}`;

export const goToRoute = (route: Route) => {};

// Should succeed:

goToRoute("/users");
goToRoute("/");
goToRoute("/admin/users");

// Should error:

// @ts-expect-error
goToRoute("users/1");
// @ts-expect-error
goToRoute("http://facebook.com");
```

## 3.2 `Extract` with template literals

```ts
type Routes = "/users" | "/users/:id" | "/posts" | "/posts/:id";

type DynamicRoutes = Extract<Routes, `${string}:${string}`>;

type tests = [Expect<Equal<DynamicRoutes, "/users/:id" | "/posts/:id">>];
```

## 3.3 Unions in template literals

```ts
type BreadType = "rye" | "brown" | "white";

type Filling = "cheese" | "ham" | "salami";

type Sandwich = `${BreadType} sandwich with ${Filling}`;

type tests = [
  Expect<
    Equal<
      Sandwich,
      | "rye sandwich with cheese"
      | "rye sandwich with ham"
      | "rye sandwich with salami"
      | "brown sandwich with cheese"
      | "brown sandwich with ham"
      | "brown sandwich with salami"
      | "white sandwich with cheese"
      | "white sandwich with ham"
      | "white sandwich with salami"
    >
  >
];
```

## 3.4 (madness) Splitting string literals (using ts-toolbelt)

```ts
// Might come in handy!
import { S } from "ts-toolbelt";
// https://millsp.github.io/ts-toolbelt/modules/string_split.html

import { Equal, Expect } from "../helpers/type-utils";

type Path = "Users/John/Documents/notes.txt";

type SplitPath = S.Split<Path, "/">;

type tests = [
  Expect<Equal<SplitPath, ["Users", "John", "Documents", "notes.txt"]>>
];
```

## 3.5 Template literals in object keys (and `Record`)

**`Record`**:

- In TypeScript, `Record` is a built-in utility type that **allows you to create a type with specified keys and a specific value type**.
- The `Record` type takes two type arguments: the first is a union type of string or number literal types that represent the keys, and the second is the value type for those keys.
- **Syntax**:

```ts
type Record<K extends keyof any, T> = {
  [P in K]: T;
};
```

- In this type definition, `K` represents the union of key types and `T` represents the value type.
- The `[P in K]` syntax is a mapped type that maps each key in `K` to the value type `T`.

<br>

**example**:

```ts
type Fruit = "apple" | "banana" | "orange";

type FruitCount = Record<Fruit, number>;

const fruitCount: FruitCount = {
  apple: 3,
  banana: 2,
  orange: 1,
};

console.log(fruitCount.apple); // outputs 3
console.log(fruitCount.banana); // outputs 2
console.log(fruitCount.orange); // outputs 1
```

<br>

**Template literals in object keys**:

```ts
type TemplateLiteralKey = `${"user" | "post" | "comment"}${"Id" | "Name"}`;

type ObjectOfKeys = Record<TemplateLiteralKey, string>;

type tests = [
  Expect<
    Equal<
      ObjectOfKeys,
      {
        userId: string;
        userName: string;
        postId: string;
        postName: string;
        commentId: string;
        commentName: string;
      }
    >
  >
];
```

## 3.6 Transforming string literal types

1. `Uppercase`:

```ts
type Event = `log_in` | "log_out" | "sign_up";

type ObjectOfKeys = Record<Uppercase<Event>, string>;

type tests = [
  Expect<
    Equal<
      ObjectOfKeys,
      {
        LOG_IN: string;
        LOG_OUT: string;
        SIGN_UP: string;
      }
    >
  >
];
```

<br>

2. `Lowercase`:

```ts
type MyString = "HELLO, WORLD";
type MyLowercaseString = Lowercase<MyString>;
const myLowercaseString: MyLowercaseString = "hello, world";
console.log(myLowercaseString); // outputs "hello, world"
```

<br>

3. `Capitalize`:

```ts
type MyString = "hello, world";
type MyCapitalizedString = Capitalize<MyString>;
const myCapitalizedString: MyCapitalizedString = "Hello, world";
console.log(myCapitalizedString); // outputs "Hello, world"
```

<br>

4. `Uncapitalize`:

```ts
type MyString = "Hello, world";
type MyUncapitalizedString = Uncapitalize<MyString>;
const myUncapitalizedString: MyUncapitalizedString = "hello, world";
console.log(myUncapitalizedString); // outputs "hello, world"
```

# 4. Type Helpers Pattern

## 4.1 Type helpers example (?) - return what i pass in

```ts
// this one is unrelated, to be deleted
type ValueOf<T> = T[keyof T];

type ReturnWhatIPassIn<T> = T;

type tests = [
  Expect<Equal<ReturnWhatIPassIn<1>, 1>>,
  Expect<Equal<ReturnWhatIPassIn<"1">, "1">>,
  Expect<Equal<ReturnWhatIPassIn<true>, true>>,
  Expect<Equal<ReturnWhatIPassIn<false>, false>>,
  Expect<Equal<ReturnWhatIPassIn<null>, null>>
];
```

- allow us to create 'functions' that return other (here, passed in) types

## 4.2 Maybe

```ts
type Maybe<T> = T | null | undefined;

type tests = [
  Expect<Equal<Maybe<string>, string | null | undefined>>,
  Expect<Equal<Maybe<number>, number | null | undefined>>,
  Expect<Equal<Maybe<boolean>, boolean | null | undefined>>,
  Expect<Equal<Maybe<null>, null | undefined>>
];
```

## 4.3 Constraints

```ts
type AddRoutePrefix<TRoute extends string> = `/${TRoute}`;

type tests = [
  Expect<Equal<AddRoutePrefix<"">, "/">>,
  Expect<Equal<AddRoutePrefix<"about">, "/about">>,
  Expect<Equal<AddRoutePrefix<"about/team">, "/about/team">>,
  Expect<Equal<AddRoutePrefix<"blog">, "/blog">>,
  // @ts-expect-error
  AddRoutePrefix<boolean>,
  // @ts-expect-error
  AddRoutePrefix<number>
];
```

## 4.4 Multiple

```ts
type CreateDataShape<TData, TError> = {
  data: TData;
  error: TError;
};

type tests = [
  Expect<
    Equal<
      CreateDataShape<string, TypeError>,
      {
        data: string;
        error: TypeError;
      }
    >
  >,
  Expect<
    Equal<
      CreateDataShape<number, Error>,
      {
        data: number;
        error: Error;
      }
    >
  >,
  Expect<
    Equal<
      CreateDataShape<boolean, SyntaxError>,
      {
        data: boolean;
        error: SyntaxError;
      }
    >
  >
];
```

## 4.5 Defaults

```ts
type CreateDataShape<TData, TError = undefined> = {
  data: TData;
  error: TError;
};

type tests = [
  Expect<
    Equal<
      CreateDataShape<string>,
      {
        data: string;
        error: undefined;
      }
    >
  >,
  Expect<
    Equal<
      CreateDataShape<boolean, SyntaxError>,
      {
        data: boolean;
        error: SyntaxError;
      }
    >
  >
];
```

## 4.6 Function constraints

```ts
type GetParametersAndReturnType<T extends (...args: any) => any> = {
  params: Parameters<T>;
  returnValue: ReturnType<T>;
};

type tests = [
  Expect<
    Equal<
      GetParametersAndReturnType<() => string>,
      { params: []; returnValue: string }
    >
  >,
  Expect<
    Equal<
      GetParametersAndReturnType<(s: string) => void>,
      { params: [string]; returnValue: void }
    >
  >,
  Expect<
    Equal<
      GetParametersAndReturnType<(n: number, b: boolean) => number>,
      { params: [number, boolean]; returnValue: number }
    >
  >
];
```

## 4.7 Not undefined or null constraint

- `{}` - anything that is not `null` or `undefined`
- TS will do structural comparison

```ts
export type Maybe<T extends {}> = T | null | undefined;

type tests = [
  // @ts-expect-error
  Maybe<null>,
  // @ts-expect-error
  Maybe<undefined>,

  Maybe<string>,
  Maybe<false>,
  Maybe<0>,
  Maybe<"">
];
```

## 4.8 Not empty array (this one)

```ts
type NonEmptyArray<T> = [T, ...Array<T>];

export const makeEnum = (values: NonEmptyArray<string>) => {};

makeEnum(["a"]);
makeEnum(["a", "b", "c"]);

// @ts-expect-error
makeEnum([]);
```

# 5. Conditional Types and `infer`

## 5.1 Conditional Types

- **Conditional types** are a powerful feature introduced in TypeScript 2.8 that **allow you to define a type based on a condition that depends on the types of other values**.
- In essence, they allow you to write type-level functions that operate on types instead of values.

<br>

**syntax**:

```ts
T extends U ? X : Y
```

- In this syntax, `T` is the type being tested, `U` is the type that `T` is being compared against, `X` is the resulting type if the condition is `true`, and `Y` is the resulting type if the condition is `false`.

<br>

**example**:

```ts
type IsArray<T> = T extends any[] ? true : false;
```

- You can use conditional types in a variety of ways to create more complex type-level functions. For example, you can use them to implement type guards, infer types from other types, and create more advanced type transformations. Here's an example that demonstrates how to use a conditional type to infer the return type of a function:

```ts
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : any;
```

- In this example, `ReturnType<T>` is a type that infers the return type of the function type `T`. The `extends` keyword is used to check whether `T` extends a function type with the signature `(...args: any[]) => infer R`, where `R` is a type variable that represents the return type of the function. If the condition is `true`, the resulting type is `R`; otherwise, it is `any`.

## 5.2 Returning `never`

**`never`**:

- In TypeScript, the `never` type **represents a value that never occurs**.
- It is a subtype of every other type, which means that it can be assigned to any other type but can only be assigned from an expression that produces a value of type `never`.
- The `never` type is most commonly used to represent the return type of a function that never returns.
- For example, a function that throws an error or enters an infinite loop would have a return type of never. Here's an example:

```ts
function throwError(message: string): never {
  throw new Error(message);
}

let x: never = throwError("something went wrong");
```

- The `never` type is also used in conjunction with other types, such as union types, to **indicate that a certain condition is impossible**.
- For example, consider the following function that takes a string and returns a number or throws an error:

```ts
function parseNumber(input: string): number {
  let n = parseInt(input);
  if (isNaN(n)) {
    throw new Error("Invalid input: " + input);
  }
  return n;
}
```

- In this example, the `parseNumber` function returns a `number` if the input can be parsed, but throws an error if it cannot. If we wanted to use this function to parse a string and return either a number or an error message, we could define a type like this:

```ts
type NumberOrError = number | string;
```

- However, this type would allow us to return any string, including ones that are not error messages. To indicate that only error messages are allowed, we can use the never type:

<br>

**example**:

```ts
type YouSayGoodbyeAndISayHello<T> = T extends "hello" | "goodbye"
  ? T extends "hello"
    ? "goodbye"
    : "hello"
  : never;

type tests = [
  Expect<Equal<YouSayGoodbyeAndISayHello<"hello">, "goodbye">>,
  Expect<Equal<YouSayGoodbyeAndISayHello<"goodbye">, "hello">>,
  Expect<Equal<YouSayGoodbyeAndISayHello<"alright pal">, never>>,
  Expect<Equal<YouSayGoodbyeAndISayHello<1>, never>>
];
```

## 5.3 `infer` with raw values

**`infer`**

- `infer` is a keyword in TypeScript used within conditional types to **infer the type of a type parameter from another type**.
- It is used in the context of conditional types to extract or infer a type from another type.

```ts
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never;

function foo() {
  return { x: 10, y: 20 };
}

type FooReturnType = ReturnType<typeof foo>; // { x: number, y: number }
```

- In this example, we define a generic type `ReturnType` that takes a function type as its input. Inside the conditional type, we use `infer` to extract the return type of the function. If `T` is a function type, the type parameter `R` is inferred as the return type of the function, and `R` is used as the result of the conditional type. If `T` is not a function type, the type `never` is returned.

- We then define a function foo that returns an object with two properties. We use the `typeof` operator to get the type of the foo function, and use `ReturnType` to extract its return type. The resulting type of FooReturnType is inferred as { x: number, y: number }.

- Overall, infer is a powerful feature of TypeScript that allows us to extract or infer types from other types, making it easier to work with complex types and APIs.

<br>

**`infer` with raw values**

```ts
type GetDataValue<T> = T extends { data: infer TInferredData }
  ? TInferredData
  : never;

type tests = [
  Expect<Equal<GetDataValue<{ data: "hello" }>, "hello">>,
  Expect<Equal<GetDataValue<{ data: { name: "hello" } }>, { name: "hello" }>>,
  Expect<
    Equal<
      GetDataValue<{ data: { name: "hello"; age: 20 } }>,
      { name: "hello"; age: 20 }
    >
  >,
  // Expect that if you pass in string, it
  // should return never
  Expect<Equal<GetDataValue<string>, never>>
];
```

## 5.4 `infer` with generics

- To **extract a generic type parameter from a generic slot of a given interface**, you can use the infer keyword along with a conditional type.

**example**:

```ts
interface MyInterface<T> {
  prop1: string;
  prop2: T;
}

type ExtractGenericType<T> = T extends MyInterface<infer U> ? U : never;

type MyType = ExtractGenericType<MyInterface<number>>; // number
```

- In this example, we define an interface `MyInterface` with a generic type parameter `T`.
- We then define a conditional type `ExtractGenericType`, which takes a type `T` as its input.
- The conditional type checks if `T extends MyInterface<infer U>`, where infer `U` means that we want to infer the type of the generic type parameter `U`.
- If `T` does extend `MyInterface<infer U>`, then the type parameter `U` is inferred as the type of the `prop2` property, and is returned as the result of the conditional type.
- If `T` does not extend `MyInterface<infer U>`, then the type `never` is returned.

<br>

**another example**:

```ts
interface MyComplexInterface<Event, Context, Name, Point> {
  getEvent: () => Event;
  getContext: () => Context;
  getName: () => Name;
  getPoint: () => Point;
}

type Example = MyComplexInterface<
  "click",
  "window",
  "my-event",
  { x: 12; y: 14 }
>;

type GetPoint<T> = T extends MyComplexInterface<any, any, any, infer TPoint>
  ? TPoint // also ReturnType<T["getPoint"]>
  : never;

type tests = [Expect<Equal<GetPoint<Example>, { x: 12; y: 14 }>>];
```

## 5.5 Template literal value extraction

```ts
type Names = [
  "Matt Pocock",
  "Jimi Hendrix",
  "Eric Clapton",
  "John Mayer",
  "BB King"
];

type GetSurname<T> = T extends `${infer First} ${infer Last}` ? Last : never;

type tests = [
  Expect<Equal<GetSurname<Names[0]>, "Pocock">>,
  Expect<Equal<GetSurname<Names[1]>, "Hendrix">>,
  Expect<Equal<GetSurname<Names[2]>, "Clapton">>,
  Expect<Equal<GetSurname<Names[3]>, "Mayer">>,
  Expect<Equal<GetSurname<Names[4]>, "King">>
];
```

alternative:

```ts
import { S } from "ts-toolbelt";

type GetSurname<T extends string> = S.Split<T, " ">[1];
```

## 5.6 Get result from async function (this one is particularly useful)

```ts
const getServerSideProps = async () => {
  const data = await fetch("https://jsonplaceholder.typicode.com/todos/1");
  const json: { title: string } = await data.json();
  return {
    props: {
      json,
    },
  };
};

type InferPropsFromServerSideFunction<T> = T extends () => Promise<{
  props: infer P;
}>
  ? P
  : never;

type tests = [
  Expect<
    Equal<
      InferPropsFromServerSideFunction<typeof getServerSideProps>,
      { json: { title: string } }
    >
  >
];
```

## 5.7 `infer` in union types

```ts
const parser1 = {
  parse: () => 1,
};

const parser2 = () => "123";

const parser3 = {
  extract: () => true,
};

type GetParserResult<T> = T extends {
  parse: () => infer TResult;
}
  ? TResult
  : T extends () => infer TResult
  ? TResult
  : T extends {
      extract: () => infer TResult;
    }
  ? TResult
  : never;

type tests = [
  Expect<Equal<GetParserResult<typeof parser1>, number>>,
  Expect<Equal<GetParserResult<typeof parser2>, string>>,
  Expect<Equal<GetParserResult<typeof parser3>, boolean>>
];
```

alternatively:

```ts
type GetParserResult<T> = T extends
  | {
      parse: () => infer TResult;
    }
  | {
      extract: () => infer TResult;
    }
  | (() => infer TResult)
  ? TResult
  : never;
```

## 5.8 Distributive conditional types

- **Distributive conditional types** in TypeScript are a powerful feature that **allow you to create generic types that automatically distribute over union types**.

- A distributive conditional type is a conditional type that operates on a union type, and distributes the operation across each constituent type of the union. In other words, **if a distributive conditional type is applied to a union type, it will produce a union of the results of applying the conditional type to each constituent type of the union**.

```ts
type MyType<T> = T extends string ? number : boolean;

type Result = MyType<"a" | "b">; // Result is number | boolean
```

- In this example, we define a generic type `MyType` which takes a type parameter `T`. We then define a conditional type that checks if `T extends string`. If it does, the type `number` is returned, otherwise the type `boolean` is returned.

- We then define a type `Result` which applies `MyType` to the union type `'a' | 'b'`. Because `MyType` is a distributive conditional type, it is applied to each constituent type of the union, producing a union of the results: `number | boolean`.

- Note that if `MyType` were not a distributive conditional type, applying it to the union type `'a' | 'b'` would simply produce the result `number | boolean` without distributing the operation.

<br>

**example**:

```ts
type Fruit = "apple" | "banana" | "orange";

type GetAppleOrBanana<T> = T extends "apple" | "banana" ? T : never;

type AppleOrBanana = GetAppleOrBanana<Fruit>;

type tests = [Expect<Equal<AppleOrBanana, "apple" | "banana">>];
```

alternatively:

```ts
type AppleOrBanana = Fruit extends infer T
  ? T extends "apple" | "banana"
    ? T
    : never
  : never;
```

# 6. Key Mapping

## 6.1 Key mapping and union to object

**some intro about key mapping**:

- In TypeScript, **key mapping** is a **way to create a new type by mapping over the keys of an existing type**.

**syntax**:

```ts
type NewType = { [Key in keyof ExistingType]: NewValueType };
```

- Here, `ExistingType` is the type that we want to map over, and `NewValueType` is the type that we want to map each key to. The **`keyof` operator is used to get a union type of all the keys in `ExistingType`**, and the **`in` keyword is used to iterate over each key in the union type**.

- For example, suppose we have an existing type `Person`:

```ts
type Person = {
  name: string;
  age: number;
};
```

- We can create a new type PersonKeys which is a union of all the keys in Person:

```ts
type PersonKeys = keyof Person; // 'name' | 'age'
type PersonValues = { [Key in keyof Person]: Person[Key] }; // { name: string, age: number }
```

<br>

**example**:

```ts
type Route = "/" | "/about" | "/admin" | "/admin/users";

// we can do all types of stuffs here
// like [Key in Route]?: ...
// or [Key in "this" | "that"]: ...
// and so on...
type RoutesObject = { [Key in Route]: Key };

type tests = [
  Expect<
    Equal<
      RoutesObject,
      {
        "/": "/";
        "/about": "/about";
        "/admin": "/admin";
        "/admin/users": "/admin/users";
      }
    >
  >
];
```

## 6.2 `K in keyof`

```ts
interface Attributes {
  firstName: string;
  lastName: string;
  age: number;
}

type AttributeGetters = {
  [Key in keyof Attributes]: () => Attributes[Key];
};

type tests = [
  Expect<
    Equal<
      AttributeGetters,
      {
        firstName: () => string;
        lastName: () => string;
        age: () => number;
      }
    >
  >
];
```

## 6.3 `K in keyof as`

```ts
interface Attributes {
  firstName: string;
  lastName: string;
  age: number;
}

type AttributeGetters = {
  [K in keyof Attributes as `get${Capitalize<K>}`]: () => Attributes[K];
};

type tests = [
  Expect<
    Equal<
      AttributeGetters,
      {
        getFirstName: () => string;
        getLastName: () => string;
        getAge: () => number;
      }
    >
  >
];
```

## 6.4 `never` in key remapping

```ts
interface Example {
  name: string;
  age: number;
  id: string;
  organisationId: string;
  groupId: string;
}

// first take'
// type OnlyIdKeys<T> = {
//   [Key in keyof T as Key extends 'id' | 'organisationId' | 'groupId' ? Key : never]: T[Key]
// };

type SearchForId = `${string}${"id" | "Id"}${string}`;

// fancy:
type OnlyIdKeys<T> = {
  [Key in keyof T as Key extends SearchForId ? Key : never]: T[Key];
};

type Result = OnlyIdKeys<Example>;

type tests = [
  Expect<
    Equal<
      OnlyIdKeys<Example>,
      {
        id: string;
        organisationId: string;
        groupId: string;
      }
    >
  >,
  Expect<Equal<OnlyIdKeys<{}>, {}>>
];
```

## 6.5 Discriminated union to object (this one!)

```ts
type Route =
  | {
      route: "/";
      search: {
        page: string;
        perPage: string;
      };
    }
  | { route: "/about"; search: {} }
  | { route: "/admin"; search: {} }
  | { route: "/admin/users"; search: {} };

type RoutesObject = {
  [R in Route as R["route"]]: R["search"];
};

type tests = [
  Expect<
    Equal<
      RoutesObject,
      {
        "/": {
          page: string;
          perPage: string;
        };
        "/about": {};
        "/admin": {};
        "/admin/users": {};
      }
    >
  >
];
```

alternative:

```ts
type RoutesObject = {
  [R in Route["route"]]: Extract<Route, { route: R }>["search"];
};
```

## 6.6 Object to union of tuples

```ts
interface Values {
  email: string;
  firstName: string;
  lastName: string;
}

type ValuesAsUnionOfTuples = {
  [K in keyof Values]: [K, Values[K]];
}[keyof Values];

type tests = [
  Expect<
    Equal<
      ValuesAsUnionOfTuples,
      ["email", string] | ["firstName", string] | ["lastName", string]
    >
  >
];
```

## 6.7 Object to union of template literals

```ts
interface FruitMap {
  apple: "red";
  banana: "yellow";
  orange: "orange";
}

type TransformedFruit = {
  [Key in keyof FruitMap]: `${Key}:${FruitMap[Key]}`;
}[keyof FruitMap];

type tests = [
  Expect<
    Equal<TransformedFruit, "apple:red" | "banana:yellow" | "orange:orange">
  >
];
```

## 6.8 Discriminated union to union

```ts
type Fruit =
  | {
      name: "apple";
      color: "red";
    }
  | {
      name: "banana";
      color: "yellow";
    }
  | {
      name: "orange";
      color: "orange";
    };

type TransformedFruit = {
  [Key in Fruit as Key["name"]]: `${Key["name"]}:${Key["color"]}`;
}[Fruit["name"]];

type tests = [
  Expect<
    Equal<TransformedFruit, "apple:red" | "banana:yellow" | "orange:orange">
  >
];
```

# 7. Challenges

## 7.1 Get dynamic path params (madness)

```ts
import { S } from "ts-toolbelt";

type UserPath = "/users/:id";

type UserOrganisationPath = "/users/:id/organisations/:organisationId";

type ExtractPathParams<TPath extends string> = {
  [K in S.Split<TPath, "/">[number] as K extends `:${infer P}`
    ? P
    : never]: string;
};

type tests = [
  Expect<Equal<ExtractPathParams<UserPath>, { id: string }>>,
  Expect<
    Equal<
      ExtractPathParams<UserOrganisationPath>,
      { id: string; organisationId: string }
    >
  >
];
```

## 7.2 Mutually exclusive properties

```ts
interface Attributes {
  id: string;
  email: string;
  username: string;
}

/**
 * How do we create a type helper that represents a union
 * of all possible combinations of Attributes?
 */
type MutuallyExclusive<T> = {
  [Key in keyof T]: Record<Key, T[Key]>;
}[keyof T];

type Result = MutuallyExclusive<Attributes>;

type ExclusiveAttributes = MutuallyExclusive<Attributes>;

type tests = [
  Expect<
    Equal<
      ExclusiveAttributes,
      | {
          id: string;
        }
      | {
          email: string;
        }
      | {
          username: string;
        }
    >
  >
];
```

## 7.3 Discriminated union with unique values

```ts
type Route =
  | {
      route: "/";
      search: {
        page: string;
        perPage: string;
      };
    }
  | { route: "/about" }
  | { route: "/admin" }
  | { route: "/admin/users" };

// mapping, infer, as

type RoutesObject = {
  [R in Route as R["route"]]: R extends { search: infer S } ? S : never;
};

type tests = [
  Expect<
    Equal<
      RoutesObject,
      {
        "/": {
          page: string;
          perPage: string;
        };
        "/about": never;
        "/admin": never;
        "/admin/users": never;
      }
    >
  >
];
```

## 7.4 Deep partial (monstrosity)

- hints:
  - do mapping part first, (recursion, :?)
  - solve the problem with Array next

```ts
// inside our type we can reuse that type
type DeepPartial<T> = T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : {
      [Key in keyof T]?: DeepPartial<T[Key]>;
    };

type MyType = {
  a: string;
  b: number;
  c: {
    d: string;
    e: {
      f: string;
      g: {
        h: string;
        i: string;
      }[];
    };
  };
};

type Result = DeepPartial<MyType>;

type tests = [
  Expect<
    Equal<
      Result,
      {
        a?: string;
        b?: number;
        c?: {
          d?: string;
          e?: {
            f?: string;
            g?: {
              h?: string;
              i?: string;
            }[];
          };
        };
      }
    >
  >
];
```
