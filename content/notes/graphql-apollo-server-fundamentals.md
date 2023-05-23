---
title: "GraphQL: Fundamentals"
description: "Getting started with GraphQL"
author: Ivan O
authorImage: https://images.unsplash.com/photo-1509396591411-549811e332fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80
coverImage: https://images.unsplash.com/photo-1597733336794-12d05021d510?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80
date: "2022-10-15"
---

- [1. Intro: What is GraphQL:](#1-intro-what-is-graphql)
  - [1.1 More on GraphQL vs REST](#11-more-on-graphql-vs-rest)
- [2. Fundamentals](#2-fundamentals)
  - [2.1 Apollo Server (straight from docs)](#21-apollo-server-straight-from-docs)
    - [2.1.1 Getting started (with Apollo Server)](#211-getting-started-with-apollo-server)
    - [2.1.2 Apollo Server for Express (docs are the best)](#212-apollo-server-for-express-docs-are-the-best)
  - [2.2 Schema Definition Language](#22-schema-definition-language)
  - [2.3 Query Language](#23-query-language)
  - [2.4 GraphQL over HTTP](#24-graphql-over-http)
  - [2.5 GraphQL Client](#25-graphql-client)
- [3. Queries](#3-queries)
  - [3.1 Type System, Type Language](#31-type-system-type-language)
  - [3.2 Scalar Types (docs)](#32-scalar-types-docs)
  - [3.3 Custom Type Definition](#33-custom-type-definition)
  - [3.4 Database Resolver](#34-database-resolver)
  - [3.5 Field Selection](#35-field-selection)
  - [3.6 Associations](#36-associations)
  - [3.7 `graphql-request`](#37-graphql-request)
  - [3.8 React Data Fetching (NOT FINISHED, NEEDS SOME WORK)](#38-react-data-fetching-not-finished-needs-some-work)
  - [3.9 Query Arguments](#39-query-arguments)
  - [3.10 Query Variables](#310-query-variables)
- [4. Mutations](#4-mutations)
  - [4.1 Mutation Definition](#41-mutation-definition)
  - [4.2 Input Types - better way to pass many properties](#42-input-types---better-way-to-pass-many-properties)
- [5. Authentication](#5-authentication)
  - [5.1 Authentication Flow](#51-authentication-flow)
  - [5.2 Resolver Context](#52-resolver-context)
- [6. Apollo Client](#6-apollo-client)
  - [6.1 Apollo Client Features (straight from docs)](#61-apollo-client-features-straight-from-docs)
  - [6.2 Get Started (from docs)](#62-get-started-from-docs)
  - [6.3 Query Method](#63-query-method)
  - [6.4 Mutate Method](#64-mutate-method)
  - [6.5 Apollo Client Cache](#65-apollo-client-cache)
  - [6.6 Fetch Policy](#66-fetch-policy)
  - [6.7 Cache Manipulation](#67-cache-manipulation)
  - [6.8 Fragments (man up and read the docs)](#68-fragments-man-up-and-read-the-docs)
- [7. Apollo React Hooks](#7-apollo-react-hooks)
  - [7.1 `useQuery`](#71-usequery)
  - [7.2 Custom Hooks](#72-custom-hooks)
  - [7.3 `useMutation`](#73-usemutation)
  - [7.4 Custom mutation hook example:](#74-custom-mutation-hook-example)
- [8. Data Loaders](#8-data-loaders)
  - [8.1 SQL Database, N + 1 Query Problem](#81-sql-database-n--1-query-problem)
  - [8.2 DataLoader](#82-dataloader)
  - [8.3 Per-Request Cache](#83-per-request-cache)
- [9. Subscriptions](#9-subscriptions)
  - [9.1 Chat Project - initial server setup](#91-chat-project---initial-server-setup)
  - [9.2 Subscription Definition](#92-subscription-definition)
  - [9.3 GraphQL-ws Server (couldn't get it to work with @apollo/server 4.7, only 4.3?? WHY???)](#93-graphql-ws-server-couldnt-get-it-to-work-with-apolloserver-47-only-43-why)
  - [9.4 Subscription Resolver](#94-subscription-resolver)
  - [9.5 GraphQL-WS Client](#95-graphql-ws-client)
  - [9.6 `useSubscription`](#96-usesubscription)
  - [9.7 Connection Params + WebSocket Server Auth](#97-connection-params--websocket-server-auth)

# 1. Intro: What is GraphQL:

- **GraphQL** is a query language for APIs (Application Programming Interfaces) that was developed by Facebook. It enables clients to request the exact data they need, and nothing more, from a server, thereby increasing efficiency and reducing the amount of network traffic.

- In contrast to REST (Representational State Transfer), which uses multiple endpoints to retrieve data, **GraphQL uses a single endpoint and a schema to define the types and fields that are available for query**.

- GraphQL also provides features such as **real-time updates, batch queries, and a strong type system**, which allows for better documentation and fewer errors. It has gained popularity in recent years as a flexible and efficient alternative to traditional REST APIs.

## 1.1 More on GraphQL vs REST

There are several advantages of using GraphQL over REST:

1. **More efficient data loading**: With REST, you often need to make multiple requests to fetch related data, leading to over- and under-fetching of data. In GraphQL, you can request only the specific data you need, which reduces the amount of data transferred over the network and makes data loading more efficient.

2. **Strong typing and self-documentation**: GraphQL has a strongly-typed schema that defines the types of data and operations that can be performed. This helps to prevent errors and makes it easier to understand the API. The schema also serves as self-documentation, making it easier for developers to discover the available data and operations.

3. **Flexibility**: With REST, the API is defined by the server, and the client has to adapt to the server's structure. With GraphQL, the client defines the structure of the data it needs, which gives more flexibility to the client.

4. **Versioning**: With REST, versioning can become an issue as changes to the API can break existing clients. With GraphQL, you can add new fields to the schema without breaking existing queries, which simplifies versioning.

5. **Ecosystem**: GraphQL has a growing ecosystem of tools and libraries that make it easier to develop and use APIs. This includes tools for schema validation, code generation, and performance monitoring, among others.

# 2. Fundamentals

## 2.1 Apollo Server (straight from docs)

- open-source, spec-compliant GraphQL server that's compatible with any GraphQL client
- can be used as
  - The GraphQL server for a subgraph in a federated supergraph
  - A stand-alone GraphQL server
  - An add-on to our app's existing Node.js middelware (such as Express)

### 2.1.1 Getting started (with Apollo Server)

1. create a new project (`npm init -yes && npm pkg set type="module"`)
2. install deps (`npm @apollo/server graphql`)
3. define your GraphQL schema
4. define data set
5. define resolver
6. create an instance of ApolloServer
7. start the server
8. execute query

<br>

**example** (almost) straight from docs

server.js:

```js
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

// apollo server 4 does NOT depend on the graphql-tag library, nor does it export the gql tag

// collection of type definitions that define the shape of queries that
/// are executed against our data
const typeDefs = `#graphql

  # comments

  schema {
    query: Query
  }

  type Query {
    greeting: String    
  }
`;

// resolvers define how to fetch the types defined in our schema
const resolvers = {
  Query: {
    greeting: () => "Hello world",
  },
};

// the ApolloServer instance requires
// 1. schema def (typeDefs)
// 2. resolvers
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  context: async ({ req }) => ({ token: req.headers.token }),
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at ${url}`);
```

### 2.1.2 Apollo Server for Express (docs are the best)

```js
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import express from "express";
import http from "http";
import cors from "cors";
import bodyParser from "body-parser";
import { typeDefs, resolvers } from "./schema";

// Required logic for integrating with Express
const app = express();
// Our httpServer handles incoming requests to our Express app.
// Below, we tell Apollo Server to "drain" this httpServer,
// enabling our servers to shut down gracefully.
const httpServer = http.createServer(app);

// Same ApolloServer initialization as before, plus the drain plugin
// for our httpServer.
const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});
// Ensure we wait for our server to start
await server.start();

// Set up our Express middleware to handle CORS, body parsing,
// and our expressMiddleware function.
app.use(
  "/",
  cors(),
  bodyParser.json(),
  // expressMiddleware accepts the same arguments:
  // an Apollo Server instance and optional configuration options
  expressMiddleware(server, {
    context: async ({ req }) => ({ token: req.headers.token }),
  })
);

// Modified server startup
await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));

console.log(`🚀 Server ready at http://localhost:4000/`);
```

## 2.2 Schema Definition Language

(straight from docs)

- GraphQL server uses a **schema** to describe the shape of available data.
- The schema defines a hierarchy of **types** with **fields** that **are populated from our back-end data stores**
- The schema also specifies exactly which **queries** and **mutations** are available for clients to execute.

## 2.3 Query Language

Here are the key concepts:

1. **Query**: A query is a read-only operation in GraphQL that **retrieves data from the server**. In GraphQL, you define the structure of the data you want to retrieve in your query.

2. **Mutation**: A mutation is a write operation in GraphQL that **modifies data on the server**. Like a query, you define the structure of the data you want to retrieve after the mutation is completed.

3. **Fields**: Fields are the basic building blocks of a GraphQL query. A field is a **piece of data that can be retrieved from the server**. Each field has a name and a type, and can have arguments to specify how the field should be retrieved.

4. **Arguments**: Arguments are **used to pass parameters to a field in a GraphQL query**. You can pass arguments to a field to specify how the field should be retrieved or filtered.

5. **Fragments**: Fragments **allow you to reuse parts of your GraphQL queries in other queries**. A fragment is a reusable piece of a query that defines a set of fields and their types.

6. **Variables**: Variables **allow you to pass arguments to a query or mutation dynamically**. You can define variables in your query or mutation, and then pass their values at runtime.

7. **Directives**: Directives are **used to conditionally include or exclude fields or fragments from a query or mutation**. Directives can be used to optimize queries, reduce network traffic, and customize query behavior.

## 2.4 GraphQL over HTTP

- GraphQL can be used over HTTP to make requests to a server. The basic concept is that a GraphQL request is **sent over a single HTTP POST request to a server**.

- Here are the steps involved in making a GraphQL request over HTTP:

  1. Send a **POST** request to the server: To send a GraphQL request over HTTP, you need to send a POST request to the server's GraphQL endpoint. The GraphQL endpoint is usually a URL that accepts GraphQL queries and mutations.

  2. Include the GraphQL query in the request body: In the body of the POST request, you include the GraphQL query or mutation that you want to execute. The query is usually sent as a JSON object with a "query" property that contains the GraphQL query string.

  3. Include optional variables in the request body: If your GraphQL query or mutation requires variables, you can include them in the request body as a JSON object with a "variables" property. The "variables" object should contain key-value pairs that match the variable names and values defined in your GraphQL query or mutation.

  4. Receive the response from the server: Once the server receives your GraphQL request, it executes the query or mutation and returns a response. The response is usually sent back as a JSON object that contains the data returned by the server, as well as any errors or other metadata.

our request would look like this:

```http
POST http://localhost:4000 HTTP/1.1
Content-Type: application/json

{
  "query": "{ greeting }"
}
```

## 2.5 GraphQL Client

simple (overly simplified) client:

```js
const GRAPHQL_URL = "http://localhost:4000/";

async function fetchGreeting() {
  try {
    const response = await fetch(GRAPHQL_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
          query {
            greeting
          }
        `,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}: ${response.statusText}`);
    }

    const { data } = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

const greeting = document.getElementById("greeting");
greeting.textContent = "Loading...";

fetchGreeting()
  .then((data) => (greeting.textContent = data.greeting))
  .catch((err) => {
    console.error(`Error: ${err.message}`);
    greeting.style.color = "red";
    greeting.textContent = err.message;
  });
```

# 3. Queries

## 3.1 Type System, Type Language

- Every GraphQL service define a set of types which completely describe the set of possible data you can query on that service. Then, when queries come in, they are validated and executed against that schema.

## 3.2 Scalar Types (docs)

- **Int**: A signed 32‐bit integer.
- **Float**: A signed double-precision floating-point value.
- **String**: A UTF‐8 character sequence.
- **Boolean**: true or false.
- **ID**: The ID scalar type represents a unique identifier, often used to refetch an object or as the key for a cache. The ID type is serialized in the same way as a String; however, defining it as an ID signifies that it is not intended to be human‐readable.

- it's possible to define scalar custom type

## 3.3 Custom Type Definition

- In the context of GraphQL, **custom type definitions** refer to **defining your own GraphQL types that are not built-in scalar types such as String, Int, Boolean, Float or ID**.
- Custom types are defined using the type keyword in the GraphQL schema definition language.

```graphql
type Book {
  id: ID
  title: String
  author: String
  publishedDate: String
  description: String
}
```

- Once we define this custom type, we can use it in our queries, mutations and subscriptions as a return type or as an input type.
- For example, if we have a books query that returns a list of books, we can define it like this:

```.graphql
type Query {
  books: [Book]
}
```

- This means that the books query will return a list of Book objects. We can also define mutations or subscriptions that accept Book objects as input.

<br>

**another example**:

```graphql
type Query {
  # [] means array, [Job!] because we don't want null
  # in the array
  jobs: [Job!]
}

type Job {
  # ! means required
  id: ID!
  title: String!
  description: String
}
```

## 3.4 Database Resolver

- A **database resolver** is a resolver **function that interacts with a database to retrieve or update data**. In other words, it's a resolver function that reads from or writes to a database.

- When you define a resolver function in Apollo Server, you can access a third argument called context. This context object can contain any information you want to make available to your resolvers. One common pattern is to include a database connection or ORM instance in the context, so that your resolvers can use it to read or write data.

- For example, you might define a resolver function for a User type that needs to fetch the user's posts from a database:

```js
const resolvers = {
  User: {
    posts: async (parent, args, context) => {
      const { userId } = parent;
      const db = context.db; // assuming you've included a database instance in the context
      const posts = await db.query("SELECT * FROM posts WHERE user_id = ?", [
        userId,
      ]);
      return posts;
    },
  },
};
```

- By using a database resolver in your resolvers, you can separate your data access logic from your application logic, which can make your code easier to test and maintain.

## 3.5 Field Selection

- **Field selection** refers to the **process of selecting the fields that should be returned by a query**.
- In GraphQL, every field on an object can have its own set of sub-fields. When a query is executed, the client specifies the fields it wants to retrieve from the server, and the server returns only those fields.

```graphql
query {
  user(id: 123) {
    name
    email
    posts {
      title
      body
    }
  }
}
```

- In this query, the client is requesting information about a user with an ID of 123. The fields requested for the user include name, email, and posts. For the posts field, the client has also requested the title and body fields.

- When the server receives this query, it will execute the necessary resolvers to fetch the requested data from the database. The server will then return a response that includes only the fields that were requested by the client.

## 3.6 Associations

- **Associations** refer to the **relationships between different types**. Associations allow you to define **how different types of data are related to each other** in your schema.

- For example, let's say you have two types: `User` and `Post`. Each `Post` is created by a `User`. In order to establish this relationship in your schema, you would define a field on the `Post` type that references the User type:

```graphql
type Post {
  id: ID!
  title: String!
  content: String!
  author: User!
}

type User {
  id: ID!
  name: String!
  posts: [Post!]!
}
```

- In this example, the `Post` type has a field called `author` which is of type `User`. This means that **every `Post` object is associated with a `User` object**. Similarly, the `User` type has a field called `posts` which is a list of `Post` objects. This means that **every `User` object is associated with a list of `Post` objects**.

- Once you have established these associations in your schema, you can use them in your queries and mutations to retrieve and manipulate data across multiple types. For example, you could write a query to retrieve all the posts created by a particular user:

```graphql
query {
  user(id: 1) {
    name
    posts {
      title
      content
    }
  }
}
```

- In this query, we are selecting the `name` field from the `User` type and the `title` and `content` fields from the associated `Post` type. This allows us to retrieve all the posts created by the `user` with `ID 1` along with their titles and content.

- Associations are a powerful feature of GraphQL that allow you to model complex data relationships in your schema and easily retrieve data across multiple types.

<br>

**another example**:

```graphql
type Query {
  jobs: [Job!]
}

type Company {
  id: ID!
  name: String!
}

type Job {
  id: ID!
  title: String!
  company: Company!
  description: String
}
```

```js
export const resolvers = {
  Query: {
    jobs: async () => {
      const jobs = await Job.findAll();
      return jobs;
    },
  },

  Job: {
    company: async (job) => {
      const company = await Company.findById(job.companyId);
      return company;
    },
  },
};
```

## 3.7 `graphql-request`

- `npm i graphql-request graphql`

- simple example:

```js
import { request } from "graphql-request";

const endpoint = "http://localhost:4000/graphql";
const query = `query {
  greeting
}`;

async function fetchData() {
  try {
    const data = await request(endpoint, query);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

fetchData();
```

## 3.8 React Data Fetching (NOT FINISHED, NEEDS SOME WORK)

TODO: DON'T DO IT THIS WAY - use react-query!

```js
useEffect(() => {
  async function fetchData() {
    const response = (await getJobs()) as Awaited<{ jobs: Job[] }>;
    setJobs(response.jobs);
  }
  fetchData();
}, [setJobs]);
```

## 3.9 Query Arguments

(straight from docs)

- Every field on GraphQL object type can have zero or more arguments:

```graphql
type Starship {
  id: ID!
  name: String!
  length(unit: lengthUnit = METER): Float
}
```

- **all arguments are named**
- arguments can be either required or optional, when an argument is optional, we can define a **default value**

<br>

**another example**:

```graphql
type Query {
  job(id: ID!): Job
  jobs: [Job!]
}

type Company {
  id: ID!
  name: String!
}

type Job {
  id: ID!
  title: String!
  company: Company!
  description: String
}
```

resolvers:

```js
export const resolvers = {
  Query: {
    job: async (root, { id }) => {
      const job = await Job.findById(id);
      return job;
    },
    jobs: async () => {
      const jobs = await Job.findAll();
      return jobs;
    },
  },

  Job: {
    company: async (job) => {
      const company = await Company.findById(job.companyId);
      return company;
    },
  },
};
```

## 3.10 Query Variables

- In GraphQL, **query variables** are a way to **pass dynamic arguments to a query**. They allow you to define a query with placeholders for input values, which can then be passed in at runtime. This makes it possible to write more flexible and reusable queries.

- Query variables are defined as a separate dictionary object, where each key is the name of a variable defined in the query, and the value is the actual value of the variable. In the query itself, the variables are referred to using the `$` syntax followed by the variable name.

```graphql
query GetPerson($id: ID!) {
  person(id: $id) {
    name
    age
  }
}
```

- In this example, `GetPerson` is the name of the query, and `$id` is the variable that will be passed in at runtime. When you execute the query, you would pass in a dictionary object that looks something like this:

```json
{
  "id": "123"
}
```

- The value of `id` in this object is the actual value that will be used to replace the `$id` variable in the query. By using query variables, you can make your queries more flexible and reusable, and avoid repeating the same query with different input values.

<br>

**another example**:

```graphql
query JobQuery($id: ID!) {
  job(id: $id) {
    id
    title
    company {
      id
      name
    }
    description
  }
}
```

variables:

```json
{
  "id": "rJKAbDd_z"
}
```

# 4. Mutations

## 4.1 Mutation Definition

- **Mutations are used to modify data on the server**. They are a type of operation that allows the client to modify data in the server's database. Mutations are analogous to the SQL INSERT, UPDATE, and DELETE statements.

- Mutations are defined in the schema just like queries. **A mutation operation is defined with a name and a list of input arguments**. The input arguments are used to pass data from the client to the server, and the mutation's return type describes what data will be returned from the mutation.

```graphql
mutation {
  createUser(name: "Alice", email: "alice@example.com") {
    id
    name
    email
  }
}
```

- This mutation creates a new user with the name "Alice" and email "alice@example.com", and returns the new user's ID, name, and email.

- Mutations can also take variables as input, just like queries. This allows the client to pass dynamic data to the mutation. For example:

```graphql
mutation CreateUser($name: String!, $email: String!) {
  createUser(name: $name, email: $email) {
    id
    name
    email
  }
}
```

<br>

**another example**:

```graphql
type Mutation {
  createJob(title: String!, companyId: ID!, description: String): Job
}
```

resolvers:

```js
export const resolvers = {
  Query: {
    // ...
  },

  Mutation: {
    createJob: async (_root, { title, companyId, description }) => {
      return await Job.create({ title, companyId, description });
    },
  },

  // ...
};
```

query:

```graphql
mutation {
  createJob(
    title: "Testing mutation 24/7"
    companyId: "HJRa-DOuG"
    description: "Test"
  ) {
    id
    title
    company {
      id
      name
    }
  }
}
```

## 4.2 Input Types - better way to pass many properties

- **Input types** are similar to regular types, but they are **used as arguments for mutations**. They are used to define the input parameters that are required to perform a mutation.

- Input types are **defined using the `input` keyword in a schema definition, and they can contain one or more fields**, which can be of any valid GraphQL type. The fields of an `input` type can also have an optional `!` to indicate that they are required.

```graphql
type Mutation {
  createJob(input: CreateJobInput!): Job
}

input CreateJobInput {
  title: String!
  companyId: ID!
  description: String
}
```

need to make some changes in resolvers:

```js
Mutation: {
  createJob: async (_root, { input }) => {
    return await Job.create(input);
  }
},
```

example of a query:

```graphql
mutation CreateJobMutation($input: CreateJobInput!) {
  createJob(input: $input) {
    id
    title
    company {
      id
      name
    }
    description
  }
}
```

with json:

```json
{
  "input": {
    "title": "Motivator",
    "companyId": "HJRa-DOuG",
    "description": "We need a man or a womans to motivate our staff."
  }
}
```

- It's a good practice to have an input type for each mutation.

<br>

mutation request:

```ts
export async function createJob(input: CreateJobInput) {
  const query = gql`
    mutation CreateJobMutation($input: CreateJobInput!) {
      # using alias
      job: createJob(input: $input) {
        id
      }
    }
  `;

  const variables = { input };

  const { job } = (await request(GRAPHQL_URL, query, variables)) as Awaited<{
    job: { id: string };
  }>;
  return job;
}
```

in a similar fashion we can do the rest of CRUD:

```graphql
type Mutation {
  createJob(input: CreateJobInput!): Job
  deleteJob(id: ID!): Job
  updateJob(input: UpdateJobInput!): Job
}

type Job {
  id: ID!
  title: String!
  company: Company!
  description: String
}

input CreateJobInput {
  title: String!
  companyId: ID!
  description: String
}

input UpdateJobInput {
  id: ID!
  title: String!
  companyId: ID!
  description: String
}
```

# 5. Authentication

## 5.1 Authentication Flow

The authentication flow involves the following steps:

1. Client sends a request to the server with a token or other authentication credentials in the request header.

2. Server receives the request and verifies the authentication credentials. This might involve checking the token's validity or comparing the user's credentials against a database of authorized users.

   - If the credentials are valid, the server proceeds to execute the requested operation and returns a response to the client.

   - If the credentials are not valid, the server returns an error response, and the client may need to reauthenticate before making another request.

- It's worth noting that the exact authentication flow may vary depending on the specific implementation and requirements of your GraphQL server. Some servers may use different authentication methods, such as OAuth or JWT tokens, and may require additional steps or checks before authorizing a request. Additionally, some GraphQL operations may be accessible to unauthenticated users, while others may require specific permissions or roles.

## 5.2 Resolver Context

- **Resolver context is an object that can be passed to GraphQL resolvers and contains shared data or services that can be accessed by any resolver in the same query execution**. It allows you to share information between different resolvers without having to pass the information through the arguments of each resolver.

- The resolver context is **typically used to provide access to data sources, such as a database or a third-party API, or to provide authentication information, such as the current user or their permissions**. It can also be used to store information that is specific to a particular request, such as a cache or a logger.

- The context object is created by the Apollo Server, and it is passed to the resolvers through the context argument. The context can be an object or a function that returns an object. If a function is provided, it is called for each GraphQL operation and can be used to initialize the context with data that is specific to the current request.

<br>

**example**:

in our resolvers:

```js
// only for authenticated users
Mutation: {
  // async (_root, { input }, context) => ...
  createJob: async (_root, { input }, { auth }) => {
    if (!auth) {
      throw new Error('Unauthorized');
    }

    return await Job.create(input);
  },
```

but it's our responsibility to provide context:

server.js:

```js
app.use(
  "/graphql",
  cors(),
  bodyParser.json(),
  expressjwt({
    algorithms: ["HS256"],
    secret: jwtSecret,
    credentialsRequired: false,
  }),
  expressMiddleware(apolloSever, {
    context: async ({ req }) => {
      // const token = req.headers.authorization || '';
      return {
        auth: req.auth,
      };
    },
  })
);
```

**`express-jwt` api** (from docs):

`expressjwt(options)`

Options has the following parameters:

- `secret: jwt.Secret | GetVerificationKey` (required): The secret as a string or a function to retrieve the secret.
- `getToken?: TokenGetter` (optional): A function that receives the express Request and returns the token, by default it looks in the Authorization header.
- `isRevoked?: IsRevoked` (optional): A function to verify if a token is revoked.
- `onExpired?: ExpirationHandler` (optional): A function to handle expired tokens.
- `credentialsRequired?: boolean` (optional): If its false, continue to the next middleware if the request does not contain a token instead of failing, defaults to true.
- `requestProperty?: string` (optional): Name of the property in the request object where the payload is set. Default to req.auth.
- Plus... all the options available in the `jsonwebtoken` verify function.

<br>

The available functions have the following interface:

- `GetVerificationKey = (req: express.Request, token: jwt.Jwt | undefined) => Promise<jwt.Secret>;`
- `IsRevoked = (req: express.Request, token: jwt.Jwt | undefined) => Promise<boolean>;`
- `TokenGetter = (req: express.Request) => string | Promise<string> | undefined`;

```js
app.use(
  "/graphql",
  cors(),
  bodyParser.json(),
  expressjwt({
    algorithms: ["HS256"],
    secret: jwtSecret,
    credentialsRequired: false,
  }),
  expressMiddleware(apolloSever, {
    context: async ({ req }) => {
      // const token = req.headers.authorization || '';
      if (req.auth) {
        const user = await User.findById(req.auth.sub);
        return { user };
      }
      return {};
    },
  })
);
```

our resolvers might look like this:

```js
// only for authenticated users
Mutation: {
  createJob: async (_root, { input }, { user }) => {
    // rejectIf - simple function that throws 'unauthorized'
    rejectIf(!user);

    return await Job.create({ ...input, companyId: user.companyId});
  },

  deleteJob: async (_root, { id }, { user }) => {
    rejectIf(!user);

    const job = await Job.findById(id);
    rejectIf(job.companyId !== user.companyId);


    return await Job.delete(id);
  },

  updateJob: async (_root, { input }, { user }) => {
    rejectIf(!user);

    const job = await Job.findById(input.id);
    rejectIf(job.companyId !== user.companyId);


    return await Job.update({ ...job, ...input});
  },
},
```

# 6. Apollo Client

## 6.1 Apollo Client Features (straight from docs)

- **Apollo Client** is a comprehensive state management library for JavaScript that enables you to manage both local and remote data with GraphQL. Use it to fetch, cache, and modify application data, all while automatically updating your UI.

<br>

**Features**:

- **Declarative data fetching**: Write a query and receive data without manually tracking loading states.
- **Excellent developer experience**: Enjoy helpful tooling for TypeScript, Chrome / Firefox devtools, and VS Code.
- **Designed for modern React**: Take advantage of the latest React features, such as hooks.
- **Incrementally adoptable**: Drop Apollo into any JavaScript app and incorporate it feature by feature.
- **Universally compatible**: Use any build setup and any GraphQL API.
- **Community driven**: Share knowledge with thousands of developers in the GraphQL community.

## 6.2 Get Started (from docs)

1. install deps: `npm i @apollo/client graphql`
2. initialize `ApolloClinet`:

index.js

```js
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
} from "@apollo/client";
```

```js
const client = new ApolloClient({
  uri: "https://our server",
  cache: new InMemoryCache(),
});

// our client is ready to start fetching data

// const client = ...
client
  .query({
    query: gql``, // query goes here
  })
  .then((result) => console.log(result));
```

3. connect your client to React:

```js
// index.jsx
import React from "react";
import * as ReactDOM from "react-dom/client";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import App from "./App";

const client = new ApolloClient({
  uri: "https://flyby-router-demo.herokuapp.com/",
  cache: new InMemoryCache(),
});

// Supported in React 18+
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
```

4. fetch data with `useQuery`:

```jsx
// Import everything needed to use the `useQuery` hook
import { useQuery, gql } from "@apollo/client";

const GET_LOCATIONS = gql`
  query GetLocations {
    locations {
      id
      name
      description
      photo
    }
  }
`;

function DisplayLocations() {
  const { loading, error, data } = useQuery(GET_LOCATIONS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return data.locations.map(({ id, name, description, photo }) => (
    <div key={id}>
      <h3>{name}</h3>
      <img width="400" height="250" alt="location-reference" src={`${photo}`} />
      <br />
      <b>About this location:</b>
      <p>{description}</p>
      <br />
    </div>
  ));
}
```

- Apollo Client automatically tracks a query's loading and error states, which are reflected in the `loading` and `error`

## 6.3 Query Method

- if we don't want to use `ApolloProvider` (for whatever reason):

```js
import { ApolloClient, gql, InMemoryCache } from '@apollo/client';

const GRAPHQL_URL = 'http://localhost:9000/graphql';

export const client = new ApolloClient({
  uri: GRAPHQL_URL,
  cache: new InMemoryCache(),
});

export async function getJob(id: string) {
  export const query = gql`
  query JobQuery($id: ID!) {
    job(id: $id) {
      id
      title
      company {
        id
        name
      }
      description
    }
  }
`;
  const variables = {
    id,
  };

  const { data } = (await client.query({
    query,
    variables,
  })) as Awaited<{
    data: {
      job: Job;
    };
  }>;

  return data;
}
```

## 6.4 Mutate Method

```js
export async function createJob(input: CreateJobInput) {
  const variables = { input };

  // setting http headers in context
  const context = {
    headers: {
      Authorization: 'Bearer ' + getAccessToken(),
    },
  };

  // client.mutate instead of client.query
  const response = (await client.mutate({
    mutation: CREATE_JOB,
    variables: variables,
    context,
  })) as Awaited<{
    data: {
      job: {
        id: string;
      };
    };
  }>;

  return response;
}
```

## 6.5 Apollo Client Cache

- Apollo Client's cache is a powerful and flexible mechanism for managing application data and state on the client-side. The cache is responsible for storing and managing the results of queries and mutations, and for efficiently updating that data in response to changes in the underlying data source.

- One of the key benefits of the Apollo Client cache is that it is designed to work seamlessly with GraphQL. When a query is executed, the cache automatically checks to see if it has already cached the result for that query, and if so, it returns the cached data rather than making a new network request. This can significantly improve the performance of your application, as it reduces the number of network requests that need to be made.

- The cache is also designed to handle updates to the underlying data source, such as when a mutation is executed. When a mutation is executed, the cache automatically updates any relevant queries that depend on the changed data, ensuring that the application's data stays up-to-date with the server.

- The Apollo Client cache is also highly configurable, allowing developers to customize its behavior to suit their specific use cases. For example, developers can configure the cache to automatically evict stale data after a certain period of time, or to selectively exclude certain types of data from being cached.

## 6.6 Fetch Policy

- **cache-first**:
  - Apollo Client first executes the query against the cache. If all requested data is present in the cache, that data is returned. Otherwise, Apollo Client executes the query against your GraphQL server and returns that data after caching it.
  - Prioritizes minimizing the number of network requests sent by your application.
  - This is the **default fetch policy**.

<br>

- **cache-only**:
  - Apollo Client executes the query only against the cache. It never queries your server in this case.
  - A cache-only query **throws an error if the cache does not contain data for all requested fields**.

<br>

- **cache-and-network**:
  - Apollo Client executes the full query against both the cache and your GraphQL server. **The query automatically updates if the result of the server-side query modifies cached fields**.
  - Provides a fast response while also helping to keep cached data consistent with server data.

<br>

- **network-only**:
  - Apollo Client **executes the full query against your GraphQL server, without first checking the cache**. The query's result is stored in the cache.
  - Prioritizes consistency with server data, but can't provide a near-instantaneous response when cached data is available.

<br>

- **no-cache**:
  - Similar to network-only, except the **query's result is not stored in the cache**.

<br>

- **standby**:
  - Uses the same logic as cache-first, except this query does not automatically update when underlying field values change. You can still manually update this query with refetch and updateQueries.

<br>

**examples**:

```js
export async function getJobs() {
  const response = (await client.query({
    query: GET_JOBS,
    fetchPolicy: 'no-cache',
  })) as Awaited<{
    data: { jobs: Job[] };
  }>;
  return response;
}
```

```js
const { loading, error, data } = useQuery(GET_DOGS, {
  fetchPolicy: "network-only", // Doesn't check cache before making a network request
});
```

- we can also configure the default options in client:

```js
export const client = new ApolloClient({
  uri: GRAPHQL_URL,
  cache: new InMemoryCache(),
  defaultOptions: {
    query: {
      fetchPolicy: "network-only",
    },
    mutate: {
      fetchPolicy: "network-only",
    },
    watchQuery: {
      fetchPolicy: "network-only",
    },
  },
});
```

## 6.7 Cache Manipulation

- usually after mutation you want to update the state of cache

```ts
export async function createJob(input: CreateJobInput) {
  const variables = { input };
  const context = {
    headers: {
      Authorization: "Bearer " + getAccessToken(),
    },
  };

  const response = (await client.mutate({
    mutation: CREATE_JOB,
    variables: variables,
    context,
    // updating data in the cache:
    update: (cache, response) => {
      cache.writeQuery({
        query: GET_JOB,
        variables: { id: response.data!.job.id },
        data: { job: response.data!.job },
      });
    },
  })) as Awaited<{
    data: {
      job: Job;
    };
  }>;

  return response;
}
```

## 6.8 Fragments (man up and read the docs)

- part of GraphQL standard, not specific to Apollo Client

- **Fragment** is a piece of logic that can be shared between multiple queries and mutations.

```graphql
fragment NameParts on Person {
  firstName
  lastName
}
```

- Every fragment includes a subset of the field that belong to its associated type.

```graphql
query GetPerson {
  people(id: "7") {
    firstName
    lastName
    avatar(size: LARGE)
  }
}
```

<br>

**another example**:

```js
const JOB_DETAIL_FRAGMENT = gql`
  fragment JobDetail on Job {
    id
    title
    company {
      id
      name
    }
    description
  }
`;

export const CREATE_JOB = gql`
  mutation CreateJobMutation($input: CreateJobInput!) {
    # using alias
    job: createJob(input: $input) {
      ...JobDetail
    }
  }
  ${JOB_DETAIL_FRAGMENT}
`;
```

# 7. Apollo React Hooks

## 7.1 `useQuery`

- need `<ApolloProvider client={client}>` to make client instance available to all component inside `ApolloProvider`

<br>

**signature**

```ts
useQuery<TData = any, TVariables extends OperationVariables = OperationVariables>(query: DocumentNode | TypedDocumentNode<TData, TVariables>,
options?: QueryHookOptions<TData, TVariables>): QueryResult<TData, TVariables>;
```

- `useQuery` React hook is the primary API for executing queries in an Apollo app.
  - `const { loading, error, data } = useQuery(YOUR_GRAPHQL_QUERY);`
  - `const { loading, error, data } = useQuery(YOUR_GRAPHQL_QUERY, { variables: { ...} })`;

---

- **updating cached query results**: polling and refetching

**polling** - near-real-time synchronization with your server

```js
const { loading, error, data } = useQuery(GET_DOG_PHOTO, {
  variables: { breed },
  pollInterval: 500,
});
```

**refetching** - enables you to refresh query results in response to a particular user action as opposed to using a fixed interval

```jsx
const { loading, error, data, refetch } = useQuery(GET_DOG_PHOTO, {
  variables: { breed },
});

// ...
<button onClick={() => refetch({ breed: 'new_dog_breed' })}>
```

## 7.2 Custom Hooks

something like this:

```ts
import { useQuery } from "@apollo/client";

import { Job, GET_JOBS } from "./queries";

export function useJobs() {
  const { loading, error, data } = useQuery<{
    jobs: Job[];
  }>(GET_JOBS, {
    fetchPolicy: "network-only",
    notifyOnNetworkStatusChange: true,
  });

  return {
    data,
    loading,
    error,
  };
}
```

## 7.3 `useMutation`

```jsx
import { gql, useMutation } from "@apollo/client";

// Define mutation
const INCREMENT_COUNTER = gql`
  # Increments a back-end counter and gets its resulting value
  mutation IncrementCounter {
    currentValue
  }
`;

function MyComponent() {
  // Pass mutation to useMutation
  const [mutateFunction, { data, loading, error }] =
    useMutation(INCREMENT_COUNTER);
}
```

- Unlike `useQuery`, `useMutation` does NOT execute its operation automatically on render, instead, you call this mutate function.

- **resetting mutation status**: `const [login, { data, loading, error, reset }] = useMutation(LOGIN_MUTATION);`
  - call `reset` to reset the mutation's result to its initial state (before the mutate function was called) to enable users to dismiss mutation result data or errors in the UI
  - **Calling reset does not remove any cached data returned by the mutation's execution**. It only affects the state associated with the useMutation hook, causing the corresponding component to rerender.

<br>

## 7.4 Custom mutation hook example:

```ts
import { useMutation } from "@apollo/client";

import { getAccessToken } from "@/services/auth";

export type Job = {
  id: string;
  title: string;
  company: Company;
  description?: string;
};

const JOB_DETAIL_FRAGMENT = gql`
  fragment JobDetail on Job {
    id
    title
    company {
      id
      name
    }
    description
  }
`;

export const CREATE_JOB = gql`
  mutation CreateJobMutation($input: CreateJobInput!) {
    # using alias
    job: createJob(input: $input) {
      ...JobDetail
    }
  }
  ${JOB_DETAIL_FRAGMENT}
`;

export function useCreateJob() {
  const [createJob, { data, loading, error }] = useMutation(CREATE_JOB);

  return {
    createJob: async (newJob: NewJobDataType): Promise<{ job: Job }> => {
      const { data } = await createJob({
        variables: { input: newJob },
        context: {
          headers: {
            Authorization: "Bearer " + getAccessToken(),
          },
        },
        // updating data in the cache:
        update: (cache, response) => {
          cache.writeQuery({
            query: GET_JOB,
            variables: { id: response.data!.job.id },
            data: { job: response.data!.job },
          });
        },
      });
      return data;
    },
    loading,
  };
}
```

# 8. Data Loaders

## 8.1 SQL Database, N + 1 Query Problem

- The **N+1 query problem** is a common performance issue in database-driven applications, particularly those that use object-relational mapping (ORM) frameworks. It occurs when an ORM executes N+1 SQL queries to retrieve N records from the database, plus an additional query for each of the N records to retrieve related data.

- For example, let's say we have two tables in a database, orders and customers, where each order belongs to a customer. If we want to retrieve all orders and the name of the customer who placed each order, an ORM might first execute a query to retrieve all the orders, and then execute a separate query for each order to retrieve the name of the customer who placed it. This results in N+1 queries, where N is the number of orders.

- This can lead to significant performance issues, as executing multiple SQL queries can be slow and resource-intensive, especially when dealing with large datasets. To avoid the N+1 query problem, developers can use techniques such as eager loading, where related data is retrieved in a single SQL query using joins, or lazy loading, where related data is only retrieved when it is actually needed.

<br>

our setup: sqlite, knex

db.js:

```js
import knex from "knex";

export const db = knex({
  client: "better-sqlite3",
  connection: {
    filename: "./data/db.sqlite3",
  },
  // useNullAsDefault: true,
});

db.on("query", ({ sql, bindings }) => {
  console.log("[db]", sql, bindings);
});
```

```graphql
query {
  jobs {
    id
    title
    company {
      id
      name
    }
  }
}
```

- the query above will make 6 different db queries
- this is know n + 1 query problem
  - in this example, for each job we have n queries (for companies)

```sql
SELECT job.id, job.title, company.id, company.name
FROM jobs job JOIN companies company ON company.id= job.companyId;
```

- the sql query above can get all the data needed in one go

## 8.2 DataLoader

- `dataloader` is an npm library for Node.js that provides a simple solution for **batching and caching data fetched from a data source**. It's commonly used in GraphQL servers to optimize the performance of data fetching, but it can also be used in other types of applications.

- `dataloader` allows you to batch multiple requests for the same data into a single request. For example, if you have a list of user IDs and you need to fetch the corresponding users from a database, `dataloader` can group those requests together and fetch all the users in a single query. This can significantly reduce the number of queries to the database and improve performance.

- Additionally, `dataloader` provides a caching mechanism to prevent redundant queries. When you request the same data multiple times, dataloader will only make a single request and cache the result. This can also help reduce the number of requests to the data source and improve performance.

- Overall, `dataloader` provides a simple and efficient way to optimize data fetching in Node.js applications, particularly those that involve batched queries to a data source.

<br>

**example**:

```js
import DataLoader from "dataloader";
import knex from "knex";

export const db = knex({
  client: "better-sqlite3",
  connection: {
    filename: "./data/db.sqlite3",
  },
  useNullAsDefault: true,
});

db.on("query", ({ sql, bindings }) => {
  console.log("[db]", sql, bindings);
});

export function createCompanyLoader() {
  return new DataLoader(async (companyIds) => {
    console.log("[companyLoader] companyIds:", companyIds);

    // whereIn so we can pass an array of ids
    const companies = await db
      .select()
      .from("companies")
      .whereIn("id", companyIds);

    // need to make sure, that we are returning the array in the
    // right order (cuz order is not guaranteed)
    return companyIds.map((companyId) => {
      return companies.find((company) => company.id === companyId);
    });
  });
}
```

## 8.3 Per-Request Cache

```js
app.use(
  "/graphql",
  cors(),
  express.json(),
  expressjwt({
    algorithms: ["HS256"],
    secret: jwtSecret,
    credentialsRequired: false,
  }),
  expressMiddleware(apolloSever, {
    context: async ({ req }) => {
      // we create a new loader for each request
      const companyLoader = createCompanyLoader();

      if (req.auth) {
        const user = await db
          .select()
          .from("users")
          .where("id", req.auth.sub)
          .first();
        return { companyLoader, user };
      }
      return { companyLoader };
    },
  })
);
```

- creates an object ('context') that is gonna be passed to graphql resolvers
- so we're creating a new dataloader for each request:

resolver.js:

```js
export const resolvers = {
  Query: {
    // ...
  },

  // only for authenticated users
  Mutation: {
    // ...
  },

  Job: {
    company: async (job, _args, { companyLoader }) => {
      const company = await companyLoader.load(job.companyId);
      return company;
    },
  },

  Company: {
    jobs: async (company) => {
      const jobs = await db
        .select()
        .from("jobs")
        .where("companyId", company.id);
      return jobs;
    },
  },
};
```

# 9. Subscriptions

- **Subscriptions** are long-lasting operations that can change their result over time. They can maintain an active connection to your GraphQL server (most commonly via WebSocket), enabling server to push updates to the subscription's result.

## 9.1 Chat Project - initial server setup

the usual suspects:

server.js:

```js
import { readFile } from "fs/promises";
import { createServer as createHttpServer } from "http";

import express from "express";
import cors from "cors";

import jwt from "jsonwebtoken";
import { expressjwt } from "express-jwt";

import { ApolloServer } from "@apollo/server";
import { expressMiddleware as apolloExpress } from "@apollo/server/express4";
import { makeExecutableSchema } from "@graphql-tools/schema"; // this one

import { User } from "./db.js";
import { resolvers } from "./resolvers.js";

const PORT = 9000;
const JWT_SECRET = Buffer.from("+Z3zPGXY7v/0MoMm1p8QuHDGGVrhELGd", "base64");

const app = express();
app.use(
  cors(),
  express.json(),
  expressjwt({
    algorithms: ["HS256"],
    credentialsRequired: false,
    secret: JWT_SECRET,
  })
);

app.post("/login", async (req, res) => {
  const { userId, password } = req.body;
  const user = await User.findOne((user) => user.id === userId);
  if (user && user.password === password) {
    const token = jwt.sign({ sub: user.id }, JWT_SECRET);
    res.json({ token });
  } else {
    res.sendStatus(401);
  }
});

function getContext({ req }) {
  if (req.auth) {
    return { userId: req.auth.sub };
  }
  return {};
}

const httpServer = createHttpServer(app);
const typeDefs = await readFile("./schema.graphql", "utf8");
const schema = makeExecutableSchema({ typeDefs, resolvers });

const apolloServer = new ApolloServer({ schema });
await apolloServer.start();
app.use("/graphql", apolloExpress(apolloServer, { context: getContext }));

httpServer.listen({ port: PORT }, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`GraphQL endpoint: http://localhost:${PORT}/graphql`);
});
```

<br>

**`@graphql-tools/schema`**:

- The `@graphql-tools/schema` npm package is a library for building GraphQL schemas in JavaScript. It is part of the larger graphql-tools library, which provides a set of utilities and helpers for working with GraphQL.

- The `@graphql-tools/schema` package specifically provides a set of functions for constructing and manipulating GraphQL schema objects. These functions allow you to define types, fields, resolvers, and other schema components, and combine them into a complete schema object that can be used to serve GraphQL requests.

Some of the key features of the `@graphql-tools/schema` package include:

- A simplified API for defining types and fields, which can help reduce boilerplate and improve readability.
- Support for a variety of built-in scalar types, such as Int, Float, String, and Boolean.
- The ability to define custom scalar types, as well as complex object types and enums.
- Tools for validating and merging schemas, which can be useful when building complex GraphQL APIs that involve multiple services or data sources.

<br>

- The `makeExecutableSchema` function is a key function provided by the `@graphql-tools/schema` package in JavaScript. This function allows you to create a complete GraphQL schema object by providing a set of type definitions and resolver functions.

- In more detail, `makeExecutableSchema` takes in two arguments:
  - The first argument is an object that defines the types and fields of the GraphQL schema. This can be written in the GraphQL schema definition language (SDL), or as a set of JavaScript objects that describe the schema.
  - The second argument is an object that provides resolver functions for the fields of the schema. These resolver functions are responsible for fetching the data that corresponds to each field, and returning it in the expected format.
- Once you've provided these two arguments, makeExecutableSchema will create a complete GraphQL schema object that you can use to serve GraphQL requests. This object includes all of the types and fields defined in the schema, as well as the resolver functions that were provided.

## 9.2 Subscription Definition

**server side** (schema.graphql):

```graphql
type Subscription {
  messageAdded: Message
}
```

<br>

**client side**:

```graphql

```

## 9.3 GraphQL-ws Server (couldn't get it to work with @apollo/server 4.7, only 4.3?? WHY???)

- in order to use subscriptions, our server should use WebSockets: `npm install graphql-ws ws @graphql-tools/schema`

```js
import { readFile } from "fs/promises";
import { createServer as createHttpServer } from "http";

import express from "express";
import cors from "cors";
import { WebSocketServer } from "ws"; // !
import { useServer as useWsServer } from "graphql-ws/lib/use/ws";

import jwt from "jsonwebtoken";
import { expressjwt } from "express-jwt";

import { ApolloServer } from "@apollo/server";
import { expressMiddleware as apolloExpress } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { makeExecutableSchema } from "@graphql-tools/schema";

import { User } from "./db.js";
import { resolvers } from "./resolvers.js";

const PORT = 9000;
const JWT_SECRET = Buffer.from("+Z3zPGXY7v/0MoMm1p8QuHDGGVrhELGd", "base64");

const app = express();
app.use(
  cors(),
  express.json(),
  expressjwt({
    algorithms: ["HS256"],
    credentialsRequired: false,
    secret: JWT_SECRET,
  })
);

app.post("/login", async (req, res) => {
  const { userId, password } = req.body;
  const user = await User.findOne((user) => user.id === userId);
  if (user && user.password === password) {
    const token = jwt.sign({ sub: user.id }, JWT_SECRET);
    res.json({ token });
  } else {
    res.sendStatus(401);
  }
});

function getHttpContext({ req }) {
  if (req.auth) {
    return { userId: req.auth.sub };
  }
  return {};
}

function getWsContext({ connectionParams }) {
  const token = connectionParams?.accessToken;
  if (token) {
    const payload = jwt.verify(token, JWT_SECRET);
    return { userId: payload.sub };
  }
  return {};
}

// we create httpServer explicitly to add WebSockets support
const httpServer = createHttpServer(app);

// network layer
const wsServer = new WebSocketServer({ server: httpServer, path: "/graphql" });

const typeDefs = await readFile("./schema.graphql", "utf8");

// !
const schema = makeExecutableSchema({ typeDefs, resolvers });

// to enable graphql subscriptions over ws - add graphql functionality on top of ws server
const serverCleanup = useWsServer({ schema, context: getWsContext }, wsServer);

// this one!
const apolloServer = new ApolloServer({
  schema,
  plugins: [
    // Proper shutdown for the HTTP server.
    ApolloServerPluginDrainHttpServer({ httpServer }),

    // Proper shutdown for the WebSocket server.
    {
      async serverWillStart() {
        return {
          async drainServer() {
            await serverCleanup.dispose();
          },
        };
      },
    },
  ],
  http: {
    subscriptions: {
      path: "/graphql",
    },
  },
});
await apolloServer.start();
app.use(
  "/graphql",
  cors(),
  express.json(),
  expressjwt({
    algorithms: ["HS256"],
    secret: JWT_SECRET,
    credentialsRequired: false,
  }),
  apolloExpress(apolloServer, { context: getHttpContext })
);

httpServer.listen({ port: PORT }, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`GraphQL endpoint: http://localhost:${PORT}/graphql`);
});
```

## 9.4 Subscription Resolver

- We need an additional package `graphql-subscriptions` that is gonna provide us with a pubsub system

resolvers:

```js
import { Message } from "./db.js";
import { PubSub } from "graphql-subscriptions";

const pubSub = new PubSub();

function rejectIf(condition) {
  if (condition) {
    throw new Error("Unauthorized");
  }
}

export const resolvers = {
  Query: {
    messages: (_root, _args, { userId }) => {
      rejectIf(!userId);
      return Message.findAll();
    },
  },

  Mutation: {
    addMessage: async (_root, { input }, { userId }) => {
      rejectIf(!userId);
      const message = await Message.create({ from: userId, text: input.text });

      // 2. before returning a message, trigger pubsub
      // - whenever we create a new message, we publish a new event
      // - the data is gonna be sent to all the clients that are listening to
      //   our subscription
      pubSub.publish("MESSAGE_ADDED", { messageAdded: message });

      return message;
    },
  },

  // 1.
  Subscription: {
    messageAdded: {
      subscribe: () => pubSub.asyncIterator("MESSAGE_ADDED"),
    },
  },
};
```

## 9.5 GraphQL-WS Client

- `npm i graphql-ws`

client.ts:

```ts
import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  split,
  Operation,
} from "@apollo/client";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { getMainDefinition } from "@apollo/client/utilities";
import { Kind, OperationTypeNode } from "graphql";
import { createClient as createWsClient } from "graphql-ws";

const httpLink = new HttpLink({
  uri: "http://localhost:9000/graphql",
});

const wsLink = new GraphQLWsLink(
  createWsClient({
    url: "ws://localhost:9000/graphql",
  })
);

function isSubscription({ query }: Operation) {
  const definition = getMainDefinition(query);

  // it can only be a subscription if
  // 1. definition.kind === Kind.OPERATION_DEFINITION (not a fragment)
  // 2. definition.operation === OperationTypeNode.SUBSCRIPTION
  return (
    definition.kind === Kind.OPERATION_DEFINITION &&
    definition.operation === OperationTypeNode.SUBSCRIPTION
  );
}

export const client = new ApolloClient({
  link: split(isSubscription, wsLink, httpLink),
  cache: new InMemoryCache(),
});

export default client;
```

## 9.6 `useSubscription`

```graphql
export const MESSAGE_ADDED_SUBSCRIPTION = gql`
  subscription MessageAddedSubscription {
    message: messageAdded {
      id
      from
      text
    }
  }
`;
```

<br>

hooks.ts:

```ts
import {
  useMutation,
  useQuery,
  useSubscription,
  OnSubscriptionDataOptions,
} from "@apollo/client";

import { getAccessToken } from "../services/auth";
import {
  ADD_MESSAGE_MUTATION,
  MESSAGES_QUERY,
  MESSAGE_ADDED_SUBSCRIPTION,
} from "./queries";

export function useAddMessage() {
  const [mutate] = useMutation(ADD_MESSAGE_MUTATION);
  return {
    addMessage: async (text: string) => {
      const {
        data: { message },
      } = await mutate({
        variables: { input: { text } },
        context: {
          headers: { Authorization: "Bearer " + getAccessToken() },
        },
      });
      return message;
    },
  };
}

export function useMessages() {
  const { data } = useQuery(MESSAGES_QUERY, {
    context: {
      headers: { Authorization: "Bearer " + getAccessToken() },
    },
  });
  useSubscription(MESSAGE_ADDED_SUBSCRIPTION, {
    onSubscriptionData: ({
      client,
      subscriptionData,
    }: OnSubscriptionDataOptions) => {
      // console.log("subscriptionData:", subscriptionData);
      const message = subscriptionData.data.message;

      client.cache.updateQuery({ query: MESSAGES_QUERY }, (oldData) => {
        const newData = {
          messages: [...oldData.messages, message],
        };
        return newData;
      });
    },
  });
  return {
    messages: data?.messages ?? [],
  };
}
```

## 9.7 Connection Params + WebSocket Server Auth

- for http we set 'Authorization' header on every request, while with WebSocket we only pass auth token at the start of the connection.

- passing auth token:

client.ts:

```ts
const wsLink = new GraphQLWsLink(
  createWsClient({
    url: "ws://localhost:9000/graphql",
    connectionParams: () => ({
      accessToken: getAccessToken(),
    }),
  })
);
```

<br>

server.js:

```js
function getHttpContext({ req }) {
  if (req.auth) {
    return { userId: req.auth.sub };
  }
  return {};
}

function getWsContext({ connectionParams }) {
  const token = connectionParams?.accessToken;
  if (token) {
    const payload = jwt.verify(token, JWT_SECRET);
    return { userId: payload.sub };
  }
  return {};
}

const httpServer = createHttpServer(app);
const wsServer = new WebSocketServer({ server: httpServer, path: "/graphql" });

const schema = makeExecutableSchema({ typeDefs, resolvers });

// passing getWsContext:
const serverCleanup = useWsServer({ schema, context: getWsContext }, wsServer);

const apolloServer = new ApolloServer({
  schema,
  plugins: [
    ApolloServerPluginDrainHttpServer({ httpServer }),
    {
      async serverWillStart() {
        return {
          async drainServer() {
            await serverCleanup.dispose();
          },
        };
      },
    },
  ],
  http: {
    subscriptions: {
      path: "/graphql",
    },
  },
});

await apolloServer.start();
app.use("/graphql", apolloExpress(apolloServer, { context: getHttpContext }));

httpServer.listen({ port: PORT }, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`GraphQL endpoint: http://localhost:${PORT}/graphql`);
});
```

now, rejecting unauthorized:

resolvers.js:

```js
import { Message } from "./db.js";
import { PubSub } from "graphql-subscriptions";

const pubSub = new PubSub();

function rejectIf(condition) {
  if (condition) {
    throw new Error("Unauthorized");
  }
}

export const resolvers = {
  Query: {
    messages: (_root, _args, { userId }) => {
      rejectIf(!userId);
      return Message.findAll();
    },
  },

  Mutation: {
    addMessage: async (_root, { input }, { userId }) => {
      rejectIf(!userId);
      const message = await Message.create({ from: userId, text: input.text });

      // 2. before returning a message, trigger pubsub
      // - whenever we create a new message, we publish a new event
      // - the data is gonna be sent to all the clients that are listening to
      //   our subscription
      pubSub.publish("MESSAGE_ADDED", { messageAdded: message });

      return message;
    },
  },

  // 1.
  Subscription: {
    messageAdded: {
      subscribe: (_root, _args, { userId }) => {
        console.log("[subscribe] context:", userId);

        // reject unauthorized
        rejectIf(!userId);
        return pubSub.asyncIterator("MESSAGE_ADDED");
      },
    },
  },
};
```
