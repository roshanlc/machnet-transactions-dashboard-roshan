## Machent Assignment (Go + React) - Backend

The backend for the provided assignment by Machnet. Written in Go with Gin(routing).
> Runs on port 9000

### Completed

- [x] Transactions API
- [x] Pagination
- [x] Postgres DB
- [x] Dockerfile

### Libraries

- Gin
- GORM (ORM)
- Faker (for dummy data generation)

### Database
- PostgreSQL

### Run With Docker
Please check the [main README file](../README.md) for running with Docker compose (backend+db+frontend).

### Run Backend

```bash
# clone the repo and cd into it
git clone <repo_url>

cd <directory>

cp .env.example .env

# modify the database credentials in .env
vim .env

go run .
```

### API DOCUMENTATION

| Endpoint                 | Description                                 | Supported Query Params                                  | Response | Pagination Support |
|--------------------------|---------------------------------------------|---------------------------------------------------------|----------|--------------------|
| /api/v1/transactions     | Details of (multiple)transactions in system | **limit** (no.of items/page)<hr/>**page**(current page) | JSON     | YES                |
| /api/v1/transactions/:id | Detail of a single transaction              |                                                         | JSON     | NO                 |

### API RESPONSE

```bash
curl "http://localhost:9000/api/v1/transactions?limit=1&page=1"

{
  "data": [
    {
      "ID": 1,
      "CreatedAt": "2023-10-22T08:20:06.411584+05:45",
      "UpdatedAt": "2023-10-22T08:20:06.411584+05:45",
      "DeletedAt": null,
      "Date": "2023-10-22T08:20:06.40916+05:45",
      "Amount": 1816,
      "FromAccountID": 1,
      "ToAccountID": 2,
      "TransactionStatusID": 1,
      "FromAccount": {
        "ID": 1,
        "CreatedAt": "2023-10-22T08:20:06.398986+05:45",
        "UpdatedAt": "2023-10-22T08:20:06.398986+05:45",
        "DeletedAt": null,
        "number": "5354918241276318",
        "CustomerID": 1,
        "AccountTypeID": 1,
        "Balance": 500,
        "Customer": {
          "ID": 1,
          "CreatedAt": "2023-10-22T08:20:06.389492+05:45",
          "UpdatedAt": "2023-10-22T08:20:06.389492+05:45",
          "DeletedAt": null,
          "email": "mQSuuIF@wqoporN.info",
          "name": "Miss Leola Block",
          "accounts": null,
          "bank": 1,
          "Bank": {
            "ID": 1,
            "CreatedAt": "2023-10-22T08:20:06.38397+05:45",
            "UpdatedAt": "2023-10-22T08:20:06.38397+05:45",
            "DeletedAt": null,
            "name": "A Bank",
            "description": "Banks for Awesome people",
            "Customers": null
          }
        },
        "AccountType": {
          "ID": 1,
          "CreatedAt": "2023-10-22T08:20:06.374498+05:45",
          "UpdatedAt": "2023-10-22T08:20:06.374498+05:45",
          "DeletedAt": null,
          "type": "Savings"
        }
      },
      "ToAccount": {
        "ID": 2,
        "CreatedAt": "2023-10-22T08:20:06.398986+05:45",
        "UpdatedAt": "2023-10-22T08:20:06.398986+05:45",
        "DeletedAt": null,
        "number": "5353378250700872",
        "CustomerID": 2,
        "AccountTypeID": 4,
        "Balance": 1000,
        "Customer": {
          "ID": 2,
          "CreatedAt": "2023-10-22T08:20:06.389492+05:45",
          "UpdatedAt": "2023-10-22T08:20:06.389492+05:45",
          "DeletedAt": null,
          "email": "iOBTPtv@DArcFqS.top",
          "name": "Dr. Shanelle Sporer",
          "accounts": null,
          "bank": 1,
          "Bank": {
            "ID": 1,
            "CreatedAt": "2023-10-22T08:20:06.38397+05:45",
            "UpdatedAt": "2023-10-22T08:20:06.38397+05:45",
            "DeletedAt": null,
            "name": "A Bank",
            "description": "Banks for Awesome people",
            "Customers": null
          }
        },
        "AccountType": {
          "ID": 4,
          "CreatedAt": "2023-10-22T08:20:06.374498+05:45",
          "UpdatedAt": "2023-10-22T08:20:06.374498+05:45",
          "DeletedAt": null,
          "type": "Debit"
        }
      },
      "TransactionStatus": {
        "ID": 1,
        "CreatedAt": "2023-10-22T08:20:06.405907+05:45",
        "UpdatedAt": "2023-10-22T08:20:06.405907+05:45",
        "DeletedAt": null,
        "status": "Completed"
      }
    }
  ],
  "pages": {
    "current_page": 1,
    "next_page": 2,
    "total_pages": 60,
    "limit": 1
  }
}
```

_Similarly,_
````bash
curl "http://localhost:9000/api/v1/transactions/1

{
    "data": ....
}
```