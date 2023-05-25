---
title: "Getting started with Testing Library"
description: "Complete introduction into testing with Testing Library."
author: Ivan O
authorImage: https://images.unsplash.com/photo-1509396591411-549811e332fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80
coverImage: /images/notes/testing-library-getting-started.jpg
date: "2023-02-12"
---

- [1. Our tools:](#1-our-tools)
  - [1.1 Overview](#11-overview)
  - [1.2 Example](#12-example)
- [2. Introduction into Testing with Testing Library](#2-introduction-into-testing-with-testing-library)
  - [2.1 Test Writing Process](#21-test-writing-process)
  - [2.2 React Testing Library Query System](#22-react-testing-library-query-system)
  - [2.3 Understanding ARIA Roles](#23-understanding-aria-roles)
  - [2.4 Matchers](#24-matchers)
  - [2.5 Mock Functions](#25-mock-functions)
  - [2.6 Querying Elements by Labels](#26-querying-elements-by-labels)
  - [2.7 Getting Help with Query Functions](#27-getting-help-with-query-functions)
  - [2.8 Query Function Escape Hatches](#28-query-function-escape-hatches)
- [3. Understanding Element Roles](#3-understanding-element-roles)
  - [3.1 Some very common elements (and their roles)](#31-some-very-common-elements-and-their-roles)
  - [3.2 Finding by Accessible Names](#32-finding-by-accessible-names)
  - [3.3 Linking Inputs to Labels](#33-linking-inputs-to-labels)
  - [3.4 Directly Assigning an Accessible Name](#34-directly-assigning-an-accessible-name)
- [4. Finding Elements with Query Functions](#4-finding-elements-with-query-functions)
  - [4.1 Introducing Query Functions](#41-introducing-query-functions)
  - [4.2 Looking for a Single Element?](#42-looking-for-a-single-element)
  - [4.3 Looking for Multiple Elements?](#43-looking-for-multiple-elements)
  - [4.4 When to Use Each](#44-when-to-use-each)
- [5. Query Function Suffixes](#5-query-function-suffixes)
  - [5.1 Querying for Elements With Different Criteria](#51-querying-for-elements-with-different-criteria)
  - [5.2 When to Use Each](#52-when-to-use-each)
- [6. Matchers, custom matcher](#6-matchers-custom-matcher)
- [7. Fixing Bugs...](#7-fixing-bugs)
  - [7.1 Course of Actions](#71-course-of-actions)
  - [7.2 Finding Relevant ag-chart-components-wrapper](#72-finding-relevant-ag-chart-components-wrapper)
  - [7.3 Understanding the database-icon](#73-understanding-the-database-icon)
  - [7.4 Use Flexible Queries](#74-use-flexible-queries)
- [8. 'Act' Function](#8-act-function)
  - [8.1 Important Items:](#81-important-items)
  - [8.2 Test written without RTL:](#82-test-written-without-rtl)
  - [8.3 Act Included with RTL](#83-act-included-with-rtl)
  - [8.4 Options for Solving Act Warnings (Best to Worst)](#84-options-for-solving-act-warnings-best-to-worst)
- [9. Handling Data Fetching in test](#9-handling-data-fetching-in-test)
  - [9.1 Options for Data Fetching](#91-options-for-data-fetching)
  - [9.2 msw Library](#92-msw-library)
  - [9.3 msw Example](#93-msw-example)
  - [9.4 an Issue with Fake Handlers \& Reusable `createServer` function](#94-an-issue-with-fake-handlers--reusable-createserver-function)
- [10. Tests Around Authentication](#10-tests-around-authentication)
  - [10.1 Options for Debugging Tests:](#101-options-for-debugging-tests)
  - [10.2 Setting Up a Debugger](#102-setting-up-a-debugger)

# 1. Our tools:

## 1.1 Overview

| **Library**                   | **Purpose**                                             |
| ----------------------------- | ------------------------------------------------------- |
| `@testing-library/react`      | Uses ReactDOM to render a component for testing         |
| `@testing-library/user-event` | Helps simulate user input like typing and clicking      |
| `@testing-library/dom`        | Helps find elements that are rendered by our components |
| `jest`                        | Runs our tests, reports results                         |
| `jsdom`                       | Simulates a browser when running in a Node environment  |

Jest finds all files in the `src` folder that:

- end with `.spec.js`
- end with `.test.js`
- are placed in a folder called `__test__`

## 1.2 Example

```js
import { render, screen, waitFor } from "@testing-library/react";
import user from "@testing-library/user-event";
import App from "./App";

test("show 6 products by default", async () => {
  render(<App />);

  const headings = await screen.findAllByRole("heading");
  expect(headings).toHaveLength(6);
});

test("clicking on the button loads 6 more products", async () => {
  render(<App />);

  const button = await screen.findByRole("button", {
    name: /load more/i,
  });

  await user.click(button);

  await waitFor(async () => {
    const headings = await screen.findAllByRole("heading");
    expect(headings).toHaveLength(12);
  });
});
```

# 2. Introduction into Testing with Testing Library

## 2.1 Test Writing Process

1. Pick out one component to test all by itself.
2. Make a test file for the component if one does not exist.
3. Decide what the important parts of the component are.
4. Write a test to make sure each part works as expected.
5. Run tests at the command line.

## 2.2 React Testing Library Query System

- collection of ~48 functions that are used to find elements

- for example: `screen.getByRole()`, `screen.queryByRole()`, `screen.findAllByTitle()`, `screen.findAllByDiplayValue()`, `screen.findByRole()`, `screen.findByTitle()`, `screen.queryAllByRole()`, `screen.queryByLabelText()`, `screen.getByLabelText()`, and so on.

## 2.3 Understanding ARIA Roles

- ARIA Roles clarify the purpose of an HTML element
- Traditionally used by screen readers
- Many HTML elements have an 'implicit', or automatically assigned, role
- Elements can be assigned manually assigned a role.

for example:

- aria role: 'heading' -> `h1`, `h2`, ..., `h6`
- aria role: 'list' -> `ul`, `li`, ...
- aria role: 'button' -> `button`
- 'link' -> `a`
- 'textbox' -> `input type="text"`

## 2.4 Matchers

**some matchers from Jest**:

- `expect([...]).toHaveLength(2)`
- `expect(5).toEqual(5)`
- `expect(['a', 'b', 'c']).toContain('b')`
- `expect(fn).toThrow()`
- `expect(mock).toHaveBeenCalled()`

**some matchers from RTL**:

- `expect(element).toBeInTheDocument()`
- `expect(element).toBeEnabled()` (makes sure an element (like an input) is not disabled)
- `expect(element).toHaveClass()` (makes sure an element has a class name)
- `expect(element).toHaveTextContent()`
- `expect(element).toHaveValue()`
  these are from jest-dom

## 2.5 Mock Functions

- Fake function that doesn't do anything
- Records whenever if gets called, and the arguments it was called with
- Used very often when we need to make sure a component calls a callback

example:

```js
test('it calls "onUserAdd" when the form is submitted', async () => {
  const mock = jest.fn();
  // try to render my component
  render(<UserForm onUserAdd={mock} />);

  // ...

  // assertion to make use 'onUserAdd' gets called
  expect(mock).toHaveBeenCalled();
  expect(mock).toHaveBeenCalledWith({ name: "Jonny", email: "jonny@test.com" });
});
```

## 2.6 Querying Elements by Labels

```html
<label htmlFor="email">Enter Email</label> <input id="email" />
```

```js
screen.getByLabelText(/enter email/i);
screen.getByRole("textbox", { name: /enter email/i });
```

## 2.7 Getting Help with Query Functions

- To get help with finding a particular element, use `screen.logTestingPlaygroundURL()`
- Takes the HTML currently rendered by your component and creates a link to view that HTML in the 'Testing Playground' tool
- Testing Playground helps you write queries

## 2.8 Query Function Escape Hatches

- Sometimes finding elements by role just doesn't work well
- Two 'escape hatches' - ways to find elements when the preferred 'role' approach doens't work:

1. `data-testid`

example:

```jsx
// ....
return (
  <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Email</th>
      </tr>
    </thead>
    <tbody data-testid="users">{renderedUsers}</tbody>
  </table>
);
```

```js
import { render, screen, within } from "@testing-library/react";
import UserList from "./UserList";

test("it should render one row per user", () => {
  const users = [
    { name: "jane", email: "jane@jane.com" },
    { name: "sam", email: "sam@jane.com" },
  ];
  render(<UserList users={users} />);
  const rows = within(screen.getByTestId("users")).getAllByRole("row");
  expect(rows).toHaveLength(2);
});
```

2. `container.querySelector()`

```js
test("it should render one row per user", () => {
  const users = [
    { name: "jane", email: "jane@jane.com" },
    { name: "sam", email: "sam@jane.com" },
  ];
  // eslint-disable-next-line testing-library/no-container
  const { container } = render(<UserList users={users} />);
  const rows = container.querySelectorAll("tbody tr");
  expect(rows).toHaveLength(2);
});
```

# 3. Understanding Element Roles

## 3.1 Some very common elements (and their roles)

```jsx
<div>
  <a href="/">Link</a>
  <button>Button</button>
  <footer>ContentInfo</footer>
  <h1>Heading</h1>
  <header>Banner</header>
  <img alt="description" /> Img
  <input type="checkbox" /> Checkbox
  <input type="number" /> Spinbutton
  <input type="radio" /> Radio
  <input type="text" /> Textbox
  <li>ListItem</li>
  <ul>List</ul>
</div>
```

```js
test("can find elements by role", () => {
  render(<RoleExample />);

  const roles = [
    "link",
    "button",
    "contentinfo",
    "heading",
    "banner",
    "img",
    "checkbox",
    "spinbutton",
    "radio",
    "textbox",
    "listitem",
    "list",
  ];

  for (const role of roles) {
    const el = screen.getByRole(role);
    expect(el).toBeInTheDocument();
  }
});
```

## 3.2 Finding by Accessible Names

```jsx
function AccessibleName() {
  return (
    <div>
      <button>Submit</button>
      <button>Cancel</button>
    </div>
  );
}

render(<AccessibleName />);
```

```js
test("can select by accessible name", () => {
  render(<AccessibleName />);

  const submitButton = screen.getByRole("button", { name: /submit/i });
  const cancelButton = screen.getByRole("button", { name: /cancel/i });

  expect(submitButton).toBeInTheDocument();
  expect(cancelButton).toBeInTheDocument();
});
```

## 3.3 Linking Inputs to Labels

```jsx
function MoreNames() {
  return (
    <div>
      <label htmlFor="email">Email</label>
      <input id="email" />

      <label htmlFor="search">Search</label>
      <input id="search" />
    </div>
  );
}
```

```js
test("shows an email and search input", () => {
  render(<MoreNames />);

  const emailInput = screen.getByRole("textbox", { name: /email/i });
  const searchInput = screen.getByRole("textbox", { name: /search/i });

  expect(emailInput).toBeInTheDocument();
  expect(searchInput).toBeInTheDocument();
});
```

## 3.4 Directly Assigning an Accessible Name

```jsx
function IconButtons() {
  return (
    <div>
      <button aria-label="sign in">
        <svg />
      </button>

      <button aria-label="sign out">
        <svg />
      </button>
    </div>
  );
}
```

```js
test("find elements based on label", () => {
  render(<IconButtons />);

  const signInButton = screen.getByRole("button", { name: /sign in/i });
  const signOutButton = screen.getByRole("button", { name: /sign out/i });

  expect(signInButton).toBeInTheDocument();
  expect(signOutButton).toBeInTheDocument();
});
```

# 4. Finding Elements with Query Functions

## 4.1 Introducing Query Functions

- All query functions are accessed through the `screen` object in a test.
- they always begin with `getBy`, `getAllBy`, `queryBy`, `queryByAll`, `findBy`, `findAllBy`.

These names indicate:

1. Whether the function will return an element or an array of elements.
2. What happens if the function finds 0, 1, or > 1 of the targeted elements.
3. Whether the function runs instantly (sync) or looks for an elements over a span of time (async)

## 4.2 Looking for a Single Element?

```jsx
function ColorList() {
  return (
    <ul>
      <li>Red</li>
      <li>Blue</li>
      <li>Green</li>
    </ul>
  );
}
```

```js
test("getBy, queryBy, findBy finding 0 elements", async () => {
  render(<ColorList />);

  // getBy
  expect(() => screen.getByRole("textbox")).toThrow();

  // queryBy
  expect(screen.queryByRole("textbox")).toBeNull();

  // findBy
  let errorThrown = false;
  try {
    await screen.findByRole("textbox");
  } catch (err) {
    errorThrown = true;
  }
  expect(errorThrown).toBeTruthy();
});

test("getBy, queryBy, findBy finding 1 element", async () => {
  render(<ColorList />);

  // getBy
  expect(screen.getByRole("list")).toBeInTheDocument();

  // queryBy
  expect(screen.queryByRole("list")).toBeInTheDocument();

  // findBy
  expect(await screen.findByRole("list")).toBeInTheDocument();
});

test("getBy, queryBy, findBy finding > 1 elements", async () => {
  render(<ColorList />);

  // getBy
  expect(() => screen.getByRole("listitem")).toThrow();

  // queryBy
  expect(() => screen.queryByRole("listitem")).toThrow();

  // findBy
  let errorThrown = false;
  try {
    await screen.findByRole("listitem");
  } catch (err) {
    errorThrown = true;
  }
  expect(errorThrown).toBeTruthy();
});
```

| Name    | 0 matches | 1 match | > 1 match | Notes                                          |
| ------- | --------- | ------- | --------- | ---------------------------------------------- |
| getBy   | Throw     | Element | Throw     |                                                |
| queryBy | null      | Element | Throw     |                                                |
| findBy  | Throw     | Element | Throw     | Looks for an element over the span of 1 second |

## 4.3 Looking for Multiple Elements?

```js
test("getAllBy, queryAllBy, findAllBy", async () => {
  render(<ColorList />);

  // getAllBy
  expect(screen.getAllByRole("listitem")).toHaveLength(3);

  // queryAllBy
  expect(screen.queryAllByRole("listitem")).toHaveLength(3);

  // findAllBy
  expect(await screen.findAllByRole("listitem")).toHaveLength(3);
});
```

| Name       | 0 matches | 1 match   | > 1 match | Notes                                        |
| ---------- | --------- | --------- | --------- | -------------------------------------------- |
| getAllBy   | Throw     | []Element | []Element |                                              |
| queryAllBy | [ ]       | []Element | []Element |                                              |
| findAllBy  | Throw     | []Element | []Element | Looks for elements over the span of 1 second |

## 4.4 When to Use Each

| Goal of test                           | Use                 |
| -------------------------------------- | ------------------- |
| Prove an element exists                | getBy, getAllBy     |
| Prove an element does **not** exist    | queryBy, queryAllBy |
| Make sure an element eventually exists | findBy, findAllBy   |

```js
test("favor using getBy to prove an element exists", () => {
  render(<ColorList />);
  const element = screen.getByRole("list");
  expect(element).toBeInTheDocument(); // pointless assertion
});

test("favor queryBy when proving an element does NOT exist", () => {
  render(<ColorList />);
  const element = screen.queryByRole("textbox");
  expect(element).not.toBeInTheDocument();
});
```

// findBy:

```jsx
import { useState, useEffect } from "react";

function fakeFetchColors() {
  return Promise.resolve(["red", "green", "blue"]);
}

function LoadableColorList() {
  const [colors, setColors] = useState([]);

  useEffect(() => {
    fakeFetchColors().then((c) => setColors(c));
  }, []);

  const renderedColors = colors.map((color) => {
    return <li key={color}>{color}</li>;
  });

  return <ul>{renderedColors}</ul>;
}

render(<LoadableColorList />);
```

```js
test("favor findBy or findAllBy when data fetching", async () => {
  render(<LoadableColorList />);

  const els = await screen.findAllByRole("listitem");

  expect(els).toHaveLength(3);
});
```

# 5. Query Function Suffixes

## 5.1 Querying for Elements With Different Criteria

React Testing Library provides many different query functions. Each begins with a name like `getBy`, `findBy`, etc. The names also have common endings. The different name endings indicate how the query for an element will be performed.

| End of Function Name | Search Criteria                                                    |
| -------------------- | ------------------------------------------------------------------ |
| ByRole               | Finds elements based on their implicit or explicit ARIA role       |
| ByLabelText          | Find form elements based upon the text their paired labels contain |
| ByPlaceholderText    | Find form elements based upon their placeholder text               |
| ByText               | Find elements based upon the text they contain                     |
| ByDisplayValue       | Find elements based upon their current value                       |
| ByAltText            | Find elements based upon their `alt` attribute                     |
| ByTitle              | Find elements based upon their `title` attribute                   |
| ByTestId             | Find elements based upon their `data-testid` attribute             |

## 5.2 When to Use Each

Always prefer using query functions ending with `ByRole`. Only use others if `ByRole` is not an option.

```jsx
import { screen, render } from "@testing-library/react";
import { useState } from "react";

function DataForm() {
  const [email, setEmail] = useState("asdf@asdf.com");

  return (
    <form>
      <h3>Enter Data</h3>

      <div data-testid="image wrapper">
        <img alt="data" src="data.jpg" />
      </div>

      <label htmlFor="email"></label>
      <input
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <label htmlFor="color">Color</label>
      <input id="color" placeholder="Red" />

      <button title="Click when ready to submit">Submit</button>
    </form>
  );
}

render(<DataForm />);
```

```js
test("selecting different elements", () => {
  render(<DataForm />);

  const elements = [
    screen.getByRole("button"),
    screen.getByLabelText("Email"),
    screen.getByPlaceholderText("Red"),
    screen.getByText("Enter Data"),
    screen.getByDisplayValue("asdf@asdf.com"),
    screen.getByAltText("data"),
    screen.getByTitle("Click when ready to submit"),
    screen.getByTestId("image wrapper"),
  ];

  for (const element of elements) {
    expect(element).toBeInTheDocument();
  }
});
```

# 6. Matchers, custom matcher

- Matchers help make sure that a value is what we expect it to be.

```jsx
function FormData() {
  return (
    <div>
      <button>Go Back</button>
      <form aria-label="form">
        <button>Save</button>
        <button>Cancel</button>
      </form>
    </div>
  );
}
```

```js
function toContainRole(container, role, quantity = 1) {
  const elements = within(container).queryAllByRole(role);

  if (elements.length === quantity) {
    return {
      pass: true,
    };
  }

  return {
    pass: false,
    message: () =>
      `Expected to find ${quantity} ${role} elements. Found ${elements.length} instead.`,
  };
}

expect.extend({ toContainRole });
```

```js
test("the form displays two buttons", () => {
  render(<FormData />);

  const form = screen.getByRole("form");

  expect(form).toContainRole("link", 10);
});
```

# 7. Fixing Bugs...

## 7.1 Course of Actions

1. Find the relevant components in the codebase.
2. Figure out how the component is getting its data/state/props.
3. Use a debugger, console.log, or documentation to understand the data.
4. Implement a fix. (or write test first, then fix)
5. Test the fix.

## 7.2 Finding Relevant ag-chart-components-wrapper

1. React Developer Tools.
2. Search the codebase for text/icons/classnames that the component is producing.
3. IF an error is being thrown, look at the stack trace.3
4. Ask another engineer.

## 7.3 Understanding the database-icon

1. Set a `console.log` to print out the data.
2. Set a debugger and manually inspect the data.
3. Use a React Developer Tools to view the props/state.
4. Watch network request log and inspect the API responses.

## 7.4 Use Flexible Queries

```js
test("displays information about the repository", () => {
  const repository = {
    language: "Javascript",
    stargazers_count: 5,
    forks: 30,
    open_issues: 1,
  };
  render(<RepositoriesSummary repository={repository} />);

  for (const key in repository) {
    const value = repository[key];
    const element = screen.getByText(new RegExp(value));
    expect(element).toBeInTheDocument();
  }
});
```

# 8. 'Act' Function

- Testing usually requires you to have a deep understanding of the libraries your project uses.
- Some of these libraries don't like to be used in a test environment.

for example,
**Some react-router-dom stuff**:

- `BrowserRouter` -> Stores current URL in the address bar
- `HashRouter` -> Stores current URL in the # part of the address bar
- `MemoryRouter` -> Stores current URL in memory, **many** blog posts recommend using this for tesing purposes.

## 8.1 Important Items:

1. Unexpected state updates in tests are bad.
2. The act function defines a window in time where state updates can (and should) occur.
3. React Testing Library uses 'act' behind the scenes for you!
4. To solve act warnings, you should use a `findBy`. **Usually** you don't want to follow the advice of the warning.

## 8.2 Test written without RTL:

- tells our tests that we expect state to be changed because of this
- React will process all state updates + useEffects before exiting the 'act'

```js
import { render } from 'react-dom';
import { act } from 'react-dom/test-utils';

test('clicking the button loads users', () => {
  act(() => {
    render(<UserList />, container);
  });

  const button = document.querySelector('button');
  await act(async () => {
    button.dispatch(new MouseEvent('click'));
  });

  const users = document.querySelectorAll('li');
  expect(users).toHaveLength(3);
});
```

## 8.3 Act Included with RTL

Automatically call 'act' for us, this is the preferred way of using 'act' when using RTL:

- `screen.findBy...`
- `screen.findAllBy...`
- `waitFor`
- `user.keyboard`
- `user.click`

## 8.4 Options for Solving Act Warnings (Best to Worst)

1. Use a `findBy` and `findAllBy` to detect when the component has finished its data fetching.
2. Use an `act` to control whene the data-fetching request gets resolved.
3. Use a module mock to avoid rendering the troublesome component.
4. Use an `act` with a `pause`

# 9. Handling Data Fetching in test

- We don't want our components to make actual network requests
- Slow! Data might change!
- We fake (or **mock**) data fetching in tests.

## 9.1 Options for Data Fetching

1. Mock the file that contains the data fetching code.
2. Use a library to 'mock' axios - get axios to return fake data.
3. Create a manual mock for axios.

## 9.2 msw Library

**MSW Setup**:

1. Create a test file.
2. Understanding the exact URL, method, and return value of requests that your component will make.
3. Create a MSW handler to intercept that request and return some fake data for you component to use.
4. Set up the `beforAll`, `afterEach` and `afterAll` hooks in your test file.
5. In a test, render the component. Wait for an element to be visible.

## 9.3 msw Example

```js
import { render, screen } from "@testing-library/react";
import { setupServer } from "msw/node";
import { rest } from "msw";
import { MemoryRouter } from "react-router";
import HomeRoute from "./HomeRoute";

const handlers = [
  rest.get("/api/repositories", (req, res, ctx) => {
    const language = req.url.searchParams.get("q").split("language:")[1];

    return res(
      ctx.json({
        items: [
          {
            id: 1,
            full_name: `${language}_one`,
          },
          {
            id: 2,
            full_name: `${language}_two`,
          },
        ],
      })
    );
  }),
];

const server = setupServer(...handlers);

beforeAll(() => {
  server.listen();
});

afterEach(() => {
  server.resetHandlers();
});

afterAll(() => {
  server.close();
});

test("renders two links for each language", async () => {
  render(
    <MemoryRouter>
      <HomeRoute />
    </MemoryRouter>
  );

  // loop over each language
  const languages = [
    "javascript",
    "typescript",
    "rust",
    "go",
    "python",
    "java",
  ];
  // for each language, make sure we see 2 links
  for (const language of languages) {
    const links = await screen.findAllByRole("link", {
      name: new RegExp(`${language}_`),
    });

    expect(links).toHaveLength(2);
    expect(links[0]).toHaveTextContent(`${language}_one`);
    expect(links[1]).toHaveTextContent(`${language}_two`);
    expect(links[0]).toHaveAttribute("href", `/repositories/${language}_one`);
    expect(links[1]).toHaveAttribute("href", `/repositories/${language}_two`);
  }
});
```

## 9.4 an Issue with Fake Handlers & Reusable `createServer` function

- Common pattern - handlers defined in one place, used by several tests
- **Downside** - if all handlers are defined in the same place, then all tests will be locked into getting the same responses

**Reusable Create Server Function**

src/test.server.js:

```js
import { setupServer } from "msw/lib/node";
import { rest } from "msw";

export function createServer(handlerConfig) {
  const handlers = handlerConfig.map((config) => {
    return rest[config.method || "get"](config.path, (req, res, ctx) => {
      return res(ctx.json(config.res(req, res, ctx)));
    });
  });

  const server = setupServer(...handlers);

  beforeAll(() => {
    server.listen();
  });

  afterEach(() => {
    server.resetHandlers();
  });

  afterAll(() => {
    server.close();
  });
}
```

# 10. Tests Around Authentication

## 10.1 Options for Debugging Tests:

1. Use `test.only` or `describe.only` to limit the number of tests executed.
2. Set up a debugger.
3. Classic console.log's.

## 10.2 Setting Up a Debugger

- Add the following script to `package.json`: `react-scripts --inspect-brk test --runInBand --no-cache`
- Add a `debugger` statement somewhere in your tests or component.
- Use a `test.only` or `describe.only` to limit the tests executed.
- run the above script command
- navigate to `about:inspect` in your browser
