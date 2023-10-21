package main

import (
	"fmt"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/roshanlc/machent-assignment-backend/models"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

// struct to hold Application level
// values and connections
type Application struct {
	DB *gorm.DB
}

func main() {

	db := setupDB()
	populateDB(db)

	app := Application{DB: db}

	router := gin.Default()

	router.GET("/", func(c *gin.Context) {
		var customer models.Customer
		db.Preload("Accounts").Preload("Accounts.AccountType").Preload("Accounts.Customer").Preload("Accounts.Customer.Bank").Find(&customer)
		c.JSON(200, customer)

	})
	router.GET("/transactions/:id", app.singleTransactionHandler)
	router.GET("/transactions", paginationMiddleware, app.transactionHandler)

	router.Run(":9000")
}

// Setup db connection and tables
// returns db connection
func setupDB() *gorm.DB {

	// open db
	db, err := gorm.Open(sqlite.Open("test.db"), &gorm.Config{})

	if err != nil {
		panic("failed to connect database" + err.Error())

	}
	// create tables in db
	err = db.AutoMigrate(&models.AccountType{},
		&models.Account{},
		&models.Bank{},
		&models.Customer{},
		&models.PaymentMethod{},
		&models.TransactionStatus{},
		&models.Transaction{},
	)
	// check for error
	if err != nil {
		panic("failed to create tables" + err.Error())
	}

	return db
}

func populateDB(db *gorm.DB) {

	bank := &models.Bank{Name: "Nattu Bank", Description: "Banks for Nattusss"}

	result := db.Create(bank)
	if result.Error != nil {
		return
	}

	customerOne := &models.Customer{Email: "customer1@gmail.com", Name: "Customer 1", BankID: bank.ID}
	result = db.Create(customerOne)
	if result.Error != nil {
		return
	}

	customerTwo := &models.Customer{Email: "customer2@gmail.com", Name: "Customer 2", BankID: bank.ID}
	result = db.Create(customerTwo)
	if result.Error != nil {
		return
	}

	accountType := &models.AccountType{Type: "savings"}
	result = db.Create(accountType)
	if result.Error != nil {
		return
	}

	accountOne := &models.Account{Number: "12345N",
		CustomerID:    customerOne.ID,
		AccountTypeID: accountType.ID,
		Balance:       65.65}

	result = db.Create(accountOne)
	if result.Error != nil {
		return
	}

	accountTwo := &models.Account{Number: "6565N",
		CustomerID:    customerTwo.ID,
		AccountTypeID: accountType.ID,
		Balance:       65.65}

	result = db.Create(accountTwo)
	if result.Error != nil {
		return
	}

	transcType := &models.TransactionStatus{Status: "Completed"}

	result = db.Create(&transcType)
	if result.Error != nil {
		return
	}

	transc := &models.Transaction{Date: time.Now(),
		Amount:              65.699,
		FromAccountID:       accountOne.ID,
		ToAccountID:         accountTwo.ID,
		TransactionStatusID: transcType.ID}

	result = db.Create(&transc)
	if result.Error != nil {
		return
	}

	fmt.Println("Succeded in populating db.")

}
