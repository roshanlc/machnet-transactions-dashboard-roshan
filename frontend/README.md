## Machent Assignment (Go + React) - Frontend

The fronend for the provided assignment by Machnet. React + MUI Library

> Runs on port 9001

### Completed

- [x] Transactions API
- [x] Pagination
- [x] Postgres DB
- [x] Dockerfile

### Libraries

- React.js
- MUI library
- React router

### Run With Docker

Please check the [main README file](../README.md) for running with Docker compose (backend+db+frontend).

### Run Frontend Only

```bash
# clone the repo and cd into it
git clone <repo_url>

cd <directory>

cp .env.example .env

# modify the backend url in .env
vim .env

npm install

## Production
npm run build
```
