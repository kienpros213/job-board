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

run the autorun.bat file for starting postgres docker image, seed the database, and run the app
or:
```bash
docker compose up -d
```
```bash
npx prisma db seed
```
```bash
npm run start:dev
```
