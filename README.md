# UruIT Developer Test - Game of Drones

### Overview

The given problem was solved by using ReactJS in the frontend and NodeJS in the backend. PostgreSQL 9.5 is used as the database

### Running instructions

#### Backend

cd into `backend/` and run `npm install`

Install PostgreSQL >= 9.5

Create a database and run the given schema SQL script in it to initialize it.

`psql [db_name] < db/schema.sql`

You can now run the backend server by executing `PORT=3001 PGDATABASE=[db_name] npm start`

In order for tests to work, a test database is required, so create one named `gameofdrones_test` and run the same sql script as before:

`psql gameofdrones_test < db/schema.sql`

Tests can now be run with: `npm test`

#### Frontend

cd into `frontend/` and run `yarn install`

If you're running the backend server in a different port than `3001` then edit `.env.development` to reflect the location of the server.

Run with `yarn start`

test with `yarn test`
