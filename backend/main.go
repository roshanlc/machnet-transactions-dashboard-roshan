package main

import (
	"log"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

// struct to hold Application level
// values and connections
type Application struct {
	DB          *gorm.DB
	Credentails *DBCredentials
}

func main() {
	// fetch db credentials from environment variables
	dbCreds, err := readEnv()

	if err != nil {
		log.Fatal(err)
	}

	// setup tables in db
	db := setupDB(dbCreds)
	log.Println("Created database tables")
	populateDB(db) // db population

	// set up application instance
	// required by controllers
	app := Application{Credentails: dbCreds, DB: db}

	// setup router and controllers
	router := gin.Default()

	router.GET("/transactions/:id", app.singleTransactionHandler)
	router.GET("/transactions", paginationMiddleware, app.transactionHandler)

	// run at port 9000
	// hardcoded
	log.Fatal(router.Run(":9000"))
}
