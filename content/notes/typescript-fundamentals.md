---
title: "Typescript: Fundamentals"
description: "Getting started with TypeScript"
author: Ivan O
authorImage: https://images.unsplash.com/photo-1509396591411-549811e332fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80
coverImage: https://images.unsplash.com/photo-1509718443690-d8e2fb3474b7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80
date: "2021-05-05"
---

- [1. Intro](#1-intro)
  - [1.1 So... What is Typescript?](#11-so-what-is-typescript)
  - [1.2 Typescript compiler](#12-typescript-compiler)
  - [1.3 Syntax + Features vs Design Patterns with TS](#13-syntax--features-vs-design-patterns-with-ts)
- [2. Types](#2-types)
  - [2.1 Type Annotations + Type Inference](#21-type-annotations--type-inference)
  - [2.2 `any`](#22-any)
  - [2.3 `void` and `never`](#23-void-and-never)
  - [2.4 Arrays (with types!)](#24-arrays-with-types)
  - [2.5 Tuples](#25-tuples)
  - [2.6 Interfaces](#26-interfaces)
  - [2.7 Classes](#27-classes)
- [3. Using TS](#3-using-ts)
  - [3.1 Type Definition Files](#31-type-definition-files)
  - [3.2 Typical Typescript File](#32-typical-typescript-file)
  - [3.3 Initialize `tsconfig.json` file](#33-initialize-tsconfigjson-file)
  - [3.4 Type Guards](#34-type-guards)
  - [3.5 Getter example](#35-getter-example)
  - [3.6 Abstract Classes](#36-abstract-classes)
  - [3.7 Interfaces vs Abstract Classes](#37-interfaces-vs-abstract-classes)
  - [3.8 Using Enums](#38-using-enums)
  - [3.9 Type Assertions](#39-type-assertions)
  - [3.10 Variable Types with Generics](#310-variable-types-with-generics)
  - [3.11 Inheritance vs Composition](#311-inheritance-vs-composition)
  - [3.12 Type Inference with Generics](#312-type-inference-with-generics)
  - [3.13 Function Generics](#313-function-generics)
  - [3.14 Generic Constraints](#314-generic-constraints)
  - [3.15 Two Important Rules](#315-two-important-rules)
  - [3.16 Generics with Constraints Example](#316-generics-with-constraints-example)
  - [3.17 Shortened Passthrough Methods](#317-shortened-passthrough-methods)
- [4. Typescript with JS Libraries](#4-typescript-with-js-libraries)
  - [4.1 Issues with Type Definition Files](#41-issues-with-type-definition-files)
- [5. Decorators in Typescript](#5-decorators-in-typescript)
  - [4.1 Decorator Factories](#41-decorator-factories)
  - [4.2 Decorators Around Properties](#42-decorators-around-properties)
  - [4.3 Decorators Around Parameters](#43-decorators-around-parameters)
  - [4.3 Decorators Around Class Definitions](#43-decorators-around-class-definitions)
  - [4.4 TS decorators and Express](#44-ts-decorators-and-express)
  - [4.5 Metadata:](#45-metadata)
- [5. React \& Typescript](#5-react--typescript)
  - [5.1 Just in case (A brief sales pitch)](#51-just-in-case-a-brief-sales-pitch)
  - [5.2 Refactoring `PropTypes`](#52-refactoring-proptypes)
  - [5.3 Typing `children`](#53-typing-children)
  - [5.4 Built-in helpers for typing children in React](#54-built-in-helpers-for-typing-children-in-react)
  - [5.5 Typing `useState`](#55-typing-usestate)
  - [5.6 Typing Reducers](#56-typing-reducers)
    - [5.6.1 Refactoring from `useState` to `useReducer`](#561-refactoring-from-usestate-to-usereducer)
    - [5.6.2 Monstrosity reducer example:](#562-monstrosity-reducer-example)
  - [5.7 Context API](#57-context-api)
  - [5.8 Utility Types (some of them)](#58-utility-types-some-of-them)
    - [5.8.1 `keyof`](#581-keyof)
    - [5.8.2 Getting The Type of a Single Key in an Object - index operator](#582-getting-the-type-of-a-single-key-in-an-object---index-operator)
    - [5.8.3 What About Getting the Values?](#583-what-about-getting-the-values)
    - [5.8.4 Unions](#584-unions)
    - [5.8.5 Unions with Objects](#585-unions-with-objects)
    - [5.8.6 Intersections](#586-intersections)
    - [5.8.7 Conditionals](#587-conditionals)
    - [5.8.8 `Exclude`](#588-exclude)
    - [5.8.9 `Extract`](#589-extract)
    - [5.8.10 Objects](#5810-objects)
    - [5.8.11 `Pick`](#5811-pick)
    - [5.8.12 `Omit`](#5812-omit)
    - [5.8.13 String Manipulation Utilities](#5813-string-manipulation-utilities)
  - [5.9 Generics (recap + for Context API)](#59-generics-recap--for-context-api)
    - [5.9.1 Examples](#591-examples)
    - [5.9.2 Create Context with Generics](#592-create-context-with-generics)
    - [5.9.3 use a Custom `createContext` (from 5.9.2)](#593-use-a-custom-createcontext-from-592)
    - [5.9.4 Autocomplete](#594-autocomplete)
  - [5.10 Polymorphic Components](#510-polymorphic-components)

# 1. Intro

## 1.1 So... What is Typescript?

**The TS Type System**:

- Helps us catch errors DURING DEVELOPMENT
- Uses 'type annotations' to analyze our code
- Only active DURING DEVELOPMENT
- Doesn't provide any performance optimization

**Common scenarios**:

1. Typescript Code (JavaScript with type annotations)
2. Typescript Compiler
3. Plain old Javascript
4. Browser executes plain Javascript, has no idea we wrote Typescript

## 1.2 Typescript compiler

`npm install -g typescript ts-node`

## 1.3 Syntax + Features vs Design Patterns with TS

**Syntax + Features**:

- what is an interface? -> What is the syntax for defining an interface?

**Design Patterns with TS**:

- How do we use interfaces to write reusable code?

**Plan**:

1. Plain Definition + Overview
2. Why do we care?
3. Examples
4. When to use this?

# 2. Types

**Type** - Easy way to refer to the different properties + functions that a value has

example: "red":

- its a string
- it is a value that has all the properties + methods that string has

**Types**:

| Primitive Types | Object Types |
| --------------- | ------------ |
| number          | function     |
| string          | class        |
| boolean         | array        |
| symbol          | object       |
| void            |              |
| null            |              |
| undefined       |              |

- **Why do we care about types?**:

  - Types are used by the Typescript Compiler to analyze our code for errors
  - Types allow other engineers to understand what values are flowing around our codebase

- **When to use Types?**
  - Everywhere!

## 2.1 Type Annotations + Type Inference

- Variables
- Functions
- Objects

**Type annotations**:

- Code we add to tell Typescript what type of value a variable will refer to
- We (developers) tell Typescript the type
- **When to use**:
  - When a function returns the 'any' type and we need to clarify the value
  - When we declare a variable on one line then initialize it later
  - When we want ta variable to have a type that can't be inferred

**Type inference**

- Typescript tries to figure out what type of value a variable refers to
- Typescript guesses the type
- If declaration and initialization are on the same line, Typescript will figure out the type of (for example) 'color' for us: `const color = 'red';`
- **When to use**:
  - Always!

**Type annotations for functions**:

- Code we add to tell Typescript what type of arguments a function will receive and what type of values it will return
  **Type inference for functions**:
- Typescript tries to figure out what type of value a function will return

## 2.2 `any`

- A type, just as 'string' or 'boolean' are
- Means TS has no idea what this is - can't check for correct property references
- **Avoid variables with 'any' at all costs**

## 2.3 `void` and `never`

```ts
const logger = (message: string): void => {
  console.log(message);
};

const throwError = (message: string): never => {
  throw new Error(message);
};
```

**Destructuring with Annotations**:

```ts
const logWeather = ({
  date,
  weather,
}: {
  date: Date;
  weather: string;
}): void => {
  console.log(date);
  console.log(weather);
};
```

**Annotations Around Objects**:

```ts
const profile = {
  name: "Alexis",
  age: 20,
  coords: {
    lat: 0,
    lng: 15,
  },
  setAge(age: number): void {
    this.age = age;
  },
};

const { age }: { age: number } = profile;
const {
  coords: { lat, lng },
}: { coords: { lat: number; lng: number } } = profile;
```

## 2.4 Arrays (with types!)

**Typed Arrays** - Arrays where each element is some consistent type of value

**Examples**:

```ts
const carMakers: string[] = [];
// const carMakers = ['ford', 'fiat', 'chevy'];
const dates = [new Date(), new Date()];

const carsByMake: string[][] = [];
// const carsByMake = [["f150"], ["corolla"], ["camaro"]];
```

**Why do we care?**:

- TS can do type inference when extracting values from an array
- TS can prevent us from adding incompatible values to the array
- We can get help with `map`, `forEach`, `reduce` methods
- Flexible - arrays can still contain multiple different types

```ts
// Help with inference when extracting values
const car = carMakers[0];
const myCar = carMakers.pop();

// Prevent incompatible values
// carMakers.push(100);

// Help with 'map'
carMakers.map((car: string) => {
  return car.toUpperCase();
});

// flexible types
const importantDates: (Date | string)[] = [];
importantDates.push("2030-10-10");
importantDates.push(new Date());
```

**When to use this?** - Any time we need to represent a collection of records with some arbitrary sort order

## 2.5 Tuples

**Tuples** - Array-like structure where each element represents some property of a record

**Examples**:

```ts
const pepsi: [string, boolean, number] = ["brown", true, 40];

// or using type aliases:
type Drink = [string, boolean, number];
const pepsi: Drink = ["brown", true, 40];
```

## 2.6 Interfaces

**Interfaces** - Creates a new type, describing the property names and values types of an object.

**Examples**:

```ts
interface Reportable {
  summary(): string;
}

const oldCivic = {
  name: "civic",
  year: new Date(),
  broken: true,
  summary() {
    return `
    Name: ${this.name}
    Year: ${this.year}
    Broken? ${this.broken}
    `;
  },
};

const drink = {
  color: "brown",
  carbonated: true,
  sugar: 40,
  summary(): string {
    return `My drink ahs ${this.sugar} grams of sugar`;
  },
};

const printSummary = (item: Reportable): void => {
  console.log(item.summary());
};

printSummary(oldCivic);
printSummary(drink);
```

**General Strategy for Reusable Code in TS (Why do we care?)**:

- Create functions that accepts arguments that are typed with interfaces
- Objects/classes can decide to 'implement' a given interface to work with a function

## 2.7 Classes

**Classes** - Blueprint to create an object with some fields (values) and methods (functions) to represent a "thing"

**Examples**:

```ts
class Vehicle {
  drive(): void {
    console.log("chugga chugga");
  }

  honk(): void {
    console.log("Beep");
  }
}

class Car extends Vehicle {
  drive(): void {
    console.log("vroom");
  }
}

const car = new Car();
car.drive();
car.honk();
```

**Modifiers**:

- public - this method can be called anywhere, anytime
- private - this method can only be called by other methods in THIS class
- protected - this method can be called by other methods in THIS class, or by other methods in CHILD classes

**Fields**:

```ts
class Vehicle {
  color: string;

  constructor(color: string) {
    this.color = color;
  }
}

// or use this shortcut:
class Vehicle {
  constructor(public color: string) {}
}
```

**Fields with Inheritance**:

```ts
class Vehicle {
  constructor(public color: string) {}

  protected honk(): void {
    console.log("Beep");
  }
}

class Car extends Vehicle {
  constructor(color: string, public wheels: number) {
    super(color);
  }

  private drive(): void {
    console.log(`vroom ${this.color}`);
  }

  startDrivingProcess(): void {
    this.drive();
    this.honk();
  }
}

const car = new Car("black", 4);
car.startDrivingProcess();
```

# 3. Using TS

## 3.1 Type Definition Files

```txt
           --- Type definition file ----> JS Library
Typescript --- Type definition file ----> JS Library
code       --- Type definition file ----> JS Library
```

**Definitely Typed Naming Scheme**

- `@types/{library_name}` (for example, `@types/faker`)

## 3.2 Typical Typescript File

```txt
interface definitions for working with this class
|
......
class definition
|
....
```

## 3.3 Initialize `tsconfig.json` file

`tsc --init`

## 3.4 Type Guards

- `typeof` - Narrow type of a value to a primitive type: `number | string | boolean | symbol`

-`instanceof` - Narrow down every other type of value - every other value that is created with a constructor function

---

## 3.5 Getter example

```ts
export class NumbersCollection {
  constructor(public data: number[]) {}

  get length(): number {
    return this.data.length;
  }

  compare(leftIndex: number, rightIndex: number): boolean {
    return this.data[leftIndex] > this.data[rightIndex];
  }

  swap(leftIndex: number, rightIndex: number): void {
    [this.data[leftIndex], this.data[rightIndex]] = [
      this.data[rightIndex],
      this.data[leftIndex],
    ];
  }
}
```

## 3.6 Abstract Classes

- Can't be used to create an object directly
- Only used as a parent class
- Can contain real implementation for some methods
- The implemented methods can refer to other methods that don't actually exist yet (we still have to provide names and types for the un-implemented methods)
- Can make child classes promise to implement some other methods

```ts
export interface Sortable {
  length: number;
  compare(leftIndex: number, rightIndex: number): boolean;
  swap(leftIndex: number, rightIndex: number): void;
}

export abstract class Sorter implements Sortable {
  abstract get length(): number;

  abstract compare(leftIndex: number, rightIndex: number): boolean;

  abstract swap(leftIndex: number, rightIndex: number): void;

  sort(): void {
    const { length } = this;

    for (let i = 0; i < length; i++) {
      for (let j = 0; j < length - i - 1; j++) {
        if (this.compare(j, j + 1)) {
          this.swap(j, j + 1);
        }
      }
    }
  }
}
```

---

## 3.7 Interfaces vs Abstract Classes

**Interfaces**:

- Sets up a contract between different classes
- Use when we have very different objects that we want to work together
- Promotes loose coupling

**Inheritance / Abstract Classes**:

- Sets up a contract between different classes
- Use when we are trying to build up a definition of an object
- Strongly couples classes together

## 3.8 Using Enums

**Enums**:

- Follow near-identical syntax rules as normal objects.
- Creates an object with the same keys and values when converted from TS to JS.
- Primary goal is to signal to other engineers that these are all closely related values.
- Use whenever we have a small fixed set of values that are all closely related and known at compile time.

**Example**:

```ts
enum MatchResult {
  HomeWin = "H",
  AwayWin = "A",
  Draw = "D",
}
```

**When to Use Enums**

Should we use an enum to represent...

- primary colors on a color picker? - Yes
- the set of movie categories on Netflix? - No
- the titles of all blog posts by a particular user? - No
- sizes of a drink on an ordering menu? - Yes
- all years since the year 1750? - No
- the 'read' status of a text message? - Yes

## 3.9 Type Assertions

**Example**:

```ts
enum MatchResult {
  HomeWin = "H",
  AwayWin = "A",
  Draw = "D",
}

read(): void {
  this.data = fs
    .readFileSync(this.filename, {
      encoding: "utf-8",
    })
    .split("\n")
    .map((row: string): string[] => row.split(","))
    .map((row: string[]): any => {
      return [
        dateStringToDate(row[0]),
        row[1],
        row[2],
        parseInt(row[3], 10),
        parseInt(row[4], 10),
        row[5] as MatchResult, // <--- type assertion
      ];
    });
}

```

## 3.10 Variable Types with Generics

**Generics**:

- Like function arguments, but for types in class/function definitions
- Allows us to define the type of a property/argument/return value at a future point
- Used heavily when writing reusable code

```ts
class HoldAnything<T> {
  data: T;

  add(a: T): T {
    return a;
  }
}

const holdNumber = new HoldAnything<number>();
const holdString = new HoldAnything<string>();
```

## 3.11 Inheritance vs Composition

- **Inheritance** - characterized by an **`is a`** relationship between two classes
- **Composition** - characterized by an **`has a`** relationship between two classes

**Example**: How to model a window?

1. Inheritance

- class Rectangle

  - height: number
  - width: number
  - area(): number

- class RectangleWindow extends Rectangle

  - open: boolean
  - toggleOpen(): void

- class Wall extends Rectangle

  - color: string

- but this can get ugly:

- class Circle

  - radius: number
  - area(): number

- class CircleWindow extends Circle
  - open: boolean
  - toggleOpen(): void

2. Composition

- class Rectangle implements Shape

- class Circle implements Shape

- class Wall

  - color: string
  - area(): number
  - dimenstions: Shape

- class Window
  - open: boolean
  - toggleOpen(): void
  - area(): number
  - dimensions: Shape

---

## 3.12 Type Inference with Generics

```ts
class ArrayOfAnything<T> {
  constructor(public collection: T[]) {}

  get(index: number): T {
    return this.collection[index];
  }
}

const arr = new ArrayOfAnything(["a", "b", "c"]);
```

---

## 3.13 Function Generics

```ts
function printAnything<T>(arr: T[]): void {
  for (let i = 0; i < arr.length; i++) {
    console.log(arr[i]);
  }
}

// if we don't want to rely on type inference
printAnything<string>(["a", "b", "c"]);
```

## 3.14 Generic Constraints

```ts
class Car {
  print() {
    console.log("I am a car");
  }
}

class House {
  print() {
    console.log("I am a house");
  }
}

interface Printable {
  print(): void;
}

function printHousesOrCars<T extends Printable>(arr: T[]): void {
  for (const item of arr) {
    item.print();
  }
}

printHousesOrCars([new House(), new House(), new Car()]);
printHousesOrCars<Car>([new Car(), new Car()]);
```

## 3.15 Two Important Rules

1. In TypeScript, strings can be types.
2. In JS (and therefore TS), all objects keys are strings.

## 3.16 Generics with Constraints Example

```ts
export class Attributes<T> {
  constructor(private data: T) {}

  // pəˈkyo͞olyər
  get<K extends keyof T>(key: K): T[K] {
    return this.data[key];
  }

  set(update: T): void {
    Object.assign(this.data, update);
  }
}
```

## 3.17 Shortened Passthrough Methods

ERROR:

```ts
class Engine {
  start() {
    console.log("start");
  }
}

class Car {
  engine: Engine;

  constructor() {
    this.engine = new Engine();
  }
  start = this.engine.start;
}
```

NO ERROR:

```ts
class Engine {
  start() {
    console.log("start");
  }
}

class Car {
  constructor(public engine: Engine) {}
  start = this.engine.start;
}
```

---

# 4. Typescript with JS Libraries

- Typescript has a distinct OOP style
- Many popular JS libs were written before JS had any solid idea of 'classes'
- Integrating TS with popular JS libs can be tough

**TS with JS Libs**:

- Use the lib normally, adding in basic type annotations where possible
- Use a TS adapter library that has helpers for using your lib with TS
- Twist your lib to work with TS classes

---

## 4.1 Issues with Type Definition Files

**Integration Issues**:

CONS:

- Type definition files alone can't espress what is going on in the JS world accurately (example: middleware) \*
- Type definition files provided to us aren't always accurate
- EXACERBATED BY THE TYPE DEFINITION FILE Inputs to a server (or any program with external inputs) are not guaranteed to exist, or be of the correct type

PROS:

- Addressing these type issues with Typescript can _force_ us to write better code

# 5. Decorators in Typescript

**Decorators**:

- Functions that can be used to modify/change/anything different properties/methods in the class
- Not the same as Javascript decorators
- Used inside/on classes only
- Understanding the order in which decorators are ran are the key to understand them
- Experimental!

inside tsconfig.json:

```json
{
  "compilerOptions": {
    ...
    "experimentalDecorators": true /* Enable experimental support for TC39 stage 2 draft decorators. */,
    "emitDecoratorMetadata": true , /* Emit design-type metadata for decorated declarations in source files. */
    ...
  }
}
```

example:

```ts
class Boat {
  color: string = "red";

  get formattedColor(): string {
    return `This boat color is ${this.color}`;
  }

  @testDecorator
  pilot(): void {
    console.log("swish");
  }
}

function testDecorator(target: any, key: string): void {
  console.log("Target:", target);
  console.log("Key:", key);
}
```

**Decorators on a property, method, accessor**:

- First argument is the **prototype** of the object
- Second argument is the key of the property/method/accessor on the object
- Third argument is the property descriptor
- Decorators are applied when the code for this class is ran (**not when an instance is created**)

**Property Descriptor for Methods**:

- writable -> whether or not this property can be changed
- enumerable -> whether or not this property get looped over by a 'for...in'
- value -> current value
- configurable -> property definition can be changed and property can be deleted

example:

```ts
class Boat {
  color: string = "red";

  get formattedColor(): string {
    return `This boat color is ${this.color}`;
  }

  @logError
  pilot(): void {
    throw new Error();
    console.log("swish");
  }
}

function logError(target: any, key: string, desc: PropertyDescriptor): void {
  const method = desc.value;

  desc.value = function () {
    try {
      method();
    } catch (error) {
      console.log("error");
    }
  };
}

new Boat().pilot();
```

## 4.1 Decorator Factories

```ts
class Boat {
  color: string = "red";

  get formattedColor(): string {
    return `This boat color is ${this.color}`;
  }

  @logError("custom error message goes here")
  pilot(): void {
    throw new Error();
    console.log("swish");
  }
}

function logError(errorMessage: string) {
  return function (target: any, key: string, desc: PropertyDescriptor): void {
    const method = desc.value;

    desc.value = function () {
      try {
        method();
      } catch (error) {
        console.log(errorMessage);
      }
    };
  };
}
```

## 4.2 Decorators Around Properties

- we CANNOT get direct access to property we're decorating
- the only argument that we get to our decorator is the actual prototype

## 4.3 Decorators Around Parameters

```ts
class Boat {
  color: string = "red";

  get formattedColor(): string {
    return `This boat color is ${this.color}`;
  }

  pilot(
    @parameterDecorator speed: string,
    @parameterDecorator generateWake: boolean
  ): void {
    if (speed === "fast") {
      console.log("swish");
    } else {
      console.log("nothing");
    }
  }
}

function parameterDecorator(target: any, key: string, index: number): void {
  console.log(key, index);
}
```

## 4.3 Decorators Around Class Definitions

```ts
@classDecorator
class Boat {
  @testDecorator
  color: string = "red";

  @testDecorator
  get formattedColor(): string {
    return `This boat color is ${this.color}`;
  }

  @logError("custom error message goes here")
  pilot(
    @parameterDecorator speed: string,
    @parameterDecorator generateWake: boolean
  ): void {
    // throw new Error();
    if (speed === "fast") {
      console.log("swish");
    } else {
      console.log("nothing");
    }
  }
}

function classDecorator(constructor: typeof Boat) {
  console.log(constructor);
}
```

## 4.4 TS decorators and Express

1. Node executes our code.
2. Class definition read in - decorators are executed.
3. Decorators associate route configuration info with the method by using metadata.
4. All method decorators run.
5. Class decorator of `@controller` runs last.
6. Class decorator reads metadata from each method, adds complete route definitions to router.

## 4.5 Metadata:

- Proposed feature to be added to Javascript (and thus, TS)
- Snippets of info that can be tied to a method, property, or class definition
- Can be used for super custom stuff
- Typescript will (optionally) provide type information as metadata
- Read adn written using the reflect-metadata package

MAKE SURE THAT:
inside tsconfig.json:

```json
{
  "compilerOptions": {
    ...
    "experimentalDecorators": true /* Enable experimental support for TC39 stage 2 draft decorators. */,
    "emitDecoratorMetadata": true , /* Emit design-type metadata for decorated declarations in source files. */
    ...
  }
}
```

```bash
npm install reflect-metadata
```

example:

```ts
import "reflect-metadata";

@printMetadata
class Plane {
  color: string = "red";

  @markFunction("HI THERE")
  fly(): void {
    console.log("vrrrrrr");
  }
}

function markFunction(secretInfo: string) {
  return function (target: Plane, key: string): void {
    Reflect.defineMetadata("secret", secretInfo, target, key);
  };
}

function printMetadata(target: typeof Plane) {
  for (const key in target.prototype) {
    const secret = Reflect.getMetadata("secret", target.prototype, key);
    console.log(secret);
  }
}
```

---

# 5. React & Typescript

TODO: research if `useState` is a wrapper over `useReducer`

## 5.1 Just in case (A brief sales pitch)

- Type checking at compile time is way better than things crashing or - worse - behaving unexpectedly at run time.
- You get a better development experience because autocomplete know more about what you're intending on doing.
- Large codebases stay more maintainable because you're able to put guardrails on how your code can be used.

## 5.2 Refactoring `PropTypes`

```tsx
type ControlPanelProps = {
  name: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
};

const ControlPanel = ({ name, onChange }: ControlPanelProps) => {
  return (
    <form
      className="bg-primary-50 flex flex-row gap-4 text-white"
      onSubmit={(event) => event.preventDefault()}
    >
      <div>
        <label className="font-bold">Your Name</label>
        <input
          type="text"
          name="name"
          className="w-full"
          value={name}
          onChange={onChange}
        />
      </div>
    </form>
  );
};

export default ControlPanel;
```

---

## 5.3 Typing `children`

```tsx
// type BoxProps = {
//   children: React.ReactNode;
// };

import { PropsWithChildren } from "react";

// alternatively, we have built-in PropsWithChildren:
type BoxProps = PropsWithChildren<{
  children?: React.ReactNode;
  style?: React.CSSProperties;
}>;

const Box = ({ children, style }: BoxProps) => {
  return (
    <section
      className="m-4"
      style={{ padding: "1rem", border: "5px solid purple", ...style }}
    >
      {children}
    </section>
  );
};

const Example = () => {
  return (
    <main className="m-8">
      <Box>
        Just a string.
        <p>Some HTML that is not nested.</p>
        <Box>
          <h2>Another React component with one child.</h2>
        </Box>
        <Box>
          <h2 className="mb-4">A nested React component with two children.</h2>
          <p>The second child.</p>
        </Box>
      </Box>
    </main>
  );
};

export default Example;
```

- `JSX.Element;` - This doesn't account for arrays (e.g multiple elements) at all
- `JSX.Element | JSX.Element[];` - This doesn't accept strings
- `React.ReactChildren;` - Not at even an appropriate type; It's a utility function
- `React.Child[];` - Accepts multiple children, but it doesn't accept a single child
- `React.ReactNode;` - Accepts everything

---

## 5.4 Built-in helpers for typing children in React

- `React.PropsWithChildren`
- `React.ComponentPropsWithoutRef`

```tsx
type ButtonProps = React.ComponentPropsWithoutRef<"button">;

const Button = ({ children, onClick, type }: ButtonProps) => {
  return (
    <button onClick={onClick} type={type}>
      {children}
    </button>
  );
};
```

- `FunctionalComponent<Props>` and React 18
- `React.HTMLProps`

---

## 5.5 Typing `useState`

```tsx
import { useEffect, useState } from "react";

const Counter = () => {
  const [count, setCount] = useState(0);

  const [draftCount, setDraftCount] = useState(0);

  useEffect(() => {
    setDraftCount(count);
  }, [count]);

  return (
    <section className="border-primary-500 flex w-2/3 flex-col items-center gap-8 border-4 bg-white p-8 shadow-lg">
      <h1>Days Since the Last Accident</h1>
      <p className="text-6xl">{count}</p>
      <div className="flex gap-2">
        <button onClick={() => setCount((count) => count - 1)}>
          ➖ Decrement
        </button>
        <button onClick={() => setCount(0)}>🔁 Reset</button>
        <button onClick={() => setCount((count) => count + 1)}>
          ➕ Increment
        </button>
      </div>
      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setCount(draftCount);
          }}
        >
          <input
            type="number"
            value={draftCount}
            onChange={(e) => setDraftCount(e.target.valueAsNumber)}
          />
          <button type="submit">Update Counter</button>
        </form>
      </div>
    </section>
  );
};

export default Counter;
```

---

**`useState`**

```tsx
export type Quote = {
  id: number;
  content: string;
  source?: string;
};

const Application = () => {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  // ...
};
```

```tsx
export type QuotesProps = {
  setQuotes: React.Dispatch<React.SetStateAction<Quote[]>>;
};
```

---

## 5.6 Typing Reducers

### 5.6.1 Refactoring from `useState` to `useReducer`

There are a few ways that we could do this:

- Just create a super simple reducer that receives a number and updates it accordingly. This is super similar to what we're doing with `useState`
- Create a dispatch actions like we typically see when using `useReducer`

<br>

**The simplest reducer**

```tsx
const reducer = (count: number, newValue: number) => {
  return newValue;
};

const [count, setCount] = useReducer(reducer, 0);
```

<br>

**Refactoring our reducer - Beginning**:

```tsx
type InitialState = {
  count: number;
  draftCount: string | number;
};

const initialState: InitialState = {
  count: 0,
  draftCount: 0,
};

const reducer = (state = initialState, action: any) => {
  console.log({ action });
  const { count, draftCount } = state;

  if (action.type === "increment") {
    const newCount = count + 1;
    return { count: newCount, draftCount: newCount };
  }

  if (action.type === "decrement") {
    const newCount = count - 1;
    return { count: newCount, draftCount: newCount };
  }

  if (action.type === "reset") {
    return { count: 0, draftCount: 0 };
  }

  if (action.type === "updateDraftCount") {
    console.log("updateDraftCount");
    return { count, draftCount: action.payload };
  }

  if (action.type === "updateCountFromDraft") {
    return { count: Number(draftCount), draftCount };
  }

  return state;
};

const Counter = () => {
  const [{ count, draftCount }, dispatch] = useReducer(reducer, initialState);
  // ...
};
```

<br>

**Refactoring our reducer - adding types to reducer actions, using `switch`**:

```tsx
type Action = {
  type: "increment" | "decrement" | "reset" | "updateCountFromDraft";
};

type ActionWithPayload = {
  type: "updateDraftCount";
  payload: number;
};

const reducer = (state = initialState, action: Action | ActionWithPayload) => {
  let { count, draftCount } = state;

  switch (action.type) {
    case "increment":
      count = count + 1;
      return { count, draftCount: count };

    case "decrement":
      count = count - 1;
      return { count, draftCount: count };

    case "reset":
      return { count: 0, draftCount: 0 };

    case "updateDraftCount":
      return { count, draftCount: action.payload };

    case "updateCountFromDraft":
      return { count: Number(draftCount), draftCount };
  }
};
```

```jsx
<input
  type="number"
  value={draftCount}
  onChange={(e) =>
    dispatch({
      type: "updateDraftCount",
      payload: e.target.valueAsNumber,
    })
  }
/>
```

---

### 5.6.2 Monstrosity reducer example:

color-reducer.ts:

```ts
import { rgb, hsl, hsv, cmyk } from "color-convert";

// ** some unrelated stuffs **
// Template Literal Types
type HexColor = `#${string}`;
const isHexColor = (s: string): s is HexColor => s.startsWith("#");

type RGBString = `rgb(${number}, ${number}, ${number})`;

type ColorFormats = "rgb" | "hex" | "hsl" | "hsv" | "cmyk";
type ActionTypes = `update-${ColorFormats}-color`;
// ** unrelated stuffs ends **

export type UpdateHexColorAction = {
  type: "update-hex-color";
  payload: {
    hexColor: string;
  };
};

export type UpdateRGBColorAction = {
  type: "update-rgb-color";
  payload: {
    rgb: [number, number, number];
  };
};

export type UpdateHSLColorAction = {
  type: "update-hsl-color";
  payload: {
    hsl: [number, number, number];
  };
};

export type UpdateHSVColorAction = {
  type: "update-hsv-color";
  payload: {
    hsv: [number, number, number];
  };
};

export type UpdateCMYKColorAction = {
  type: "update-cmyk-color";
  payload: {
    cmyk: [number, number, number, number];
  };
};

export type AdjustColorActions =
  | UpdateHexColorAction
  | UpdateRGBColorAction
  | UpdateHSLColorAction
  | UpdateHSVColorAction
  | UpdateCMYKColorAction;

type ColorState = {
  hexColor: string;
};

export const initialState: ColorState = {
  hexColor: "#BADA55",
};

export const colorReducer = (
  state: ColorState = initialState,
  action: AdjustColorActions
) => {
  if (action.type === "update-hex-color") {
    const { hexColor } = action.payload;
    return { ...state, hexColor };
  }

  if (action.type === "update-rgb-color") {
    const hexColor = "#" + rgb.hex(action.payload.rgb);
    return { ...state, hexColor };
  }

  if (action.type === "update-hsl-color") {
    const hexColor = "#" + hsl.hex(action.payload.hsl);
    return { ...state, hexColor };
  }

  if (action.type === "update-hsv-color") {
    const hexColor = "#" + hsv.hex(action.payload.hsv);
    return { ...state, hexColor };
  }

  if (action.type === "update-cmyk-color") {
    const hexColor = "#" + cmyk.hex(action.payload.cmyk);
    return { ...state, hexColor };
  }

  return state;
};
```

---

## 5.7 Context API

context.tsx:

```tsx
import { Dispatch, PropsWithChildren, useReducer } from "react";
import { createContext } from "react";

import {
  AdjustColorActions,
  colorReducer,
  initialState,
} from "./color-reducer";

type ColorContextState = {
  hexColor: string;
  dispatch: Dispatch<AdjustColorActions>;
};

export const ColorContext = createContext<ColorContextState>({
  hexColor: "#FFADEF",
} as ColorContextState);

export const ColorProvider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(colorReducer, initialState);
  const hexColor = state.hexColor;

  return (
    <ColorContext.Provider value={{ hexColor, dispatch }}>
      {children}
    </ColorContext.Provider>
  );
};
```

index.tsx:

```tsx
import { createRoot } from "react-dom/client";

import Application from "components/05-colors/application";
import { ColorProvider } from "components/05-colors/context";

const container = document.getElementById("root") as HTMLDivElement;
const root = createRoot(container);
root.render(
  <ColorProvider>
    <Application />
  </ColorProvider>
);
```

Application.tsx:

```tsx
import { useContext } from "react";

import { ColorContext } from "./context";

const Application = () => {
  const { hexColor, dispatch } = useContext(ColorContext);
  // ...
};
```

---

## 5.8 Utility Types (some of them)

### 5.8.1 `keyof`

```ts
type ObjectLiteralType = {
  first: 1;
  second: 2;
};

// Inferred Type: "first" | "second"
type Result = keyof ObjectLiteralType;
```

### 5.8.2 Getting The Type of a Single Key in an Object - index operator

```ts
type Obj = {
  0: "a";
  1: "b";
  prop0: "c";
  prop1: "d";
};

// Inferred Type: "c"
type Result0 = Obj["prop0"];

// Inferred Type: "a" | "b"
type Result1 = Obj[0 | 1];

// Inferred Type: "c" | "d"
type Result2 = Obj["prop0" | "prop1"];
```

### 5.8.3 What About Getting the Values?

```ts
type Obj = {
  a: "A";
  b: "B";
  c: number;
};

// Inferred Type: number | "A" | "B"
type Values = Obj[keyof Obj];
```

### 5.8.4 Unions

```ts
type A = "a" | "b" | "c";
type B = "b" | "c" | "d";

// Inferred Type: "a" | "b" | "c" | "d"
type Union = A | B;
```

### 5.8.5 Unions with Objects

```ts
type ObjectTypeA = {
  firstProp: number;
  sharedProp: string;
};

type ObjectTypeB = {
  secondProp: boolean;
  sharedProp: string;
};

type Union = ObjectTypeA | ObjectTypeB;
```

- You have to check for anything that is not shared between both

### 5.8.6 Intersections

```ts
type A = "a" | "b" | "c";
type B = "b" | "c" | "d";

// Inferred Type: "b" | "c"
type Intersection = A & B;
```

- Useful when trying to combine the props that you're going to use for a React component.

### 5.8.7 Conditionals

- Ternaries only.

```ts
type Wrap<T> = T extends { length: number } ? [T] : T;
```

```ts
type IsAssignableTo<A, B> = A extends B ? true : false;

// Type '123' is assignable to type 'number'
// Inferred Type: true
type Result1 = IsAssignableTo<123, number>;

// Type 'number' is not assignable to type '123'
// Inferred Type: false
type Result2 = IsAssignableTo<number, 123>;
```

### 5.8.8 `Exclude`

- Takes stuff out of a union. It's built into TypeScript.
- This is what if would look like if we wanted to implement it ourselves:

```ts
type Exclude<T, U> = T extends U ? never : T;

// Inferred Type: 1 | 2
type Result0 = Exclude<1 | 2 | 3, 2>;

// Inferred Type: "a" | "b"
type Result1 = Exclude<1 | "a" | 2 | "b", number>;

// Inferred Type: "a" | 2
type Result2 = Exclude<1 | "a" | 2 | "b", 1 | "b" | "c">;
```

### 5.8.9 `Extract`

- The opposite of `Exclude`

```ts
type Extract<T, U> = T extends U ? T : never;

// Inferred Type: 1 | 2
type Result1 = Extract<1 | "a" | 2 | "b", number>;

// Inferred Type: 1 | "b"
type Result2 = Extract<1 | "a" | 2 | "b", 1 | "b" | "c">;
```

### 5.8.10 Objects

```ts
type ObjectWithAKey = { a: string };
```

- We can also define a type for keys as well:

```ts
type ObjectWithStringKeys = { [key: string]: number };
```

- We can iterate over a union if we want:

```ts
// Inferred Type: { a: number; b: number; c: number }
type Result = {
  [K in "a" | "b" | "c"]: number;
};

type Mask = {
  [K in keyof ObjectLiteralType]: boolean;
};
```

### 5.8.11 `Pick`

```ts
type ObjectLiteralType = {
  john: 1;
  paul: 2;
  george: 3;
  ringo: 4;
};

// Inferred Type: { george: 2; ringo: 4;}
type Result = Pick<ObjectLiteralType, "george" | "ringo">;
```

### 5.8.12 `Omit`

```ts
type ObjectLiteralType = {
  john: 1;
  paul: 2;
  george: 3;
  ringo: 4;
};

// Inferred Type: { john: 1; paul: 2;}
type Result = Omit<ObjectLiteralType, "george" | "ringo">;
```

### 5.8.13 String Manipulation Utilities

```ts
type UppercaseWes = Uppercase<"wes">;
type LowercaseWes = Lowercase<"Wes">;
type CapitalizeWes = Capitalize<"wes">;
type UncapitalizeWes = Uncapitalize<"Wes">;
```

## 5.9 Generics (recap + for Context API)

### 5.9.1 Examples

```ts
type Link<T> = {
  value: T;
  next: Link<T>;
};

const Link: Link<string> = { value: "hello" };

function identity<T>(arg: T) {
  return arg;
}

identity<number>(3);
```

---

```ts
type LinkNode<T> = {
  value: T;
  next?: LinkNode<T>;
};

const TextNode: LinkNode<string> = {
  value: "twenty-three",
  next: {
    value: "forty-six",
  },
};

const createLink = <T>(value: T): LinkNode<T> => {
  return {
    value,
  };
};

const stringNode = createLink("hi");
const anotherNode = createLink(38);
```

<br>

**use with arrow functions**:

- we need a weird comma if JSX is enabled otherwise the compiler gets confused as the whether or not you're writing the opening tag for JSX or a generic.

```ts
const createNode = <T>(value: T): Link<T> => ({ value });

const addNext = <T>(node: Link<T>, value: T): Link<T> => {
  node.next = createNode(value);
  return node;
};

const createNodeAndNext = <T>(first: T, second: T) => {
  const firstNode = createNode(first);
  firstNode.next = createNode(second);
  return firstNode;
};

const createNodeAndNextTapped = <T>(first: T, second: T): Link<T> =>
  tap(createNode(first), (node) => addNext(node, second));

const node = createNode(4);
const nextNode = addNext(node, 5);
const twoNodes = createNodeAndNextTapped(1, 2);
const towMoreNodes = createNodeAndNext(4, 5);
```

<br>

**another example**:

```ts
type User = {
  firstName: string;
  lastName: string;
  age: number;
};

type ActionTypes = `update-${keyof User}`;

type Actions<T, K extends keyof T & string> = {
  type: `update-${K}`;
  payload: T[K];
};

// T - type we're passing in
// K (which stands for key) need to be one of the key of T

type UpdateNameAction = Actions<User, "firstName">;
```

### 5.9.2 Create Context with Generics

create-context.tsx:

```ts
import React from "react";

export const createContext = <T extends {}>() => {
  const Context = React.createContext<T | undefined>(undefined);

  const useContext = () => {
    const ctx = React.useContext(Context);

    if (ctx === undefined) {
      throw new Error(
        `useContext must be inside a Provider and a value must be provided.`
      );
    }

    return ctx;
  };

  return [useContext, Context.Provider] as const;
};
```

### 5.9.3 use a Custom `createContext` (from 5.9.2)

(color app example)

context.tsx:

```tsx
import { Dispatch, PropsWithChildren, useReducer } from "react";

import { createContext } from "./create-context";

import {
  AdjustColorActions,
  colorReducer,
  initialState,
} from "./color-reducer";

type ColorContextState = {
  hexColor: string;
  dispatch: Dispatch<AdjustColorActions>;
};

export const [useContext, ContextProvider] = createContext<ColorContextState>();

export const ColorProvider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(colorReducer, initialState);
  const hexColor = state.hexColor;

  return (
    <ContextProvider value={{ hexColor, dispatch }}>{children}</ContextProvider>
  );
};
```

- now we must use our `useContext` that encapsulates our context (in this example ColorContext)

application.tsx:

```tsx
import { useContext } from './context';

const Application = () => {
  // using OUR useContext
  const { hexColor, dispatch } = useContext();
  //...
```

- we might also think about implementing custom hooks:

hooks.ts:

```ts
import { useCallback, useMemo } from "react";
import { useContext } from "./context";

export const useDispatch = () => {
  const { dispatch } = useContext();

  return useMemo(() => dispatch, [dispatch]);
};

export const useHexColor = () => {
  const { hexColor } = useContext();
  return useMemo(() => hexColor, [hexColor]);
};

export const useUpdateHexCode = () => {
  const dispatch = useDispatch();
  return useCallback(
    (hexColor: string) =>
      dispatch({
        type: "update-hex-color",
        payload: {
          hexColor,
        },
      }),
    [dispatch]
  );
};

export const useUpdateRGB = () => {
  const dispatch = useDispatch();
  return useCallback(
    (rgb: [number, number, number]) =>
      dispatch({
        type: "update-rgb-color",
        payload: {
          rgb,
        },
      }),
    [dispatch]
  );
};

export const useUpdateHSL = () => {
  const dispatch = useDispatch();
  return useCallback(
    (hsl: [number, number, number]) =>
      dispatch({
        type: "update-hsl-color",
        payload: {
          hsl,
        },
      }),
    [dispatch]
  );
};

export const useUpdateHSV = () => {
  const dispatch = useDispatch();
  return useCallback(
    (hsv: [number, number, number]) =>
      dispatch({
        type: "update-hsv-color",
        payload: {
          hsv,
        },
      }),
    [dispatch]
  );
};

export const useUpdateCMYK = () => {
  const dispatch = useDispatch();
  return useCallback(
    (cmyk: [number, number, number, number]) =>
      dispatch({
        type: "update-cmyk-color",
        payload: {
          cmyk,
        },
      }),
    [dispatch]
  );
};
```

### 5.9.4 Autocomplete

as an example:

```ts
type LabeledInputProps = ComponentPropsWithoutRef<"input"> & {
  id?: string;
  label: string;
  value: string | number;
  type?: string;
  className?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
};
```

## 5.10 Polymorphic Components

- As an example, let's have a look at the design system called Paste. The foundational component was `Box`:

```jsx
<Box as="article" backgroundColor="colorBackgroundBody" padding="space60">
  Parent box on the hill side
  <Box
    backgroundColor="colorBackgroundSuccessWeakest"
    display="inline-block"
    padding="space40"
  >
    nested box 1 made out of ticky tacky
  </Box>
</Box>
```

- Box is a primitive wrapper around the basic block elements in HTML (e.g. div, aside, section, article, main, head, etc.). But, like we don't want to lose all of our semantic meaning that we get from all of these tags, but we also don't need like 20 variation on Box that are all basically the same. What we'd like to is use Box but also be able to specify what it ought to be under the hood.

- Here's an overly-simplified take on a `Box` element inspired:

```ts
import { PropsWithChildren } from "react";

type BoxProps = PropsWithChildren<{
  as: "div" | "section" | "article" | "p";
}>;

const Box = ({ as, children }: BoxProps) => {
  const TagName = as || "div";
  return <TagName>{children}</TagName>;
};

export default Box;
```

<br>

```ts
type BoxProps = ComponentPropsWithRef<"div"> & {
  as: "div" | "section" | "article" | "p";
};

const Box = ({ as, children }: BoxProps) => {
  const TagName = as || "div";
  return <TagName>{children}</TagName>;
};
```

<br>

- probably, not:

```ts
type ComponentPropsWithRef<T extends ElementType> = T extends new (
  props: infer P
) => Component<any, any>
  ? PropsWithoutRef<P> & RefAttributes<InstanceType<T>>
  : PropsWithRef<ComponentProps<T>>;
```

<br>

```ts
import { ComponentPropsWithoutRef, PropsWithChildren } from "react";

type ButtonType = "a" | "button";

type ButtonProps<T extends ButtonType, E = ComponentPropsWithoutRef<T>> = {
  as?: T;
} & PropsWithChildren<E>;

const Button = <T extends ButtonType = "button">({
  as,
  ...props
}: ButtonProps<T>): JSX.Element => {
  if (as === "a") {
    return <a {...props}>{props.children}</a>;
  }
  return <button {...props}>{props.children}</button>;
};

const Example = () => {
  return (
    <div>
      <Button type="submit">Hello</Button>
      <Button href="http://wow.com">Link</Button>
    </div>
  );
};

export default Example;
```
