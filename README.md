## Description

Basic CRUD Backend, have following feature:
  - Basic CRUD with 3 tables: User, Post, and Applicantion
  - JWT authentication
  - Data validation, handle exception 

## Installation

```bash
$ npm install
```

## Running the app

run the autorun.bat file for starting postgres docker image, seed the database, and run the app, or:
```bash
#start postgres docker image
docker compose up -d
```
```bash
#migrate the database
npx prisma migrate dev
```
```bash
#seed the database
npx prisma db seed
```
```bash
#run the app
npm run start:dev
```
