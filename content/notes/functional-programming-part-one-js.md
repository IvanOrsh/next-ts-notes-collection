---
title: "Functional Programming in JavaScript: Part One"
description: "Brief overview of partial application / currying, composition, functors and monads."
author: Ivan O
authorImage: https://images.unsplash.com/photo-1509396591411-549811e332fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80
coverImage: https://plus.unsplash.com/premium_photo-1661882369766-ff5d3440771c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80
date: "2021-12-15"
---

- [1. Intro](#1-intro)
- [2 Currying](#2-currying)
  - [2.1 Properties, Arguments \& Currying](#21-properties-arguments--currying)
  - [2.2 Currying example \& Argument Order](#22-currying-example--argument-order)
  - [2.3 Ramda Generalized Currying, Point-Free Programming](#23-ramda-generalized-currying-point-free-programming)
  - [2.4 Exercises:](#24-exercises)
  - [2.5 Partial Application vs Currying](#25-partial-application-vs-currying)
- [3. Composition](#3-composition)
  - [3.1 Composition Intro](#31-composition-intro)
  - [3.2 Creating Programs with Curry \& Compose](#32-creating-programs-with-curry--compose)
  - [3.3 Composition is Dot Chaining](#33-composition-is-dot-chaining)
  - [3.4 Logging in Composition](#34-logging-in-composition)
  - [3.5 Exercises](#35-exercises)
- [4. Functors TODO: ask about monads](#4-functors-todo-ask-about-monads)
  - [4.1 Creating an Identity Functor](#41-creating-an-identity-functor)
  - [4.2 Refactoring for Dot Chaining](#42-refactoring-for-dot-chaining)
  - [4.3 Exercises](#43-exercises)
  - [4.4 Adding Chain for Nested Functors](#44-adding-chain-for-nested-functors)
- [5. Either Monad](#5-either-monad)
  - [5.1 Either Monad](#51-either-monad)
  - [5.2 `fromNullable`](#52-fromnullable)
  - [5.3 Refactoring Using the Either Monad](#53-refactoring-using-the-either-monad)
  - [5.4 Flattening Either Monad with Chain](#54-flattening-either-monad-with-chain)
  - [5.5 Exercises](#55-exercises)
  - [5.6 Debugging with Logging](#56-debugging-with-logging)
- [6. Task](#6-task)
  - [6.1 Task Monad](#61-task-monad)
  - [6.2 Refactoring Node IO with Task](#62-refactoring-node-io-with-task)
  - [6.3 Exercises](#63-exercises)
  - [6.4 Transform \& Monad Patterns TODO: natural transformation](#64-transform--monad-patterns-todo-natural-transformation)

# 1. Intro

- Every **function** is a **single-valued** collection of pairs
  - one input, one output, domain - range

<br>

- Functions:
  - Total: for every input there is a corresponding output
  - Deterministic: always receive the same output given the same input
  - No Observable Side-Effects

<br>

- Why?
  - Reliable
  - Portable
  - Reusable
  - Testable
  - Composable
  - Properties / Contract

# 2 Currying

## 2.1 Properties, Arguments & Currying

```js
// association
add(add(x, y), z) === add(x, add(x, y));

// commutative
add(x, y) === add(y, x);

// identity
add(x, 0) === x;

// distributive
add(multiply(x, y), multiply(x, z)) === multiply(x, add(y, z));
```

- two pairs:

```js
const add = (x, y) => x + y;

add([1, 2]);
add(1, 2);

const toPair =
  (f) =>
  ([x, y]) =>
    f(x, y);

const fromPair = (f) => (x, y) => f([x, y]);

const result = fromPair(toPair(add))(1, 2);
```

- flip:

```js
const flip = (f) => (a, b) => f(b, a);
```

- curry:

```js
const curry = (func, ...args) => {
  const numReqArgs = func.length;

  return (...args2) => {
    const current = [...args, ...args2];

    if (current.length >= numReqArgs) {
      return func(...current);
    }

    return curry(func, ...current);
  };
};

const example = (a, b, c, d) => a + b + c + d;

assert.strictEqual(curry(example)(1)(2)(3)(4), 10);
```

## 2.2 Currying example & Argument Order

```js
import assert from "node:assert";

// this one doesn't need to be curried
function filter(predicate, list) {
  if (arguments.length === 1) {
    return (list) => filter(predicate, list);
  }

  const output = new list.constructor();
  const keys = Object.keys(list);
  const isArray = Array.isArray(list);

  keys.forEach((key) => {
    if (predicate(list[key])) {
      if (isArray) {
        output.push(list[key]);
      } else {
        output[key] = list[key];
      }
    }
  });

  return output;
}

const curry = (func, ...args) => {
  const numReqArgs = func.length;

  return (...args2) => {
    const current = [...args, ...args2];

    if (current.length >= numReqArgs) {
      return func(...current);
    }

    return curry(func, ...current);
  };
};

// example (imagine, that our filter needs to be curried)

const modulo = curry((x, y) => y % x);

const isOdd = modulo(2);

// const curriedFilter = curry(filter);

const getOdds = filter(isOdd);

assert.deepEqual(getOdds([1, 2, 3, 4, 5, 6, 7]), [1, 3, 5, 7]);
```

## 2.3 Ramda Generalized Currying, Point-Free Programming

- **Point-free programming**, also known as tacit programming or sometimes "pointless" programming, is a style of programming where functions are defined without explicitly mentioning their arguments. Instead, functions are defined in terms of other functions, using function composition and other higher-order functions to combine and transform data.

- In point-free programming, functions are treated as mathematical objects that can be manipulated and composed in various ways. This allows for more concise and modular code that is often easier to reason about and maintain.

```js
import { curry } from "ramda";

const replace = curry((regex, replacement, str) =>
  str.replace(regex, replacement)
);

const replaceVowels = replace(/[AEIOU]/gi, "!");

console.log(
  replaceVowels("Example string, where all vowels should be replaced")
);
```

## 2.4 Exercises:

```js
const { curry, map, filter, reduce, test } = require("ramda");

// ex1
const split = curry((delimiter, string) => string.split(delimiter));

const words = split(" ");

QUnit.test("Ex1: split", (assert) => {
  assert.deepEqual(words("Jingle bells Batman smells"), [
    "Jingle",
    "bells",
    "Batman",
    "smells",
  ]);
});

// ex2: use map to make a new words fn that works with an array of string
const sentences = map(words);

QUnit.test("Ex2: map/split", (assert) => {
  assert.deepEqual(
    sentences(["Jingle bells Batman smells", "Robin laid an egg"]),
    [
      ["Jingle", "bells", "Batman", "smells"],
      ["Robin", "laid", "an", "egg"],
    ]
  );
});

// ex3: filter
const filterQs = filter(test(/q/gi));

QUnit.test("Ex3: filter", (assert) => {
  assert.deepEqual(filterQs(["quick", "camels", "quarry", "over", "quails"]), [
    "quick",
    "quarry",
    "quails",
  ]);
});

// ex4: use _keepHighest to refactor max
const _keepHighest = (x, y) => (x >= y ? x : y);

const max = reduce(_keepHighest, 0); // don't forget about initial!

QUnit.test("Ex4: reduce", (assert) => {
  assert.deepEqual(max([323, 523, 123, 5234]), 5234);
});

// ex5: wrap array's slice to be functional and curried
const slice = curry((start, end, xs) => xs.slice(start, end));

QUnit.test("Ex5: slice", (assert) => {
  assert.deepEqual(slice(1)(3)(["a", "b", "c"]), ["b", "c"]);
});

// ex6: use slice to define a function take() that takes n elements from an array, make it curried
const take = slice(0);

QUnit.test("Ex6: take", (assert) => {
  assert.deepEqual(take(3)(["1", "2", "3", "4", "5"]), ["1", "2", "3"]);
});
```

## 2.5 Partial Application vs Currying

partial with placeholder (`__`):

```js
// placeholder
export const __ = Symbol("some empty thing here");
const isPlaceholder = (a) => a === __;
const notPlaceholder = (a) => !isPlaceholder(a);
const removePlaceholders = (a) => filter(notPlaceholder, a);

export function map(transformer, list) {
  if (arguments.length === 1) {
    return (list) => map(transformer, list);
  }

  const output = new list.constructor();
  const keys = Object.keys(list);
  const isArray = Array.isArray(list);

  keys.forEach((key) => {
    if (isArray) {
      output.push(transformer(list[key]));
    } else {
      output[key] = transformer(list[key]);
    }
  });

  return output;
}

export function partial(func, ...args) {
  const numReqArgs = func.length;

  return function _partial(...args2) {
    const filledIn = map(
      (x) => (isPlaceholder(x) && args2.length ? args2.shift() : x),
      args
    );

    const current = [...filledIn, ...args2];
    const validArgs = removePlaceholders(current);

    if (validArgs.length >= numReqArgs) {
      return func(...validArgs);
    }

    // still need more args
    return partial(func, ...current);
  };
}
```

# 3. Composition

## 3.1 Composition Intro

```js
const { curry, compose } = require("ramda");

const add = (x, y) => x + y;

const toUpper = (str) => str.toUpperCase();
const exclaim = (str) => str + "!";
const first = (xs) => xs[0];

// const compose = (f, g) => x => f(g(x));

const shoutOne = compose(first, compose(exclaim, toUpper));

// compose is associative:
const shoutTow = compose(compose(first, exclaim), toUpper);

const shout = compose(first, exclaim, toUpper);

console.log(shout("tears")); // T
```

## 3.2 Creating Programs with Curry & Compose

```js
const doStuff = _.compose(
  join(""),
  _.filter((x) => x.length > 3),
  reverse,
  _.map(trim),
  split(" "),
  toLowerCase
);
```

## 3.3 Composition is Dot Chaining

compare with example above (3.2)

```js
const doStuff = (str) =>
  str
    .toLowerCase()
    .split(" ")
    .map((c) => c.trim())
    .reverse()
    .filter((x) => x.length > 3)
    .join("");
```

## 3.4 Logging in Composition

```js
import { apply, compose, tap, prepend, reduce } from "ramda";

const trace = tap(console.log.bind(console));

compose.clog = compose(
  apply(compose),
  prepend(trace),
  reduce((acc, fn) => acc.concat(fn, trace), []),
  Array
);

export { compose };
```

## 3.5 Exercises

```js
const R = require("ramda");
const { compose } = require("../utils/compose");
const { formatMoney } = require("accounting");

// Example Data
const CARS = [
  { name: "Ferrari FF", horsepower: 660, dollar_value: 700000, in_stock: true },
  {
    name: "Spyker C12 Zagato",
    horsepower: 650,
    dollar_value: 648000,
    in_stock: false,
  },
  {
    name: "Jaguar XKR-S",
    horsepower: 550,
    dollar_value: 132000,
    in_stock: false,
  },
  { name: "Audi R8", horsepower: 525, dollar_value: 114200, in_stock: false },
  {
    name: "Aston Martin One-77",
    horsepower: 750,
    dollar_value: 1850000,
    in_stock: true,
  },
  {
    name: "Pagani Huayra",
    horsepower: 700,
    dollar_value: 1300000,
    in_stock: false,
  },
];

// Ex 1: use R.compose() to rewrite the function below
const isLastInStock = compose(R.prop("in_stock"), R.last);

QUnit.test("Ex1: isLastInStock", (assert) => {
  assert.deepEqual(isLastInStock(CARS), false);
});

// Ex 2: retrieve the name of the first car
const nameOfFirstCar = compose(R.prop("name"), R.head);

QUnit.test("Ex2: nameOfFirstCar", (assert) => {
  assert.equal(nameOfFirstCar(CARS), "Ferrari FF");
});

// Ex 3: refactor averageDollarValue
const avg = (xs) => R.reduce(R.add, 0, xs) / R.length(xs);

const averageDollarValue = compose(avg, R.map(R.prop("dollar_value")));

QUnit.test("Ex3: averageDollarValue", (assert) => {
  assert.equal(averageDollarValue(CARS), 790700);
});

// Ex 4: Write a function: sanitizeNames using compose that
// returns a list of lowercase and underscored names
const underscore = R.replace(/\W+/g, "_");

const sanitize = R.compose(underscore, R.toLower, R.prop("name"));

const sanitizeNames = R.map(sanitize);

QUnit.test("Ex4: sanitizeNames(CARS)", (assert) => {
  assert.deepEqual(sanitizeNames(CARS), [
    "ferrari_ff",
    "spyker_c12_zagato",
    "jaguar_xkr_s",
    "audi_r8",
    "aston_martin_one_77",
    "pagani_huayra",
  ]);
});

// Bonus 1:
// ============
// Refactor availablePrices with compose.

const availablePrices = compose(
  R.join(", "),
  R.map(R.compose(formatMoney, R.prop("dollar_value"))),
  R.filter(R.propEq(true, "in_stock"))
);

QUnit.test("Bonus 1: availablePrices", (assert) => {
  assert.deepEqual(availablePrices(CARS), "$700,000.00, $1,850,000.00");
});

// Bonus 2:
// ============
// Refactor to pointfree.

const fastestCar = compose(
  R.concat(R.__, " is the fastest"),
  R.prop("name"),
  R.last,
  R.sortBy(R.prop("horsepower"))
);

QUnit.test("Bonus 2: fastestCar", (assert) => {
  assert.equal(fastestCar(CARS), "Aston Martin One-77 is the fastest");
});
```

# 4. Functors TODO: ask about monads

## 4.1 Creating an Identity Functor

```js
// Box is a functor, because it has 'map'
const Box = (x) => ({
  map: (f) => Box(f(x)),
  fold: (f) => f(x),
  inspect: `Box(${x})`,
});

// original
const nextCharForNumberString_ = (str) => {
  const trimmed = str.trim();
  const number = parseInt(trimmed);
  const nextNumber = number + 1;
  return String.fromCharCode(nextNumber);
};

// refactored
const nextCharForNumberString = (str) =>
  Box(str)
    .map((str) => str.trim())
    .map((trimmed) => parseInt(trimmed, 10))
    .map((number) => new Number(number + 1))
    .fold((number) => String.fromCharCode(number));

const result = () => nextCharForNumberString("  64  ");

console.log(result());
```

## 4.2 Refactoring for Dot Chaining

```js
const Box = (x) => ({
  map: (f) => Box(f(x)),
  fold: (f) => f(x),
  toString: `Box(${x})`,
});

const first = (xs) => xs[0];

// original
const halfTheFirstLargeNumber_ = (xs) => {
  const found = xs.filter((x) => x >= 20);
  const answer = first(found) / 2;
  return `The answer is ${answer}`;
};

// compose it terms of Box
const compose = (f, g) => (x) => Box(x).map(g).map(f);

const halfTheFirstLargeNumber = (xs) =>
  Box(xs)
    .map((x) => xs.filter((x) => x >= 20))
    .map((found) => first(found))
    .fold((answer) => `The answer is ${answer}`);

const res = halfTheFirstLargeNumber([1, 4, 50]);

console.log(res);
```

## 4.3 Exercises

```js
const Box = (x) => ({
  map: (f) => Box(f(x)),
  fold: (f) => f(x),
  toString: () => `Box(${x})`,
});

// Exercise: Box
// Goal: Refactor each example using Box
// Keep these tests passing!
// Bonus points: no curly braces

// Ex1: Using Box, refactor moneyToFloat to be unnested.
// =========================
const moneyToFloat = (str) =>
  Box(str)
    .map((str) => str.replace(/\$/, ""))
    .fold((str) => parseFloat(str));

QUnit.test("Ex1: moneyToFloat", (assert) => {
  assert.equal(String(moneyToFloat("$5.00")), 5);
});

// Ex2: Using Box, refactor percentToFloat to remove assignment
// =========================
const percentToFloat = (str) =>
  Box(str)
    .map((str) => str.replace(/\$/, ""))
    .map((str) => parseFloat(str))
    .fold((number) => number * 0.01);

QUnit.test("Ex2: percentToFloat", (assert) => {
  assert.equal(String(percentToFloat("20%")), 0.2);
});

// Ex3: Using Box, refactor applyDiscount (hint: each variable introduces a new Box)
// =========================
const applyDiscount = (price, discount) =>
  Box(moneyToFloat(price)).fold((cents) =>
    Box(percentToFloat(discount)).fold((savings) => cents - cents * savings)
  );

const applyDiscount_ = (price, discount) => {
  const cents = moneyToFloat(price);
  const savings = percentToFloat(discount);
  return cents - cents * savings;
};

QUnit.test("Ex3: Apply discount", (assert) => {
  assert.equal(String(applyDiscount("$5.00", "20%")), 4);
});
```

## 4.4 Adding Chain for Nested Functors

```js
const Box = (x) => ({
  map: (f) => Box(f(x)),
  chain: (f) => f(x), // chain is exactly fold
  fold: (f) => f(x),
  toString: () => `Box(${x})`,
});

const moneyToFloat = (str) =>
  Box(str)
    .map((str) => str.replace(/\$/, ""))
    .fold((str) => parseFloat(str));

const percentToFloat = (str) =>
  Box(str)
    .map((str) => str.replace(/\$/, ""))
    .map((str) => parseFloat(str))
    .fold((number) => number * 0.01);

const applyDiscount = (price, discount) =>
  Box(moneyToFloat(price))
    .chain(
      (cents) =>
        Box(percentToFloat(discount)) // chain or flatMap
          .map((savings) => cents - cents * savings) // Box(Box(x))
    )
    .fold((x) => x);

console.log(String(applyDiscount("$5.00", "20%"))); // 4
```

# 5. Either Monad

## 5.1 Either Monad

```js
// Definitions:
// Either

const Right = (x) => ({
  chain: (f) => f(x),
  map: (f) => Right(f(x)),
  fold: (f, g) => g(x),
  toString: `Right(${x})`,
});

const Left = (x) => ({
  chain: (f) => Left(x),
  map: (f) => Left(x),
  fold: (f, g) => f(x),
  toString: `Left(${x})`,
});

const fromNullable = (x) => (x != null ? Right(x) : Left(null));

const findColor = (name) => {
  const found = {
    red: "#ff4444",
    blue: "#3b5998",
    yellow: "#fff68f",
  }[name];

  return found ? Right(found) : Left("missing");
};

const res = () =>
  findColor("red")
    .map((x) => x.toUpperCase())
    .fold(
      () => "no color!",
      (color) => color
    );

console.log(res());
```

## 5.2 `fromNullable`

```js
const Right = (x) => ({
  chain: (f) => f(x),
  map: (f) => Right(f(x)),
  fold: (f, g) => g(x),
  toString: `Right(${x})`,
});

const Left = (x) => ({
  chain: (f) => Left(x),
  map: (f) => Left(x),
  fold: (f, g) => f(x),
  toString: `Left(${x})`,
});

const fromNullable = (x) => (x != null ? Right(x) : Left(null));

const findColor = (name) =>
  fromNullable(
    {
      red: "#ff4444",
      blue: "#3b5998",
      yellow: "#fff68f",
    }[name]
  );
```

## 5.3 Refactoring Using the Either Monad

```js
const fs = require("fs");

const Right = (x) => ({
  chain: (f) => f(x),
  map: (f) => Right(f(x)),
  fold: (f, g) => g(x),
  toString: `Right(${x})`,
});

const Left = (x) => ({
  chain: (f) => Left(x),
  map: (f) => Left(x),
  fold: (f, g) => f(x),
  toString: `Left(${x})`,
});

const fromNullable = (x) => (x != null ? Right(x) : Left(null));

const tryCatch = (f) => {
  try {
    return Right(f());
  } catch (e) {
    return Left(e);
  }
};

const getPort_ = () => {
  try {
    const str = fs.readFileSync("config.json");
    const config = JSON.parse(str);
    return config.port;
  } catch (e) {
    return 3000;
  }
};

const readFileSync = (path) => tryCatch(() => fs.readFileSync(path));

const getPort = () =>
  readFileSync("config.json")
    .map((contents) => JSON.parse(contents))
    .map((config) => config.port)
    .fold(
      () => 3000,
      (x) => x
    );

const result = getPort();

console.log(result);
```

- so there is no possibility to call our functions without try / catch

## 5.4 Flattening Either Monad with Chain

```js
const fs = require("fs");

const Right = (x) => ({
  chain: (f) => f(x),
  map: (f) => Right(f(x)),
  fold: (f, g) => g(x),
  toString: `Right(${x})`,
});

const Left = (x) => ({
  chain: (f) => Left(x),
  map: (f) => Left(x),
  fold: (f, g) => f(x),
  toString: `Left(${x})`,
});

const fromNullable = (x) => (x != null ? Right(x) : Left(null));

const tryCatch = (f) => {
  try {
    return Right(f());
  } catch (e) {
    return Left(e);
  }
};

const readFileSync = (path) => tryCatch(() => fs.readFileSync(path));

const parseJSON = (contents) => tryCatch(() => JSON.parse(contents));

const getPort = () =>
  readFileSync("config.json")
    .chain((contents) => parseJSON(contents)) // chain
    .map((config) => config.port)
    .fold(
      () => 3000,
      (x) => x
    );

const result = getPort();

console.log(result);
```

## 5.5 Exercises

```js
// Definitions
// ====================
const Right = (x) => ({
  chain: (f) => f(x),
  map: (f) => Right(f(x)),
  fold: (f, g) => g(x),
  toString: () => `Right(${x})`,
});

const Left = (x) => ({
  chain: (f) => Left(x),
  map: (f) => Left(x),
  fold: (f, g) => f(x),
  toString: () => `Left(${x})`,
});

const fromNullable = (x) => (x != null ? Right(x) : Left(null));

const tryCatch = (f) => {
  try {
    return Right(f());
  } catch (e) {
    return Left(e);
  }
};

const logIt = (x) => {
  console.log(x);
  return x;
};

const DB_REGEX = /postgres:\/\/([^:]+):([^@]+)@.*?\/(.+)$/i;

// Exercise: Either
// Goal: Refactor each example using Either
// Bonus: no curlies
// =========================

// Ex1: Refactor streetName to use Either instead of nested if's
// =========================
const street = (user) =>
  fromNullable(user.address) // Right / Left (address)
    .map((address) => address.street)
    .fold(
      () => "no street",
      (x) => x
    );

const street_ = (user) => {
  const address = user.address;

  return address ? address.street : "no street";
};

QUnit.test("Ex1: street", (assert) => {
  const user = { address: { street: { name: "Willow" } } };
  assert.deepEqual(street(user), { name: "Willow" });
  assert.equal(street({}), "no street");
});

// Ex1: Refactor streetName to use Either instead of nested if's
// =========================
const streetName = (user) =>
  fromNullable(user)
    .chain((user) => fromNullable(user.address)) // Right / Left (address)
    .chain((address) => fromNullable(address.street))
    .map((street) => street.name)
    .fold(
      () => "no street",
      (x) => x
    );

const streetName_ = (user) => {
  const address = user.address;

  if (address) {
    const street = address.street;

    if (street) {
      return street.name;
    }
  }

  return "no street";
};

QUnit.test("Ex1: streetName", (assert) => {
  const user = { address: { street: { name: "Willow" } } };
  assert.equal(streetName(user), "Willow");
  assert.equal(streetName({}), "no street");
  assert.equal(streetName({ address: { street: null } }), "no street");
});

// Ex2: Refactor parseDbUrl to return an Either instead of try/catch
// =========================
const parseDbUrl = (cfg) =>
  Right(cfg)
    .chain((c) => tryCatch(() => JSON.parse(cfg)))
    .map((c) => c.url.match(DB_REGEX))
    .fold(
      () => null,
      (x) => x
    );

const parseDbUrl_ = (cfg) => {
  try {
    const c = JSON.parse(cfg); // throws if it can't parse
    return c.url.match(DB_REGEX);
  } catch (e) {
    return null;
  }
};

QUnit.test("Ex1: parseDbUrl", (assert) => {
  const config = '{"url": "postgres://sally:muppets@localhost:5432/mydb"}';
  assert.equal(parseDbUrl(config)[1], "sally");
  assert.equal(parseDbUrl(), null);
});

// Ex3: Using Either and the functions above, refactor startApp
// =========================
const startApp = (cfg) =>
  fromNullable(parseDbUrl(cfg))
    .map(([_, user, password, db]) => `starting ${db}, ${user}, ${password}`)
    .fold(
      () => "can't get config",
      (x) => x
    );

const startApp_ = (cfg) => {
  const parsed = parseDbUrl(cfg);

  if (parsed) {
    const [_, user, password, db] = parsed;
    return `starting ${db}, ${user}, ${password}`;
  } else {
    return "can't get config";
  }
};

QUnit.test("Ex3: startApp", (assert) => {
  const config = '{"url": "postgres://sally:muppets@localhost:5432/mydb"}';
  assert.equal(String(startApp(config)), "starting mydb, sally, muppets");
  assert.equal(String(startApp()), "can't get config");
});
```

## 5.6 Debugging with Logging

```js
const logIt = (x) => {
  console.log(x);
  return x;
};

const startApp = (cfg) =>
  fromNullable(parseDbUrl(cfg))
    .map(([_, user, password, db]) => `starting ${db}, ${user}, ${password}`)
    .map(logIt)
    .fold(
      () => "can't get config",
      (x) => x
    );
```

# 6. Task

## 6.1 Task Monad

```js
const Task = (fork) => ({
  fork,
  ap: (other) =>
    Task((rej, res) => fork(rej, (f) => other.fork(rej, (x) => res(f(x))))),
  map: (f) => Task((rej, res) => fork(rej, (x) => res(f(x)))),
  chain: (f) => Task((rej, res) => fork(rej, (x) => f(x).fork(rej, res))),
  concat: (other) =>
    Task((rej, res) =>
      fork(rej, (x) =>
        other.fork(rej, (y) => {
          console.log("X", x, "Y", y);
          res(x.concat(y));
        })
      )
    ),
  fold: (f, g) =>
    Task((rej, res) =>
      fork(
        (x) => f(x).fork(rej, res),
        (x) => g(x).fork(rej, res)
      )
    ),
});
Task.of = (x) => Task((rej, res) => res(x));
Task.rejected = (x) => Task((rej, res) => rej(x));
Task.fromPromised =
  (fn) =>
  (...args) =>
    Task((rej, res) =>
      fn(...args)
        .then(res)
        .catch(rej)
    );
```

usage:

```js
Task.of(2).map((two) => two + 1);

// Task takes reject and resolve, just like Promise BUT WITH
// FLIPPED ARGUMENTS
const t1 = Task((rej, res) => res(2))
  .map((two) => two + 1)
  .map((three) => three * 2);

// to run (like fold, but we call it fork)
t1.fork(console.error, console.log);
```

## 6.2 Refactoring Node IO with Task

```js
const fs = require("fs");

const { Task } = require("./utils/types");

// original:
const app_ = () => {
  fs.readFile("config.json", "utf-8", (err, contents) => {
    console.log(err, contents);
    if (err) throw err;

    const newContents = contents.replace(/3/g, "6");

    fs.writeFile("config1.json", newContents, (err, _) => {
      if (err) throw err;
      console.log("success!");
    });
  });
};

// refactored:

const readFile = (path, enc) =>
  Task((rej, res) =>
    fs.readFile(path, enc, (err, contents) => (err ? rej(err) : res(contents)))
  );

const writeFile = (path, contents) =>
  Task((rej, res) =>
    fs.writeFile(path, contents, (err, _) => (err ? rej(err) : res(contents)))
  );

const app = () =>
  readFile("config.json", "utf-8") // Task(contents)
    .map((contents) => contents.replace(/3/g, "6"))
    .chain((newContents) => writeFile("config1.json", newContents));

app().fork(console.error, () => console.log("success!"));
```

## 6.3 Exercises

```js
// SETUP
// =========================
const { Task } = require("../utils/types");

const posts = { 1: { title: "First" }, 2: { title: "Second" } };

const comments = {
  First: [{ id: 1, body: "Brilliant!" }],
  Second: [{ id: 2, body: "Unforgivable" }],
};

const getPost = (id) =>
  Task((rej, res) =>
    setTimeout(() => (posts[id] ? res(posts[id]) : rej("not found")), 200)
  );

const getComments = (post) =>
  Task((rej, res) => setTimeout(() => res(comments[post.title]), 200));

// Exercise: Task
// Goal: Refactor each example using Task
// Bonus points: no curly braces

// Ex1: Use the result of getPost() and upperCase the title. Posts and comments are defined above and look like {title: String} and {id: Int, body: String} respectively.
// =========================
const postTitle = (
  id // uppercase the title of the result of getPost()
) => getPost(id).map((post) => post.title.toUpperCase());

QUnit.test("Ex1: postTitle", (assert) => {
  const done = assert.async();
  postTitle(1).fork(console.error, (t) => {
    assert.deepEqual(t, "FIRST");
    done();
  });
});

// Ex2: pass in the post to getComments(), defined above, then assign the returned comments to the post
// =========================
const commentsForPost = (id) =>
  getPost(id) // Task(post)
    .chain((post) =>
      getComments(post) // Task(comments)
        .map((comments) => Object.assign({ comments }, post))
    );

QUnit.test("Ex2: commentsForPost", (assert) => {
  const done = assert.async();
  commentsForPost(2).fork(console.error, (t) => {
    assert.deepEqual(t.title, "Second");
    assert.deepEqual(t.comments, comments["Second"]);
    done();
  });
});

// Ex3: Wrap location.href in a Task to make it "pure"
// =========================
const getHref = () => Task((rej, res) => res(location.href));

QUnit.test("Ex3: getHref", (assert) => {
  const done = assert.async();
  getHref().fork(console.error, (t) => {
    assert.equal(true, !!t.match("cdpn.io"));
    done();
  });
});
```

## 6.4 Transform & Monad Patterns TODO: natural transformation

```js
const fs = require("fs");

const { List, Map } = require("immutable-ext");

const { Task, Either, Id } = require("./utils/types");
const { Right, Left, fromNullable } = Either;

// 1.
const httpGet = (path, params) => Task.of(`${path}: result`);

const getUser = (x) => httpGet("/user", { id: x });
const getTimeline = (x) => httpGet(`/timeline/${x}`, {});
const getAds = () => httpGet("/ads", {});

List([getUser, getTimeline, getAds])
  .traverse(Task.of, (f) => f())
  .fork(console.error, (x) => console.log(x.toJS())); // [ '/user: result', '/timeline/undefined: result', '/ads: result' ]

// 2.
const greaterThat5 = (x) =>
  x.length > 5 ? Right(x) : Left("not greater than 5");

const looksLikeEmail = (x) =>
  x.match(/@/gi) ? Right(x) : Left("not an email");

const email = "blahh@yadda.com";
List([greaterThat5, looksLikeEmail])
  .traverse(Either.of, (v) => v(email))
  .fold(console.error, (x) => console.log(x.toJS()));

// 3.

// natural transformation

// law of natural transformation:
// nt(a.map(f)) == nt(a).map(f)

// F a -> T a
const eitherToTask = (e) => e.fold(Task.rejected, Task.of);

const fake = (id) => ({ id: id, name: "user1", best_friend_id: id + 1 });

const Db = {
  find: (id) =>
    Task((rej, res) =>
      setTimeout(() => res(id > 2 ? Right(fake(id)) : Left("not found")), 100)
    ),
};

const send = (code, json) =>
  console.log(`sending ${code}: ${JSON.stringify(json)}`);

Db.find(3) // Task(Either(user))
  .chain(eitherToTask) // Task(User)
  .chain((u) => Db.find(u.best_friend_id))
  .chain(eitherToTask)
  .fork(
    (error) => send(500, { error }),
    (u) => send(200, u)
  );
```
