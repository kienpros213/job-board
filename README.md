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
#swagger ui: localhost:3000/api
npm run start:dev
```
