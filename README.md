### Technical stack

- TypeScript
- ReactJS
- ReactQuery
- CSS Modules
- Material UI
- React Router
- Jest
- PlayWright

### Prerequisites for running

- Docker installed
- You will need to have the following ports free:
  - `3000` (client)
  - `8000` (service)
  - `5432` (postgres)

### Instructions to run the project

1. Clone repository code
2. Run `docker-compose up`
3. Visit `http://localhost:3000/` 🚀

### Run tests

`docker-compose exec client sh`

1. Unit tests: `npm run test`
2. End to end tests: `npm run test:e2e`
