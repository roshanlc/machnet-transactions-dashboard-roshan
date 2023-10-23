package main

import (
	"log"

	"github.com/gin-contrib/cors"
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

	// set server mode
	gin.SetMode(dbCreds.GinMode)

	// setup router and controllers
	router := gin.Default()
	router.Use(gin.Logger(), gin.Recovery()) // setup default logger and recovery middleware

	// Setup CORS policy
	router.Use(cors.New(cors.Config{
		AllowOrigins: []string{"*", "http://localhost:9001"},
		// AllowCredentials: true,
		AllowWebSockets: true,
		AllowHeaders:    []string{"Content-Type", "Accept", "Origin"},
		AllowMethods:    []string{"GET", "POST", "PUT", "PATCH", "DELETE", "HEAD", "OPTIONS"},
		ExposeHeaders:   []string{"access-control-allow-origin", "Access-Control-Allow-Methods", "Vary"},
	}))

	// basic api versioning
	v1 := router.Group("/api/v1")
	{
		v1.GET("/transactions/:id", app.singleTransactionHandler)
		v1.GET("/transactions", paginationMiddleware, app.transactionHandler)
	}
	// run at port 9000
	// hardcoded
	log.Fatal(router.Run(":9000"))
}
