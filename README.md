# UruIT Developer Test - Game of Drones

### Overview

The given problem was solved by using ReactJS in the frontend and NodeJS in the backend. PostgreSQL 9.5 is used as the database

### Running instructions

#### Backend

Install PostgreSQL >= 9.5

cd into `backend/`

Create a database and run the given schema SQL script in it to initialize it.

`psql [db_name] < db/schema.sql`

You can now run the backend server by executing `PORT=3001 PGDATABASE=[db_name] npm start`

In order for tests to work, a test database is required, so create one named `gameofdrones_test` and run the same sql script as before:

`psql gameofdrones_test < db/schema.sql`

Tests can now be run with: `npm test`

#### Frontend

cd into `frontend/`

Run with `yarn start`

test with `yarn test`