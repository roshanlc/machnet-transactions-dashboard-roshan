## Machent Assignment (Go + React) - Frontend

The fronend for the provided assignment by Machnet. React + MUI Library

> Runs on port 9001

### Completed

- [x] Transactions Dashboard
- [x] Single Transaction Popup/Dialog
- [x] Pagination System
- [x] 404 Error pages
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
git clone https://github.com/roshanlc/machnet-react-golang-assignment.git

cd machnet-react-golang-assignment/frontend

cp .env.example .env

# modify the backend url in .env
vim .env

npm install

## Production
npm run prod

# Visit the browser at http://localhost:9001
```

Visit the browser at [http://localhost:9001](http://localhost:9001)
