---
title: "NestJS: Fundamentals"
description: "Full overview of NestJS"
author: Ivan O
authorImage: https://images.unsplash.com/photo-1509396591411-549811e332fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80
coverImage: https://images.unsplash.com/photo-1439397629354-e2e3dea8f6f0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80
date: "2022-03-12"
---

- [1. The Basics of Nest](#1-the-basics-of-nest)
  - [1.1 Project Setup](#11-project-setup)
  - [1.2 Creating a Controller](#12-creating-a-controller)
  - [1.3 File Naming Conventions](#13-file-naming-conventions)
  - [1.4 Routing Decorators](#14-routing-decorators)
- [2. Generating Projects with Nest CLI](#2-generating-projects-with-nest-cli)
  - [2.1 Using the Nest CLI to generate project](#21-using-the-nest-cli-to-generate-project)
  - [2.2 Using the Nest CLI to generate files](#22-using-the-nest-cli-to-generate-files)
- [3. Validating Request Data with Pipes](#3-validating-request-data-with-pipes)
  - [3.1 Accessing Request Data with Decorators](#31-accessing-request-data-with-decorators)
  - [3.2 Using Pipes for Validation](#32-using-pipes-for-validation)
  - [3.3 Adding Validation Rules](#33-adding-validation-rules)
  - [3.4 Behind the Scenes of Validation](#34-behind-the-scenes-of-validation)
  - [3.5 How Type Info is Preserved](#35-how-type-info-is-preserved)
- [4. Nest Architecture: Services and Repositories](#4-nest-architecture-services-and-repositories)
  - [4.1 Services and Repositories](#41-services-and-repositories)
  - [4.2 Understanding Inversion of Control](#42-understanding-inversion-of-control)
  - [4.3 Introduction to Dependency Injection](#43-introduction-to-dependency-injection)
  - [4.4 service, repo, controller, module examples (with DI)](#44-service-repo-controller-module-examples-with-di)
- [5. Nest Architecture: Organizing Code with Modules](#5-nest-architecture-organizing-code-with-modules)
  - [5.1 Setting Up DI Between Modules](#51-setting-up-di-between-modules)
  - [5.2 this is not supposed to be that confusing...](#52-this-is-not-supposed-to-be-that-confusing)
- [6. Persistent Data with Nest](#6-persistent-data-with-nest)
  - [6.1 Setting Up a Database Connection](#61-setting-up-a-database-connection)
  - [6.2 Creating an Entity and Repository](#62-creating-an-entity-and-repository)
  - [6.3 Understanding TypeORM Decorators](#63-understanding-typeorm-decorators)
  - [6.4 Repository API](#64-repository-api)
  - [6.5 Extra Routes](#65-extra-routes)
  - [6.6 Setting Up Body Validation](#66-setting-up-body-validation)
  - [6.7 Manual Route Testing](#67-manual-route-testing)
- [7. Creating and Saving User Data](#7-creating-and-saving-user-data)
  - [7.1 Creating and Saving a User](#71-creating-and-saving-a-user)
  - [7.2 Quick Review](#72-quick-review)
  - [7.3 Create vs Save](#73-create-vs-save)
  - [7.4 find, update, remove monstrosity](#74-find-update-remove-monstrosity)
  - [7.5 Exceptions](#75-exceptions)
- [8. Custom Data Serialization](#8-custom-data-serialization)
  - [8.1 Excluding Response Properties](#81-excluding-response-properties)
  - [8.2 Solution to Serialization](#82-solution-to-serialization)
  - [8.3 Serialization in the Interceptor](#83-serialization-in-the-interceptor)
- [9. Authentication From Scratch](#9-authentication-from-scratch)
  - [9.1 Authentication Overview](#91-authentication-overview)
  - [9.2 Reminder on Service Setup](#92-reminder-on-service-setup)
  - [9.3 Understanding Password Hashing](#93-understanding-password-hashing)
  - [9.4 Implementing Signup Functionality (\& wiring it to controller)](#94-implementing-signup-functionality--wiring-it-to-controller)
  - [9.5 Handling User Sign inline](#95-handling-user-sign-inline)
  - [9.6 Setting up Sessions](#96-setting-up-sessions)
  - [9.7 Two Automation Tools](#97-two-automation-tools)
  - [9.8 Custom Param Decorators \& Interceptor](#98-custom-param-decorators--interceptor)
  - [9.9 Globally Scoped Interceptors](#99-globally-scoped-interceptors)
  - [9.10 Preventing Access with Authentication Guards](#910-preventing-access-with-authentication-guards)
- [10. Getting Started with Unit Testing](#10-getting-started-with-unit-testing)
  - [10.1 Overview](#101-overview)
  - [10.2 As an example...](#102-as-an-example)
- [11. Integration Testing (End to End Testing)](#11-integration-testing-end-to-end-testing)
  - [11.1 Getting Started e2e Testing](#111-getting-started-e2e-testing)
  - [11.2 App Setup Issues in Spec Files](#112-app-setup-issues-in-spec-files)
  - [11.3 Creating an End to End Test](#113-creating-an-end-to-end-test)
  - [11.4 Creating Separate Test and Dev Databases](#114-creating-separate-test-and-dev-databases)
- [12. Managing App Configuration](#12-managing-app-configuration)
- [13. Relations with TypeORM](#13-relations-with-typeorm)
  - [13.1 Building Associations](#131-building-associations)
  - [13.2 Types of Associations](#132-types-of-associations)
  - [13.3 More on Decorators](#133-more-on-decorators)
  - [13.4 Setting up the Association](#134-setting-up-the-association)
  - [13.5 Transforming Properties with a DTO](#135-transforming-properties-with-a-dto)
- [14. A Basic Permissions System](#14-a-basic-permissions-system)
  - [14.1 Adding in Report Approval](#141-adding-in-report-approval)
  - [14.2 Authorization vs Authentication](#142-authorization-vs-authentication)
  - [14,3 Adding an Authorization Guard](#143-adding-an-authorization-guard)
  - [14.4 Middleware, Guards and Interceptors](#144-middleware-guards-and-interceptors)
  - [14.5 Validating Query String Values](#145-validating-query-string-values)
- [15. Query Builders with TypeORM](#15-query-builders-with-typeorm)
  - [15.1 Creating a Query Builder](#151-creating-a-query-builder)
  - [15.2 Writing a Query to Produce the Estimate](#152-writing-a-query-to-produce-the-estimate)
- [16. Production Deployment ...](#16-production-deployment-)

# 1. The Basics of Nest

## 1.1 Project Setup

- `@nestjs/common` - contains vast majority of functions, classes, etc, that we need from Nest
- `@nestjs/core`
- `@nestjs/platform-express` - lets Nest use Express JS for handling HTTP requests
- `reflect-metadata` - helps make decorators work.
- `typescript` - we write Nest apps with Typescript

1. install deps
2. set up typescript compiler settings
3. create a nest module and controller
4. start the app

## 1.2 Creating a Controller

- validate data contained in the request - **pipe**
- make sure the user is authenticated - **guard**
- route the request to a particular function - **controller**
- run some business logic - **service**
- access database - **repository**

**Parts of Nest**:

- Controllers -> Handles incoming requests
- Services -> Handles data access and business logic
- Modules -> Groups together code
- Pipes -> Validates incoming code
- Filters -> Handles errors that occur during request handling
- Guards -> Handles authentication
- Interceptors -> Adds extra logic to incoming requests or outgoing responses
- Repositories -> Handles data stored in a DB

---

**Example** (HelloWorld)

```ts
import { Controller, Get, Module } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";

@Controller()
class AppController {
  @Get()
  getRootRoute() {
    return "hi there!";
  }
}

@Module({
  controllers: [AppController],
})
class AppModule {}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  await app.listen(3000);
}

bootstrap();
```

## 1.3 File Naming Conventions

- One class per file (some exceptions)
- Class names should include the kind of thing we are creating
- Name of class and name of file should always match up
- Filename template: `name.type_of_thing.ts`

Example:

- `main.ts` -> function bootstrap
- `app.controller.ts` -> class AppController {}
- `app.module.ts` -> class AppModule {}

## 1.4 Routing Decorators

example:

```ts
import { Controller, Get } from "@nestjs/common";

@Controller("/app")
export class AppController {
  @Get("/asdf")
  getRootRoute() {
    return "hi there!";
  }

  @Get("/bye")
  getByeThere() {
    return "bye there!";
  }
}
```

# 2. Generating Projects with Nest CLI

## 2.1 Using the Nest CLI to generate project

```bash
$ npm i -g @nestjs/cli
$ nest new project-name
```

## 2.2 Using the Nest CLI to generate files

```bash
# generate src/messages/messages.module.ts
$ nest generate module messages

$ nest generate controller messages/messages --flat
```

```txt
                                       call the class
                                       'messages'
                                       --------
nest generate  controller     messages/messages     --flat
              ------------    --------              -------
              type of class   place the file        don't create an
              to generate     in the messages       extra folder called
                              folder                'controllers'

```

# 3. Validating Request Data with Pipes

## 3.1 Accessing Request Data with Decorators

Reminder: **HTTP Request**:

- Start line: `POST /messages/5?validate=true HTTP/1.1` -> `@Param('id')`, `@Query()`
- Headers: `Host: localhost:3000, Content-Type: application/json` -> `@Headers()`
- Body: `{ "content": "hi there" }` -> `@Body()`

Example:

```ts
import { Controller, Get, Post, Body, Param } from "@nestjs/common";

@Controller("messages")
export class MessagesController {
  @Get()
  listMessages() {}

  @Post()
  createMessage(@Body() body: any) {}

  @Get("/:id")
  getMessage(@Param("id") id: string) {}
}
```

## 3.2 Using Pipes for Validation

```txt

Request                      Pipe                          Controller
POST /messages        --->  validates request     ----->   Route Handler
{ "content": " ..." }       data before it reaches
                            a route handler

```

main.ts (global validation):

```ts
import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";

import { MessagesModule } from "./messages/messages.module";

async function bootstrap() {
  const app = await NestFactory.create(MessagesModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
```

## 3.3 Adding Validation Rules

**Setting Up Automatic Validation**:

1. Tell Nest to use global validation
2. Create a class that describes the different properties that the request body should have (Data transfer object - **Dto**)
3. Add validation rules to the class
4. Apply that class to the request handler

`npm i class-validator class-transformer`

/src/dtos/create-message.dto.ts:

```ts
import { IsString } from "class-validator";

export class CreateMessageDto {
  content: string;
}
```

```ts
import { Controller, Get, Post, Body, Param } from "@nestjs/common";

import { CreateMessageDto } from "./dtos/create-message.dto";

@Controller("messages")
export class MessagesController {
  @Get()
  listMessages() {}

  @Post()
  createMessage(@Body() body: CreateMessageDto) {
    console.log(body);
  }

  @Get("/:id")
  getMessage(@Param("id") id: string) {
    console.log(id);
  }
}
```

## 3.4 Behind the Scenes of Validation

- Data Transfer Object - carries data between two places

1. Request: POST /messages { "content": "some stuffs" }
2. Server - Validation Pipe:
   1. use class-transformer to turn the body into an instance of the DTO class
   2. use class-validator to validate the instance
   3. if there are validation errors, respond immediately, otherwise provide body to request handler

## 3.5 How Type Info is Preserved

- TS: `addMessage(@Body() body: AddMessageDto) {}`
- JS: `addMessage(body) {}`

```js
var __decorate =
  (this && this.__decorate) ||
  function (decorators, target, key, desc) {
    var c = arguments.length,
      r =
        c < 3
          ? target
          : desc === null
          ? (desc = Object.getOwnPropertyDescriptor(target, key))
          : desc,
      d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if ((d = decorators[i]))
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };

__decorate(
  [
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0),
  ],
  MessagesController.prototype,
  "listMessages",
  null
);
__decorate(
  [
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_message_dto_1.CreateMessageDto]), // HERE
    __metadata("design:returntype", void 0),
  ],
  MessagesController.prototype,
  "createMessage",
  null
);
__decorate(
  [
    (0, common_1.Get)("/:id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0),
  ],
  MessagesController.prototype,
  "getMessage",
  null
);
MessagesController = __decorate(
  [(0, common_1.Controller)("messages")],
  MessagesController
);
```

# 4. Nest Architecture: Services and Repositories

## 4.1 Services and Repositories

**Services**:

- It's a class
- `#1` place to put any business logic
- Uses one or more repositories to find or store data

---

**Repositores**:

- It's a class
- `#1` place to put storage-related logic
- Usually ends up being a TypeORM entity, a Mongoose schema or similar

Example:

| **MessageService**      | **MessageRepository**   |
| ----------------------- | ----------------------- |
| findOne(id: string)     | findOne(id: string)     |
| findAll()               | findAll()               |
| create(message: string) | create(message: string) |

- This is common and OK!

## 4.2 Understanding Inversion of Control

(if you want to have a reusable code...)
**Inversion of Control Principle** - Classes should not create instances of its dependencies on its own.

Example: MessagesService receives its dependency, and it doesn't specifically require 'MessagesRepository':

```ts
interface Repository {
  findOne(id: string);
  findAll();
  create(content: string);
}

export class MessagesService {
  messagesRepo: Repository;

  constructor(repo: Repository) {
    this.messageRepo = repo;
  }
}
```

**Why this is good ?**:

- **In production...** we can use class MessagesRepository
- **While testing...** we can use class FakeRepository
  as long as both implements Repository interface

## 4.3 Introduction to Dependency Injection

```txt

Nest DI Container (Injector)
-------------------------------------
+ List of classes and their dependencies

  Class       --->   Dependency
  -----              ----------
  MessagesService    MessagesRepo
  MessagesRepo       ...

+ List of instances that I have created

  messagesRepo --->   messagesService

```

**DI Container Flow**:

- At startup, register all classes with the container -> use `Injectable` decorator
- Container will figure out what each dependency each class has -> use `Injectable` decorator
- We then ask the container to create an instance of a class for us -> happens automatically
- Container creates all required dependencies and gives us the instance -> happens automatically
- Container will hold onto the created dependency instances and reuse them if needed

## 4.4 service, repo, controller, module examples (with DI)

service;

```ts
import { Injectable } from "@nestjs/common";
import { MessagesRepository } from "./messages.repository";

@Injectable()
export class MessagesService {
  constructor(public messagesRepo: MessagesRepository) {}

  async findOne(id: string) {
    return await this.messagesRepo.findOne(id);
  }

  async findAll() {
    return await this.messagesRepo.findAll();
  }

  async create(content: string) {
    return await this.messagesRepo.create(content);
  }
}
```

---

repo:

```ts
import { Injectable } from "@nestjs/common";
import { readFile, writeFile } from "fs/promises";

@Injectable()
export class MessagesRepository {
  async findOne(id: string) {
    const contents = await readFile("messages.json", "utf-8");
    const messages = JSON.parse(contents);

    return messages[id];
  }

  async findAll() {
    const contents = await readFile("messages.json", "utf-8");
    const messages = JSON.parse(contents);

    return messages;
  }

  async create(content: string) {
    const contents = await readFile("messages.json", "utf-8");
    const messages = JSON.parse(contents);

    const id = Math.floor(Math.random() * 999);
    messages[id] = { id, content };

    await writeFile("messages.json", JSON.stringify(messages), "utf-8");
  }
}
```

---

controller (no changes):

```ts
import { CreateMessageDto } from "./dtos/create-message.dto";
import { MessagesService } from "./messages.service";

@Controller("messages")
export class MessagesController {
  constructor(public messagesService: MessagesService) {}

  @Get()
  async listMessages() {
    return await this.messagesService.findAll();
  }

  @Post()
  async createMessage(@Body() body: CreateMessageDto) {
    return await this.messagesService.create(body.content);
  }

  @Get("/:id")
  async getMessage(@Param("id") id: string) {
    const message = await this.messagesService.findOne(id);

    if (!message) {
      throw new NotFoundException("message not found");
    }

    return message;
  }
}
```

---

module:

```ts
import { Module } from "@nestjs/common";
import { MessagesController } from "./messages.controller";
import { MessagesRepository } from "./messages.repository";
import { MessagesService } from "./messages.service";

@Module({
  controllers: [MessagesController],

  // thingsThatCanBeUsedAsDependenciesForOtherClasses
  providers: [MessagesService, MessagesRepository],
})
export class MessagesModule {}
```

# 5. Nest Architecture: Organizing Code with Modules

## 5.1 Setting Up DI Between Modules

**DI inside of a module**

example:

```txt
          Power Module
    ---------------------------------
    PowerService ---> RegulatoService
    ------------      ---------------
    supplyPower()     regulatePower()
```

1. Add the `@Injectable()` decorator to PowerService
2. Add the PowerService to the PowerModule's list of providers
3. Define the constructor method on RegulatorService and add `PowerService` to it

---

**DI between Modules**

example:

```txt
      PowerModule         CpuModule
    --------------       ------------
    PowerService  -----> CpuService
    supplyPower()        compute()
```

1. Add PowerService to the PowerModule's list of exports (!)
2. Import the PowerModule into the CpuModule
3. Define the constructor method on CpuService and add `PowerService` to it

example:

**step 1**:

power.module.ts:

```ts
import { Module } from "@nestjs/common";
import { PowerService } from "./power.service";

@Module({
  providers: [PowerService],
  exports: [PowerService], // here!
})
export class PowerModule {}
```

**step 2**:

cpu.module.ts:

```ts
import { Module } from "@nestjs/common";
import { CpuService } from "./cpu.service";
import { PowerModule } from "src/power/power.module";

@Module({
  imports: [PowerModule],
  providers: [CpuService],
})
export class CpuModule {}
```

**step 3**:

cpu.service.ts:

```ts
import { Injectable } from "@nestjs/common";
import { PowerService } from "src/power/power.service";

@Injectable()
export class CpuService {
  constructor(public powerService: PowerService) {}
}
```

---

## 5.2 this is not supposed to be that confusing...

```txt

PowerModule                      DI Container
                        -------> List of classes and their dependencies
providers->PowerService          PowerService
exports  ->PowerService -------> Classes that can be used in other containers
                                 PowerService                            <-----
                                                                               |
**********                                                                     |
                                                                               |
CpuModule                        DI Container                                  |
                     ----------> List of classes and their dependencies        |
providers->CpuService            CpuService -> PowerService                    |
imports -->PowerModule --------> + Everyting listed as an export from PowerModule

```

---

# 6. Persistent Data with Nest

- Nest works fine with any ORM, but works well out of the box with TypeORM and Mongoose

**TypeORM**:

- SQLite
- Postgres
- MySQL
- MongoDB

---

**Mongoose**:

- MongoDB

---

## 6.1 Setting Up a Database Connection

(SQlite DB, as an example):

```txt

Connection to SQLite DB -->  AppModule
                   ---------------------------
    UsersModule   /                           \ ReportsModule
    --------------                    ------------------------
  User Entity                          Report Entity
  Users Repository                     Reports Repository

- User Entity -> Lists the different properties that a User has (no functionality)
- Users Repository -> Methods to find, update, delete, create a User

- Report Entity -> Lists the different properties that a Report has
- Reports Repository -> Methods to find, update, delete, create a Report

```

app.module.ts:

```ts
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UsersModule } from "./users/users.module";
import { ReportsModule } from "./reports/reports.module";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "sqlite",
      database: "db.sqlite",
      entities: [],
      synchronize: true,
    }),
    UsersModule,
    ReportsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

---

## 6.2 Creating an Entity and Repository

**Creating an Entity**

1. Create an entity file, and create a class in it that lists all the properties that your entity will have.
2. Connect the entity to its parent module. **THIS CREATES A REPOSITORY**
3. Connect the entity to the root connection (in app module).

**step #1**:

```ts
import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;
}
```

**step two**:

```ts
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { User } from "./user.entity";

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
```

**step 3**:

```ts
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UsersModule } from "./users/users.module";
import { ReportsModule } from "./reports/reports.module";
import { User } from "./users/user.entity";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "sqlite",
      database: "db.sqlite",
      entities: [User], // HERE !!!!
      synchronize: true,
    }),
    UsersModule,
    ReportsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

---

## 6.3 Understanding TypeORM Decorators

app.module.ts:

```ts
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "sqlite",
      database: "db.sqlite",
      entities: [User, Report],
      synchronize: true, // here
    }),
    UsersModule,
    ReportsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

```txt

@Entity             ----->      SQL Database
class User                      Table of 'users'
@PrimaryGeneratedColumn()
id: number                      id number

@Column()
email: string                   email varchar

@Column()
password: string                password varchar

```

- this (above) is going to be done for us automatically by TypeORM if `synchronize` is set to `true`
- we only going to make use of `synchronize` feature in the development mode (env) - **NEVER RUN SYNCHRONIZE IN PRODUCTION!!!!**
- in production we are writing migrations

---

## 6.4 Repository API

typeorm.io/#/repository-api

- `create()` --> Makes a new instance of an entity, but does not persist it to the DB
- `save()` --> Adds or updates a record to the DB
- `find()` --> Runs a query and returns a list of entities
- `findOne()` --> Runs a query, returning the FIRST matching the search criteria
- `remove()` --> Remove a record from the DB

---

## 6.5 Extra Routes

| Method and Route    | Body or QS                 | Description                     | Controller Method | Service Method |
| ------------------- | -------------------------- | ------------------------------- | ----------------- | -------------- |
| POST /auth/signup   | Body - { email, password } | Create a new user               | createUser        | create         |
| GET /auth/:id       | -                          | Find a user with a given id     | findUser          | findOne        |
| GET /auth?email=... | -                          | Find all users with given email | findAllUsers      | find           |
| PATCH /auth/:id     | Body - { email, password } | Update a user with a given id   | updateUser        | update         |
| DELETE /auth/:id    | -                          | Delete user with given id       | removeUser        | remove         |

---

## 6.6 Setting Up Body Validation

1. main.ts

```ts
import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common"; // here

import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    // here
    new ValidationPipe({
      whitelist: true, // here
    })
  );
  await app.listen(3000);
}
bootstrap();
```

2. create dto: /src/users/dtos/create-user.dto.ts:

(don't forget to `npm i class-validator class-transforme`)

```ts
import { IsEmail, IsString } from "class-validator";

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
```

3. users.controller.ts:

```ts
import { Body, Controller, Post } from "@nestjs/common";

import { CreateUserDto } from "./dtos/create-user.dto";

@Controller("auth")
export class UsersController {
  @Post("/signup")
  createUser(@Body() body: CreateUserDto) {
    // temp
    console.log(body);
  }
}
```

---

## 6.7 Manual Route Testing

```http
### Create a new user
POST http://localhost:3000/auth/signup
Content-Type: application/json

{
  "email": "test@test.com",
  "password": "validPassword123"
}

### Create a new user, invalid body
POST http://localhost:3000/auth/signup
Content-Type: application/json

{
  "email": null,
  "password": "validPassword123"
}
```

# 7. Creating and Saving User Data

## 7.1 Creating and Saving a User

1. users.service.ts:

```ts
import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

import { User } from "./user.entity";

@Injectable()
export class UsersService {
  // this monstrosity is needed because we have a generic here 👇
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  create(email: string, password: string) {
    const user = this.repo.create({ email, password });

    return this.repo.save(user);
  }
}
```

2. hooking up users.service to users.controller

users.controller.ts:

```ts
import { Body, Controller, Post } from "@nestjs/common";

import { CreateUserDto } from "./dtos/create-user.dto";
import { UsersService } from "./users.service";

@Controller("auth")
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post("/signup")
  createUser(@Body() body: CreateUserDto) {
    this.usersService.create(body.email, body.password);
  }
}
```

---

## 7.2 Quick Review

```txt
          Request { email, password }
           |
           V
          ValidationPipe <---- CreateUserDto { email:string; password: string }
           |
           V
          UsersController - Defines routes + picks relevant data from
           |                incoming request
           V
          UserService - Contains our real app logic  ---
           |                                            \ User Entity - defines what
           V                                            /               a user is
          UsersRepository - Created by TypeORM ---------
           |                interface to the DB
           V
          SQLite DB

```

---

## 7.3 Create vs Save

user.entity.ts (with hooks):

```ts
import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Entity,
  Column,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @AfterInsert()
  logInsert() {
    console.log("Inserted User with id", this.id);
  }

  @AfterUpdate()
  logUpdate() {
    console.log("Updated User with id", this.id);
  }

  @AfterRemove()
  logRemove() {
    console.log("Removed User with id", this.id);
  }
}
```

- User Entity Instance -> Users Repo Save: **Hooks are executed**
- plain object { email, password } -> Users Repo Save: **Hooks not executed**

---

## 7.4 find, update, remove monstrosity

users.service.ts:

```ts
import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

import { User } from "./user.entity";

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  create(email: string, password: string) {
    const user = this.repo.create({ email, password });

    return this.repo.save(user);
  }

  findOne(id: number) {
    return this.repo.findOneBy({ id });
  }

  find(email: string) {
    return this.repo.find({
      where: {
        email,
      },
    });
  }

  async update(id: number, attrs: Partial<User>) {
    const user = await this.findOne(id);
    if (!user) {
      throw new Error("user not found");
    }

    Object.assign(user, attrs);
    return this.repo.save(user);
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    if (!user) {
      throw new Error("user not found");
    }

    return this.repo.remove(user);
  }
}
```

---

users.controller.ts:

```ts
import {
  Body,
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Query,
} from "@nestjs/common";

import { CreateUserDto } from "./dtos/create-user.dto";
import { UsersService } from "./users.service";

@Controller("auth")
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post("/signup")
  createUser(@Body() body: CreateUserDto) {
    this.usersService.create(body.email, body.password);
  }

  @Get("/:id")
  findUser(@Param("id") id: string) {
    return this.usersService.findOne(parseInt(id));
  }

  @Get()
  findAllUsers(@Query("email") email: string) {
    return this.usersService.find(email);
  }

  @Delete("/:id")
  removeUser(@Param("id") id: string) {
    return this.usersService.remove(parseInt(id));
  }
}
```

now, for our updateUser we need to create update-user.dto first:

src/users/dtos/update-user.dto:

```ts
import { IsEmail, IsString, IsOptional } from "class-validator";

export class UpdateUserDto {
  @IsEmail()
  @IsOptional()
  email: string;

  @IsString()
  @IsOptional()
  password: string;
}
```

and now the controller:

users.controller.ts:

```ts
import {
  // see prev. controller snipet
  Patch,
  // ...
} from "@nestjs/common";

import { CreateUserDto } from "./dtos/create-user.dto";
import { UpdateUserDto } from "./dtos/update-user.dto"; // here !
import { UsersService } from "./users.service";

@Controller("auth")
export class UsersController {
  // see prev. controller snipet

  @Patch("/:id")
  updateUser(@Param("id") id: string, @Body() body: UpdateUserDto) {
    return this.usersService.update(parseInt(id), body);
  }
}
```

---

## 7.5 Exceptions

UserService - NotFoundException:

- UsersController HTTP
- UsersController WebSocket - doesn't know how to handle NotFoundException!
- UsersController GRPC - doesn't know how to handle NotFoundException!

users.service.ts:

```ts
import { Injectable, NotFoundException } from "@nestjs/common"; // here
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

import { User } from "./user.entity";

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  create(email: string, password: string) {
    const user = this.repo.create({ email, password });

    return this.repo.save(user);
  }

  findOne(id: number) {
    return this.repo.findOneBy({ id });
  }

  find(email: string) {
    return this.repo.find({
      where: {
        email,
      },
    });
  }

  async update(id: number, attrs: Partial<User>) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException("user not found"); // here
    }

    Object.assign(user, attrs);
    return this.repo.save(user);
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException("user not found"); // here
    }

    return this.repo.remove(user);
  }
}
```

users.controller.ts:

```ts
// ...

  @Get('/:id')
  async findUser(@Param('id') id: string) {
    const user = await this.usersService.findOne(parseInt(id));
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return user;
  }

// ...
```

---

# 8. Custom Data Serialization

- **Serialization** is a process that happens before objects are returned in a network request. This is an appropriate place to provide rules for transforming and sanitizing the data to be returned to the client. (For example, sensitive data like passwords should be excluded from the response).

## 8.1 Excluding Response Properties

from Nest docs

```txt

Request     |--------->|UsersControllers|---------->|UsersService
            |          |                |           |
GET /auth/2 |<---------| findUser()     |<----------| findOne()
             Class                       User Entity
             Serializer                  Instance
             Interceptor
```

- **Class Serializer Interceptor** - Turns an instance of User Entity into a plain object based on some rules
- **User Entity Instance** - Directions on how to turn the instance of a class into a plain object

1. user.entity.ts:

```ts
import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import { Exclude } from "class-transformer";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  @Exclude() // HERE (what to exclude, duh)
  password: string;
}
```

2. users.controller.ts:

```ts
import {
  // ...
  UseInterceptors, // +
  ClassSerializerInterceptor, // +
} from "@nestjs/common";

import { CreateUserDto } from "./dtos/create-user.dto";
import { UpdateUserDto } from "./dtos/update-user.dto";
import { UsersService } from "./users.service";

@Controller("auth")
export class UsersController {
  constructor(private usersService: UsersService) {}

  // ...

  @UseInterceptors(ClassSerializerInterceptor) // HERE
  @Get("/:id")
  async findUser(@Param("id") id: string) {
    const user = await this.usersService.findOne(parseInt(id));
    if (!user) {
      throw new NotFoundException("user not found");
    }
    return user;
  }

  // ...
}
```

---

## 8.2 Solution to Serialization

say, we might need...

- Admin route (ex: GET /admin/auth/2), that should see extra properties tied to a user ({ id, email, age, name })
- Public route (ex: GET / auth/2), that should see far less info tied to a user ({ id, email })

```txt

Request     |------>| UsersController |---------->| UsersService |
            |       |                 |           |              |
GET /auth/2 |<------| findUser()      |<----------| findOne()    |
             Custom                    User Entity
             Interceptor               Instance
                ⬆️
             User DTO
        DTO that describes how
        to serialize a user for
        this particular route handler

```

- in this solution, we DO NOT attach any formatting info/serial. directly to User Entity Instance
- instead, we are creating custom interceptor that is going to use custom dtos

---

**How to Build Interceptors**

- Interceptors can mess around with incoming requests and/or outgoing responses (like middleware)
- Interceptors can be applied to a single handler, all the handlers in a controller, or globally

```txt

class CustomInterceptor
-----------------------
intercept(context: ExecutionContext, next: CallHandler)

- 'intercept' method is called automatically
- context - information on the incoming request
- next - kind of a reference to the request handler in our controller

```

CustomInterceptor template:

```ts
import {
  UseInterceptors,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { plainToInstance } from "class-transformer"; // plainToClass

export class SerializeInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    handler: CallHandler<any>
  ): Observable<any> | Promise<Observable<any>> {
    // Run something before a request is handled
    // by the request handler
    console.log("Im running before the handler", context);

    return handler.handle().pipe(
      map((data: any) => {
        // Run something before the response is sent out
        console.log("Im running before response is sent out", data);
      })
    );
  }
}
```

---

## 8.3 Serialization in the Interceptor

```txt

                Interceptor
                -----------
User DTO   <---| User DTO  |<---  User Entity
instance       | instance  |      Instance

```

1. create src/users/dtos/user.dto.ts:

```ts
import { Expose } from "class-transformer";

export class UserDto {
  @Expose()
  id: number;

  @Expose()
  email: string;
}
```

2. src/interceptors/serialize-interceptor.ts:

```ts
import {
  UseInterceptors,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { plainToInstance } from "class-transformer"; // plainToClass

// this is suppose to mean 'any class'
interface ClassConstructor {
  new (...args: any[]): object;
}

export function Serialize(dto: ClassConstructor) {
  return UseInterceptors(new SerializeInterceptor(dto));
}

export class SerializeInterceptor implements NestInterceptor {
  constructor(private dto: any) {}

  intercept(
    context: ExecutionContext,
    handler: CallHandler<any>
  ): Observable<any> | Promise<Observable<any>> {
    // Run something before a request is handled
    // by the request handler
    return handler.handle().pipe(
      map((data: any) => {
        // Run something before the response is sent out
        return plainToInstance(this.dto, data, {
          excludeExtraneousValues: true,
        });
      })
    );
  }
}
```

3. users.controller.ts:

- we can decorate the whole controller or just some handlers (depending on our use case)

```ts
import {
  Body,
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Query,
  NotFoundException,
} from "@nestjs/common";

import { CreateUserDto } from "./dtos/create-user.dto";
import { UpdateUserDto } from "./dtos/update-user.dto";
import { UsersService } from "./users.service";
import { Serialize } from "../interceptors/serialize-interceptor";
import { UserDto } from "./dtos/user.dto";

@Controller("auth")
@Serialize(UserDto)
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post("/signup")
  createUser(@Body() body: CreateUserDto) {
    this.usersService.create(body.email, body.password);
  }

  @Get("/:id")
  async findUser(@Param("id") id: string) {
    const user = await this.usersService.findOne(parseInt(id));
    if (!user) {
      throw new NotFoundException("user not found");
    }
    return user;
  }

  @Get()
  findAllUsers(@Query("email") email: string) {
    return this.usersService.find(email);
  }

  @Delete("/:id")
  removeUser(@Param("id") id: string) {
    return this.usersService.remove(parseInt(id));
  }

  @Patch("/:id")
  updateUser(@Param("id") id: string, @Body() body: UpdateUserDto) {
    return this.usersService.update(parseInt(id), body);
  }
}
```

---

# 9. Authentication From Scratch

## 9.1 Authentication Overview

```txt

Client                         Server
------                         ---------
POST /auth/signup -------->   See if this email is already in use
{ email, password }           if it is, return error
                              otherwise...
                                    |
                                    V
                              Encrypt the users's password
                                    |
                                    V
                              Store the new user record
                                    |
           cookie (userId=42)       V
Browser   <---------------    Send back a cookie that contains the user's id
automatically
stores the cookie
and attaches it to
follow up requests
      |
      | some time later
      V
POST /reports------------->   Look at data in the cookie. Make sure it hasn't
Cookie: userId=42             been tampered with
{ some info }                       |
                                    V
                              Look at the userId in cookie to figure out who
                              is making the request

```

---

## 9.2 Reminder on Service Setup

**UsersModule**:

```txt


                     _UsersService <---
                   /       |           \___Users
UsersController <--        V
                   \ _AuthService

```

1. create auth.service.ts:

```ts
import { Injectable } from "@nestjs/common";

@Injectable()
export class AuthService {}
```

2. add this service to module providers (users.module.ts):

```ts
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { AuthService } from "./auth.service"; // here
import { User } from "./user.entity";

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService, AuthService], // and here
})
export class UsersModule {}
```

3. wire auth.service and users.serive (auth.service.ts):

```ts
import { Injectable } from "@nestjs/common";

import { UsersService } from "./users.service";

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}
}
```

---

## 9.3 Understanding Password Hashing

1. **hashing function**

- very small changes to the input result in a dramatically different hash
- hashing process can't be undone or reversed to figure out the input

2. **hashed and salted**

- in cryptography, **salt** is random data that is used as an additional input to a one-way function that hashes data, a password or passphrase (from wiki).

```txt

user's password|      | salt  |
---------------|      |-------|
somePassword   |      | a1d01 |

           \            /   \
           |           |     \
           V           V      \
         somePassworda1d01     \
                 |              \
                 V               \
          Hashing Function        \
          ----------------         \
                 |                  |
                 V                  V
              Output -----------> Hashed and salted password -> gonna be strored
             010066d                 010066d.a1d01              inside our db

```

---

## 9.4 Implementing Signup Functionality (& wiring it to controller)

auth.service.ts:

```ts
import { randomBytes, scrypt as _scrypt } from "crypto";
import { promisify } from "util";

import { BadRequestException, Injectable } from "@nestjs/common";

import { UsersService } from "./users.service";

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async signup(email: string, password: string) {
    // 1. see if email is in use
    const emailsFound = await this.usersService.find(email);
    if (emailsFound.length > 0) {
      throw new BadRequestException("email is use");
    }

    // 2. hash the user's password
    // 2.1. generate a salt
    const salt = randomBytes(8).toString("hex"); // salt is 16 chars

    // 2.2 hash the salt and the password together
    const hash = (await scrypt(password, salt, 32)) as Buffer;

    // 2.3 join the hashed result and the salt together
    const result = salt + "." + hash.toString("hex");

    // 3. create a new user and save it
    const user = await this.usersService.create(email, result);

    // 4. return user
    return user;
  }

  signin() {
    //
  }
}
```

now, let's wire our AuthService to our UsersController:

users.controller.ts:

```ts
import // same stuffs
"@nestjs/common";

// more imports...
import { AuthService } from "./auth.service";

@Controller("auth")
@Serialize(UserDto)
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService // here
  ) {}

  @Post("/signup")
  createUser(@Body() body: CreateUserDto) {
    return this.authService.signup(body.email, body.password);
  }

  // more stuffs
}
```

---

## 9.5 Handling User Sign inline

**Sign In Flow**:

1. find user with a given email
2. retrieve salt
3. join salt with the password that was provided by the user
4. hasingFunction(salt + password) = output
5. compare the output (see above) with the hashed password stored in db

auth.service.ts:

```ts
import { randomBytes, scrypt as _scrypt } from "crypto";
import { promisify } from "util";

import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";

import { UsersService } from "./users.service";

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async signup(email: string, password: string) {
    // same stuffs
  }

  // here
  async signin(email: string, password: string) {
    const [user] = await this.usersService.find(email);

    if (!user) {
      throw new NotFoundException("user not found");
    }

    const [salt, storedHash] = user.password.split(".");

    const hash = (await scrypt(password, salt, 32)) as Buffer;

    if (storedHash !== hash.toString("hex")) {
      throw new BadRequestException("bad password");
    }
    return user;
  }
}
```

now, in users.controller.ts:

```ts
// imports...

@Controller("auth")
@Serialize(UserDto)
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService
  ) {}

  // ...

  @Post("/signin")
  signin(@Body() body: CreateUserDto) {
    return this.authService.signin(body.email, body.password);
  }

  // ...
}
```

---

## 9.6 Setting up Sessions

```txt

                                 Server
GET /asdf   ---------> Cookie-Session library looks at the
Headers                'Cookie' header
Cookie: es3jd2df              |
                              V
                        Cookie-Session decodes the string,      Session
                        resulting in an object            ---> { color: 'red' }
                              |
                              V
                        We get access to session object in
                        a request handler using a decorator
                              |
                              V
                        We add/remove/change properties        Session
                        on the session object             ---> { color: 'blue' }
                              |
                              V
                        Cookie-Session sees the updated
                        session and turns it into an
                        encrypted string
                              |
                              V
Response  <----------   String sent back in the 'Set-Cookie'
Headers                 header on the response object
Set-Cookie: ey5kaf

```

1. `npm i cookie-session @types/cookie-session`

2. main.ts

```ts
import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";

import { AppModule } from "./app.module";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const cookieSession = require("cookie-session");

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(
    cookieSession({
      keys: ["brambowie"], // gonna be changed in production
    })
  );
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    })
  );
  await app.listen(3000);
}
bootstrap();
```

3. fix users.service.ts:

```ts
// imports...

@Injectable()
export class UsersService {
  // stuffs...

  findOne(id: number) {
    if (!id) {
      // HERE, just in case...
      return null;
    }
    return this.repo.findOneBy({ id });
  }
}
```

4. users.controller.ts:

```ts
import {
  Body,
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Query,
  NotFoundException,
  Session,
} from "@nestjs/common";

import { CreateUserDto } from "./dtos/create-user.dto";
import { UpdateUserDto } from "./dtos/update-user.dto";
import { UsersService } from "./users.service";
import { Serialize } from "../interceptors/serialize-interceptor";
import { UserDto } from "./dtos/user.dto";
import { AuthService } from "./auth.service";

@Controller("auth")
@Serialize(UserDto)
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService
  ) {}

  @Get("/whoami")
  whoAmI(@Session() session: any) {
    return this.usersService.findOne(session.userId);
  }

  @Post("/signout")
  signOut(@Session() session: any) {
    session.userId = null;
  }

  @Post("/signup")
  async createUser(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signup(body.email, body.password);
    session.userId = user.id;
    return user;
  }

  @Post("/signin")
  async signin(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signin(body.email, body.password);
    session.userId = user.id;
    return user;
  }

  // other methods...
}
```

---

## 9.7 Two Automation Tools

**Common Auth System Features**:

- Handler to Sign Up
- Handler to Sign In
- Handler to Sign Out
- Handler to Return currently signed in user
- Reject requests to certain handlers if the user is not signed in -> **Guard**
- Automatically tell a handler who is currently signed in user is -> **Interceptor + Decorator**

---

## 9.8 Custom Param Decorators & Interceptor

**CurrentUserDecorator** needs:

- Session Object
- UsersService Instance

- Param decorators exist OUTSIDE the DI system, so our decorator can't get an instance of UsersService directly

**Solution**: make an interceptor to get the current user, then use the value produced by it in the decorator

```txt

                     -------------------------------------------------------------
                    |         DI System                                           |
Session   ------------> CurrentUser  <- UsersService  UsersController  UsersRepo  |
Object              |   Interceptor       Instance      Instance       Instance   |
                     -------|-----------------------------------------------------
                            V
                        CurrentUser
                         Decorator

```

1. create current-user.interceptor:
   src/users/interceptors/current-user.interceptor.ts:

```ts
import {
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Injectable,
} from "@nestjs/common";

import { UsersService } from "../users.service";

@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {
  constructor(private usersService: UsersService) {}

  async intercept(context: ExecutionContext, handler: CallHandler<any>) {
    const request = context.switchToHttp().getRequest();
    const { userId } = request.session;

    if (userId) {
      const user = await this.usersService.findOne(userId);
      request.currentUser = user;
    }

    return handler.handle();
  }
}
```

2. create current-user-decorator:
   src/users/decorators/current-user-decorator.ts:

```ts
import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const CurrentUser = createParamDecorator(
  (data: never, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    return request.currentUser;
  }
);
```

3. connect an interceptor to DI:

- our interceptor must run first
- then our decorator

users.module.ts:

```ts
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { AuthService } from "./auth.service";
import { User } from "./user.entity";
import { CurrentUserInterceptor } from "./interceptors/current-user.interceptor";

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService, AuthService, CurrentUserInterceptor],
})
export class UsersModule {}
```

4. now, in our users.controller.ts:

```ts
import {
  // same...
  UseInterceptors, // here
} from "@nestjs/common";

// more imports
import { CurrentUser } from "./decorators/current-user-decorator"; // here
import { CurrentUserInterceptor } from "./interceptors/current-user.interceptor"; // here
import { User } from "./user.entity"; // here

@Controller("auth")
@Serialize(UserDto)
@UseInterceptors(CurrentUserInterceptor) // that it!
export class UsersController {
  // same stuffs

  @Get("/whoami")
  whoAmI(@CurrentUser() user: User) {
    return user;
  }

  // more stuffs...
}
```

---

## 9.9 Globally Scoped Interceptors

or we can use globally scoped interceptors:

users.module.ts:

```ts
import { Module } from "@nestjs/common";
import { APP_INTERCEPTOR } from "@nestjs/core";
import { TypeOrmModule } from "@nestjs/typeorm";

import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { AuthService } from "./auth.service";
import { User } from "./user.entity";
import { CurrentUserInterceptor } from "./interceptors/current-user.interceptor";

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [
    UsersService,
    AuthService,
    {
      provide: APP_INTERCEPTOR,
      useClass: CurrentUserInterceptor,
    },
  ],
})
export class UsersModule {}
```

so, we can remove UseInterceptors from users.controller

---

## 9.10 Preventing Access with Authentication Guards

class AuthGuard

- canActivate() -> Return truthy value if user can access this route, falsy if not.

- we can apply guards to individual controller
- or even to a handler

1. create src/guards/auth.guard.ts:

```ts
import { CanActivate, ExecutionContext } from "@nestjs/common";
import { Observable } from "rxjs";

export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    return request.session.userId;
  }
}
```

2. now, in users.controller.ts:

```ts
import {
  // imports
  UseGuards, // this one
} from "@nestjs/common";

// imports
import { AuthGuard } from "../guards/auth.guard"; // our AuthGuard!

@Controller("auth")
@Serialize(UserDto)
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService
  ) {}

  @Get("/whoami")
  @UseGuards(AuthGuard) // now we can apply our guard!
  whoAmI(@CurrentUser() user: User) {
    return user;
  }

  // other stuffs...
}
```

---

# 10. Getting Started with Unit Testing

## 10.1 Overview

- **Unit Testing** - Make sure that individual methods on a class are working correctly
- **Integratio Testing** - Test the full flow of a feature

```ts
const fakeUsersService: Partial<UsersService> = {
  find: () => Promise.resolve([]),
  create: (email: string, password: string) =>
    Promise.resolve({
      id: 1,
      email,
      password,
    } as User),
};
```

- List of things we want to register in our testing DI container:

```ts
await Test.createTestingModule({
  providers: [
    AuthService,
    {
      provide: UsersService, // here
      useValue: fakeUsersService,
    },
  ],
}).compile();
```

- if anyone asks for UsersService, give them this object (fakeUsersService)

---

## 10.2 As an example...

```ts
import { Test } from "@nestjs/testing";

import { AuthService } from "./auth.service";
import { UsersService } from "./users.service";
import { User } from "./user.entity";
import { BadRequestException, NotFoundException } from "@nestjs/common";

describe("AuthService", () => {
  let service: AuthService;
  let fakeUsersService: Partial<UsersService>;

  beforeEach(async () => {
    const users: User[] = [];

    fakeUsersService = {
      find: (email: string) => {
        const filteredUsers = users.filter((user) => user.email === email);
        return Promise.resolve(filteredUsers);
      },

      create: (email: string, password: string) => {
        const user = {
          id: Math.floor(Math.random() * 999999),
          email,
          password,
        } as User;
        users.push(user);
        return Promise.resolve(user);
      },
    };

    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: fakeUsersService,
        },
      ],
    }).compile();

    service = module.get(AuthService);
  });

  it("can create an instance of auth service", async () => {
    expect(service).toBeDefined();
  });

  it("creates a new user with salted and hashed password", async () => {
    const email = "test@test.com";
    const password = "qwerty";
    const user = await service.signup(email, password);

    expect(user.password).not.toEqual(password);

    const [salt, hash] = user.password.split(".");
    expect(salt).toBeDefined();
    expect(hash).toBeDefined();
  });

  it("throws an error if user signs up with email that is in use", async () => {
    const email = "test@test.com";
    const password = "qwerty";

    await service.signup(email, password);

    await expect(service.signup(email, password)).rejects.toBeInstanceOf(
      BadRequestException
    );
  });

  it("throws if signin is called with an unused email", async () => {
    const email = "test@test.com";
    const password = "qwerty";

    await expect(service.signin(email, password)).rejects.toBeInstanceOf(
      NotFoundException
    );
  });

  it("throws if an invalid password is provided", async () => {
    const email = "test@test.com";
    const password = "qwerty";
    const invalidPassword = "babaganush";

    await service.signup(email, password);

    await expect(service.signin(email, invalidPassword)).rejects.toBeInstanceOf(
      BadRequestException
    );
  });

  it("returns a user if correct password is provided", async () => {
    const email = "test@test.com";
    const password = "qwerty";

    await service.signup(email, password);

    const user = await service.signin(email, password);

    expect(user).toBeDefined();
    expect(user.email).toEqual(email);
  });
});
```

---

# 11. Integration Testing (End to End Testing)

## 11.1 Getting Started e2e Testing

```txt

Test                           Test Runner
-------               ----->  ---------------
it('handles a request         Creates new copy of the entire nest app
   to signup)                        |
                                     V
                              Listen on traffic to a randomly assigned
                              port
                                      |
                                      V
                              Receive requests from the test

```

---

## 11.2 App Setup Issues in Spec Files

```txt

                  main.ts
                  -----------
                  - cookie-session
                  - Validation Pipe
                  -----------
                      ⬆️
                      |
Our E2E Test ---> App Module
                  /         \
  Users Module ---           --- Reports Module

```

- move Validation Pipe and cookie-session from main.ts to App Module

```txt

                   main.ts
                      |
                      |
                  App Module
                  ---------------
                  - cookie-session
                  - Validation Pipe
                  ---------------
 Our E2E Test __/  |        |
                   /        \
   Users Module ---           --- Reports Module

```

app.module.ts:

```ts
import { MiddlewareConsumer, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ValidationPipe } from "@nestjs/common";
import { APP_PIPE } from "@nestjs/core";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const cookieSession = require("cookie-session");

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UsersModule } from "./users/users.module";
import { ReportsModule } from "./reports/reports.module";
import { User } from "./users/user.entity";
import { Report } from "./reports/report.entity";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "sqlite",
      database: "db.sqlite",
      entities: [User, Report],
      synchronize: true,
    }),
    UsersModule,
    ReportsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
      }),
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        cookieSession({
          keys: ["brambowie"],
        })
      )
      .forRoutes("*");
  }
}
```

---

main.ts:

```ts
import { NestFactory } from "@nestjs/core";

import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
```

---

## 11.3 Creating an End to End Test

/src/test/auth.e2e-spect.tes:

```ts
import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import * as request from "supertest";

import { AppModule } from "./../src/app.module";

describe("Authentication Sysgtem (e2e)", () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it("handles a signup request", () => {
    const email = "someUniqueNew@email.com";

    return request(app.getHttpServer())
      .post("/auth/signup")
      .send({
        email,
        password: "qwerty",
      })
      .expect(201)
      .then((res) => {
        const { id, email } = res.body;
        expect(id).toBeDefined();
        expect(email).toEqual(email);
      });
  });
});
```

---

## 11.4 Creating Separate Test and Dev Databases

```txt
 __________________________________________
|       App Module DI Container            |
 ------------------------------------------
| List of classes and their dependencies   |
|------------------------------------------|
| ConfigService -> ....                    |
|                                          |
| TypeOrmModule -> ConfigService           |
 ------------------------------------------

```

# 12. Managing App Configuration

1. `npm i @nestjs/config`, `npm i cross-env`

2. in the root dir create:

.env.development: `DB_NAME=db.sqlite`
.env.test: `DB_NAME=test.sqlite`

3. then, in app.module.ts:

```ts
import { MiddlewareConsumer, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ValidationPipe } from "@nestjs/common";
import { APP_PIPE } from "@nestjs/core";
import { ConfigModule, ConfigService } from "@nestjs/config";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const cookieSession = require("cookie-session");

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UsersModule } from "./users/users.module";
import { ReportsModule } from "./reports/reports.module";
import { User } from "./users/user.entity";
import { Report } from "./reports/report.entity";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          type: "sqlite",
          database: config.get<string>("DB_NAME"),
          synchronize: true,
          entities: [User, Report],
        };
      },
    }),
    UsersModule,
    ReportsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
      }),
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        cookieSession({
          keys: ["brambowie"],
        })
      )
      .forRoutes("*");
  }
}
```

4. use cross-env in package.json scripts:

```json
 "scripts": {
    "build": "nest build",
    "format": "prettier --write \"src/**/*.ts\" \"test/**/*.ts\"",
    "start": "cross-env NODE_ENV=development nest start",
    "start:dev": "cross-env NODE_ENV=development nest start --watch",
    "start:debug": "cross-env NODE_ENV=development nest start --debug --watch",
    "start:prod": "node dist/main",
    "lint": "eslint \"{src,apps,libs,test}/**/*.ts\" --fix",
    "test": "cross-env NODE_ENV=test jest",
    "test:watch": "cross-env NODE_ENV=test jest --watch",
    "test:cov": "cross-env NODE_ENV=test jest --coverage",
    "test:debug": "cross-env NODE_ENV=test node --inspect-brk -r tsconfig-paths/register -r ts-node/register node_modules/.bin/jest --runInBand",
    "test:e2e": "cross-env NODE_ENV=test jest --config ./test/jest-e2e.json --maxWorkers=1"
  },
```

5. /test/jest-e23.json

```json
{
  "moduleFileExtensions": ["js", "json", "ts"],
  "rootDir": ".",
  "testEnvironment": "node",
  "testRegex": ".e2e-spec.ts$",
  "transform": {
    "^.+\\.(t|j)s$": "ts-jest"
  },
  "setupFilesAfterEnv": ["<rootDir>/setup.ts"]
}
```

6. /test/setup.ts (so we delete test.sqlite )

```ts
import { rm } from "fs/promises";
import { join } from "path";
// import { getConnection } from 'typeorm';

global.beforeEach(async () => {
  try {
    await rm(join(__dirname, "..", "test.sqlite"));
  } catch (err) {
    // don't care
  }
});

// global.afterEach(async () => {
//   const conn = getConnection();
//   await conn.close();
// });
```

extra test auth.e2e-spec.ts:

```ts
it("signup as a new user then get the currently logged in user", async () => {
  const email = "uniqueEmail@test.com";

  const res = await request(app.getHttpServer())
    .post("/auth/signup")
    .send({
      email,
      password: "qwerty",
    })
    .expect(201);

  const cookie = res.get("Set-Cookie");

  const { body } = await request(app.getHttpServer())
    .get("/auth/whoami")
    .set("Cookie", cookie)
    .expect(200);

  expect(body.email).toEqual(email);
});
```

---

# 13. Relations with TypeORM

## 13.1 Building Associations

**Associations**:

- Relating one record with another
- Requires knowledge of: Security, SQL, REST conventions, TypeORM, Nest, Class-Transformer

---

## 13.2 Types of Associations

**Associations with Nest and TypeORM**:

1. Figure out what kind of association we are modeling.
2. Add the appropriate decorators to our related entities.
3. Associate the records when one is created.
4. Apply serializer to limit info shared.

---

**ToA: One-to-One Relationships**:

ex:

- Country <-> Capital
- Car <-> Engine
- Passport <-> Person
- Person <-> Cell Phone (?)

---

**ToA: One-to-Many / Many-to-One**:

ex:

- Customers <-> Orders
- Car <-> Parts
- Country <-> Cities
- Continent <-> Mountains

---

**ToA: Many-to-Many**:

ex:

- Trains <-> Riders
- Classes <-> Students
- Album <-> Genre

- @OneToMany - no changes in db
- @ManyToOne - changes in db

---

## 13.3 More on Decorators

user.entity.ts:

```ts
import {
  // imports
  OneToMany,
} from "typeorm";

import { Report } from "../reports/report.entity";

@Entity()
export class User {
  // ...

  @OneToMany(() => Report, (report: Report) => report.user)
  reports: Report[];

  // ...
}
```

---

report.entity.ts:

```ts
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";

import { User } from "../users/user.entity";

@Entity()
export class Report {
  // ...

  @ManyToOne(() => User, (user: User) => user.reports)
  user: User;
}
```

---

```txt
class User

@OneToMany()
reports: Report[]
```

- Does NOT change the Users table
- Reports tied to this user will be accessed with `user.reports`
- Association **is not automatically fetched** when we fetch a User

---

```txt
class Report

@ManyToOne()
user: User
```

- Changes the Reports table
- User who created this report will be accessed with `report.user`
- Association **is not automatically fetched** when we fetch a Report

---

## 13.4 Setting up the Association

```txt

POST /reports
Cookie: asdfj13 ---> @CurrentUser() ----> user entity instance  -
{                    Decorator                                   \ Report Entity Instance -> Reports Repo
  year: 1950,                                                    /  - lng                     Save Method
  mileage: ...  ---> @Body()        ----> Validated             -   - lat
  price: ...         CreateReportDto      CreatedReportDto          - ...
  make:                                                             - price
  ...                                                               - user: user entity instance
}

```

Now, according to the diagram (above) we need to make changes in...

reports.controller.ts:

```ts
import { Body, Controller, Post, UseGuards } from "@nestjs/common";

import { CreateReportDto } from "./dtos/create-report.dto";
import { ReportsService } from "./reports.service";
import { AuthGuard } from "../guards/auth.guard";
import { CurrentUser } from "../users/decorators/current-user-decorator";
import { User } from "../users/user.entity";

@Controller("reports")
export class ReportsController {
  constructor(private reportsService: ReportsService) {}

  @Post()
  @UseGuards(AuthGuard)
  createReport(@Body() body: CreateReportDto, @CurrentUser() user: User) {
    return this.reportsService.create(body, user);
  }
}
```

reports.service.ts:

```ts
import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

import { Report } from "./report.entity";
import { CreateReportDto } from "./dtos/create-report.dto";
import { User } from "../users/user.entity";

@Injectable()
export class ReportsService {
  constructor(@InjectRepository(Report) private repo: Repository<Report>) {}

  create(reportDto: CreateReportDto, user: User) {
    const report = this.repo.create(reportDto);
    report.user = user;
    return this.repo.save(report);
  }
}
```

---

## 13.5 Transforming Properties with a DTO

1. create a new dto: /src/reports/dtos/report.dto.ts:

```ts
import { Expose, Transform } from "class-transformer";
import { User } from "../../users/user.entity";

export class ReportDto {
  @Expose()
  id: number;

  @Expose()
  price: number;

  @Expose()
  year: number;

  @Expose()
  lng: number;

  @Expose()
  lat: number;

  @Expose()
  make: string;

  @Expose()
  model: string;

  @Expose()
  mileage: number;

  @Transform(({ obj }) => obj.user.id)
  @Expose()
  userId: number;
}
```

2. now, reports.controller.ts:

```ts
import { CreateReportDto } from "./dtos/create-report.dto";
import { ReportsService } from "./reports.service";
import { AuthGuard } from "../guards/auth.guard";
import { CurrentUser } from "../users/decorators/current-user-decorator";
import { User } from "../users/user.entity";
import { ReportDto } from "./dtos/report.dto";
import { Serialize } from "../interceptors/serialize-interceptor";

@Controller("reports")
export class ReportsController {
  constructor(private reportsService: ReportsService) {}

  @Post()
  @UseGuards(AuthGuard)
  @Serialize(ReportDto)
  createReport(@Body() body: CreateReportDto, @CurrentUser() user: User) {
    return this.reportsService.create(body, user);
  }
}
```

---

# 14. A Basic Permissions System

## 14.1 Adding in Report Approval

1. add approved property to Report Entity:

```ts
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";

import { User } from "../users/user.entity";

@Entity()
export class Report {
  // ...

  @Column({ default: false })
  approved: boolean;

  // ...
}
```

---

2. Then, create /src/reports/dtos/approve-report.dto.ts:

```ts
import { IsBoolean } from "class-validator";

export class ApproveReportDto {
  @IsBoolean()
  approved: boolean;
}
```

- don't forget to add approved property to report.dto.ts (!)

---

3. now, in reports.controller.ts:

```ts
// imports ...
import { ApproveReportDto } from './dtos/approve-report.dto';

@Controller('reports')
  // ...

  @Patch('/:id')
  approveReport(@Param('id') id: string, @Body() body: ApproveReportDto) {
    return this.reportsService.changeApproval(id, body.approved);
  }
}
```

---

4. now, in reports.service.ts:

```ts
import { Injectable, NotFoundException } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

import { Report } from "./report.entity";
import { CreateReportDto } from "./dtos/create-report.dto";
import { User } from "../users/user.entity";

@Injectable()
export class ReportsService {
  constructor(@InjectRepository(Report) private repo: Repository<Report>) {}

  create(reportDto: CreateReportDto, user: User) {
    const report = this.repo.create(reportDto);
    report.user = user;
    return this.repo.save(report);
  }

  async changeApproval(id: number, approved: boolean) {
    const report = await this.repo.findOneBy({ id });
    if (!report) {
      throw new NotFoundException("report not found");
    }

    report.approved = approved;
    return this.repo.save(report);
  }
}
```

---

## 14.2 Authorization vs Authentication

- **Authentication** -> Figure out **who** is making a request
- **Authorization** -> Figure out if the person making the request is allowed to make it

```txt

PATCH /reports/:id --> AdminGuard   -----------> Route Handler
{ approved: true }     Is request.currentUser
                       an admin?

```

## 14,3 Adding an Authorization Guard

1. user.entity.ts:

```ts
// imports

@Entity()
export class User {
  // ...

  @Column({ default: true })
  admin: boolean;
  // ...
}
```

2. /src/admin.guard.ts:

```ts
import { CanActivate, ExecutionContext } from "@nestjs/common";
import { Observable } from "rxjs";

export class AdminGuard implements CanActivate {
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    if (!request.currentUser) {
      return false;
    }

    return request.currentUser.admin;
  }
}
```

3. now, wire our AdminGuard to reports.controller

```ts
import {
  // imports...
  UseGuards,
} from "@nestjs/common";

// more imports
import { AdminGuard } from "../guards/admin.guard";

@Controller("reports")
export class ReportsController {
  // ...

  @Patch("/:id")
  @UseGuards(AdminGuard)
  approveReport(@Param("id") id: string, @Body() body: ApproveReportDto) {
    return this.reportsService.changeApproval(parseInt(id), body.approved);
  }
}
```

- not working as expected...

---

## 14.4 Middleware, Guards and Interceptors

In Nest:

```txt

  Request
    |
    V
  Middleware(s)
    |
    V
  Guards
    |
    |<---------------------
    V                      |
  Request Handler      Interceptor
    |                      |
    |<---------------------
    V
  Response

```

---

We have:

```txt

  Request
    |
    V
  Cookie-Session Middleware
    |
    V
  AdminGuard
    |
    |<---------------------
    V                      |
  Request Handler      CurrentUser Interceptor
    |                      |
    |<---------------------
    V
  Response
```

---

Solution -> turn our CurrentUser Interceptor into CurrentUser Middleware

1. /src/users/middlewares/current-user.middleware.ts:

```ts
import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";

import { UsersService } from "../users.service";

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
  constructor(private usersService: UsersService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const { userId } = req.session || {};

    if (userId) {
      const user = await this.usersService.findOne(userId);
      // don't worry, I'm a doctor
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      req.currentUser = user;
    }

    next();
  }
}
```

2. now, in users.module.ts (we substitute CurrentUserInterceptor for CurrentUserMiddleware):

```ts
import { Module, MiddlewareConsumer } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { AuthService } from "./auth.service";
import { User } from "./user.entity";
import { CurrentUserMiddleware } from "./middlewares/current-user.middleware";

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService, AuthService],
})
export class UsersModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CurrentUserMiddleware).forRoutes("*");
  }
}
```

---

## 14.5 Validating Query String Values

1. /src/reports/dtos/get-estimate.dto.ts:

```ts
import {
  IsNumber,
  IsString,
  Min,
  Max,
  IsLongitude,
  IsLatitude,
} from "class-validator";
import { Transform } from "class-transformer";

export class GetEstimateDto {
  @IsString()
  make: string;

  @IsString()
  model: string;

  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @Min(1930)
  @Max(2024)
  year: number;

  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @Min(0)
  @Max(1000000)
  mileage: number;

  @Transform(({ value }) => parseFloat(value))
  @IsLongitude()
  lng: number;

  @Transform(({ value }) => parseFloat(value))
  @IsLatitude()
  lat: number;
}
```

---

**Our Estimate Criteria**:

- find reports for the same make/model
- within +/- 5 miles (lng, lat)
- within 3 years
- order by closes mileage
- take the top 3 closest reports and average their value

---

2. now, to reports.controller.ts

```ts
import {
  // imports
  Get,
  Query,
} from "@nestjs/common";

// imports
import { GetEstimateDto } from "./dtos/get-estimate.dto";

@Controller("reports")
export class ReportsController {
  constructor(private reportsService: ReportsService) {}

  @Get()
  getEstimate(@Query() query: GetEstimateDto) {
    // not yet
  }
}
```

---

# 15. Query Builders with TypeORM

## 15.1 Creating a Query Builder

**TypeORM Repository APIs** (from docs)

- loads of stuffs...

- `createQueryBuilder` - returns a query builder (duh) to build SQL queries

```js
const users = await repository
  .createQueryBuilder("user")
  .where("user.name = :name", { name: "John" })
  .getMany();
```

---

- `find`

```js
const timbers = await repository.find({
  where: {
    firstName: "Timeber",
  },
});
```

- `findOneOrFail`

- `findAndCountBy`

```js
const [timbers, timbersCount] = await repository.findAndCount({
  where: {
    firstName: "Timber",
  },
});
```

- `findOneBy`

```js
const timber = await repository.findOneBy({ firstName: "Timber" });
```

- `findOneByOrFail`

- `query` - Executes a raw SQL query

```js
const rawData = await repository.query(`SELECT * FROM USERS`);
```

- `create`
- `save`

- and many more...

---

## 15.2 Writing a Query to Produce the Estimate

Example (from docs):

```sql
SELECT
  user.id as userId,
  user.firstName as userFirstName,
  user.lastName as userLastName
FROM users user
WHERE user.id = 1
```

```js
const firstUser = await dataSource
  .getRepository(User)
  .createQueryBuilder("user")
  .where("user.id = :id", { id: 1 })
  .getOne();
```

from reports.service.ts:

```ts
async createEstimate(estimateDto: GetEstimateDto) {
    async createEstimate({
    make,
    model,
    lng,
    lat,
    year,
    mileage,
  }: GetEstimateDto) {
    return await this.repo
      .createQueryBuilder()
      .select('AVG(price)', 'price')
      .where('make = :make', {
        make,
      })
      .andWhere('model = :model', {
        model,
      })
      .andWhere('lng - :lng BETWEEN -5 AND 5', {
        lng,
      })
      .andWhere('lat - :lat BETWEEN -5 AND 5', {
        lat,
      })
      .andWhere('year - :year BETWEEN -3 AND 3', {
        year,
      })
      .orderBy('ABS(mileage - :mileage)', 'DESC')
      .setParameters({ mileage })
      .limit(3)
      .getRawOne();
  }
}

```

---

# 16. Production Deployment ...
