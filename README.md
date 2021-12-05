# Vehicle Rental API Server

## Overview

This is a Vehicle Rental application for building REST APIs in Node.js using TypeScript and Express.

### 3-Layer Architecture

![Alt text](/bin/images/3-layer.png?raw=true '3-Layer')

    1. Controllers receive incoming api requests, and they leverage services
    2. Services contain all business logic, and can also make calls to the data access layer
    3. The data access layer interacts with the database by performing queries
    4. Results are passed back up to the service layer.
    5. The service layer can then hand everything back to the controller
    6. The controller can then respond to the client!

##### Few do-nots:

-   API layer is only to handle the request and response, So do not put the business logic inside it.
-   All applications business logics should be only resides inside the service module.

##### Services should not:

    1.Be provided the req or res objects
    2.Handle responding to clients
    3.Provide anything related to HTTP Transport layer; status codes, headers, etc.
    4.Directly interact with the database

### Folder Structure

-   @types: Types folder which contains the custom typed definitons
-   bin
    -   database: contains sql scripts for installation
    -   postman-collection
    -   scripts: contains bash script and setup files
-   dist: Contains the build files which compiled from typescript
-   docs: Contains documentaion files for application routes.
    -   swagger
-   logs: Contains log files which rotated on daily basis
-   src
    -   @core: Core files for bootstraping application with express, middleware. resuable libraries and helpers
    -   @factory
        -   models: database ORM models, ORM instance and interfaces.
            -   interfaces: contains interface files.
            -   sequelizes: contains sequelize models and connection instance.
        -   repo: database service layer which contains db crud services.
        -   service: service layer, i.e service factory which contains all the service files needed for the application.
    -   @interfaces: interfaces which are used for the typescript static typechecking across applications.
    -   @routes: Contains the application routes.
    -   api: presetaton/API layer which contain all the API controllers.
    -   constants: Site constants are maintained in this folder
    -   helpers: Comman resuable helper functions.
    -   lib: Common resuable library function are maintained in this folder.
    -   translator
    -   logger.ts - Logger entry file
    -   server.ts : Entry file to run
-   tests
-   .editorconfig - editor configurations\*
-   .env - app common Configurations\*
-   .env*development - development Configurations*
-   .env*production - production Configurations*
-   .env*test - test Configurations*
-   .eslintrc - code linter\*
-   .prettierrc - code linter used with eslint\*
-   package.json - project dependencies and dev dependencies
-   tsconfig.json - typescript compile configuration options are maintained.

### Pre-requisite

---

-   Node.js - version 14x
-   TypeScript - version 4x
-   NPM - 6.14 +
-   MySQL 8x

---

### 3-Layer Architecture

![Alt text](/bin/images/er-diagram.png?raw=true 'er-diagram')

### MySQL Configurations

**Increase MySQL max connection limit: **
go to “vi /etc/my.cnf” and add the below line to it and restart the mysql server.

```sh
[mysqld]
max_connections = 1000
```

**Enable sql_mode=only_full_group_by: **
go to “vi /etc/my.cnf” and add the below line to it and restart the mysql server.

```sh
[mysqld]
sql_mode=STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION
```

**Setting up database and seed data**

```sh

$ cd database
$ mysql -u <uname> -p
<enter upassword>
Within MySQL console
mysql$ use <database>; // Use the same database which configured on LMS
mysql$ source bin/database/source/01_create_schema.sql
mysql$ source bin/database/source/02_install_data.sql
```

### Getting Started

---

To get start clone the repository:

###### Change directory and install npm dependencies

```sh
$ cd myproject
$ npm install
```

###### To start in local development mode with auto reload feature on code change.

```sh
# To run local server
$ cp .env .env.local
$ npm run local
```

### Environment specific compilation and build for server deployment.

---

### Deployment Steps

-   Production

    #### Step1: To build

    ```sh
    $ cd /var/www/{{project_folder}}
    $ git pull origin master
    $ npm install
    $ npm run build
    ```

    #### Step2: To Run Node server

    ```sh
    $ cd /var/www/{{target_folder}}
    $ mkdir logs     //Give necessary permissions to write
    $ mkdir uploads  //Give necessary permissions to write
    $ cp /var/www/{{project_folder}}/dist  .
    $ npm install
    $ npm run start
    ```

---

## Additional

---

### Scripts

Below is the collection of npm scripts used in this code base,

-   `start`: Run the application in production mode (prefer not to do that in development)
-   `start:dev`: Run the application for development server
-   `build`: To Build the application for production server
-   `build:dev`: To Build the application for development server
-   `dev`: Run the application in development mode with hot reloading
-   `test`: Run the test suite for unit and integration
-   `test:unit`: Run only the unit tests
-   `test:unit:watch`: Run only the unit tests in watch mode in local development
-   `test:integration`: Run only the integration tests
-   `compileTs`: Compile TypeScript files
-   `lint`: Lint the codebase
-   `lint:fix`: To fix Lint errors in codebase

---

### Lint your code before you commit!

In a collaborative project, it's always a pain when you have to work on files not correctly formatted. Now before each commit, yout typescript files are linted based on your tsconfig.json > .eslintrc > .prettierrc > .husky > lint-staged

---

##### Additional Info:

-   For API routes, see Swagger documentation by visiting http://localhost:3000/api/swagger [*Only for local and dev envrionment, for login credentials use the one which configured on .env file ]
-   If db installation fails, you can use the DB Dump(dev) has been located in "bin\database\source\db_rental_dump.sql"
