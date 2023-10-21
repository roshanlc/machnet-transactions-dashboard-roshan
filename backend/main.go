package main

import (
	"fmt"
	"log"
	"math/rand"
	"time"

	"github.com/go-faker/faker/v4"
	"github.com/roshanlc/machent-assignment-backend/models"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

// struct to hold Application level
// values and connections
type Application struct {
	DB *gorm.DB
}

// generate a random number (int)
// and exclude the given number
// in the range of 0 to 1
func randomize(offset, max int) int {
	var r int
	for {
		r = rand.Intn(max)
		if r != offset {
			break
		}
	}

	return r
}

func main() {

	db := setupDB()
	populateDB(db)

	// app := Application{DB: db}

	// router := gin.Default()

	// router.GET("/", func(c *gin.Context) {
	// 	var customer models.Customer
	// 	db.Preload("Accounts").Preload("Accounts.AccountType").Preload("Accounts.Customer").Preload("Accounts.Customer.Bank").Find(&customer)
	// 	c.JSON(200, customer)

	// })
	// router.GET("/transactions/:id", app.singleTransactionHandler)
	// router.GET("/transactions", paginationMiddleware, app.transactionHandler)

	// router.Run(":9000")
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

// populateDB populates the tables in database
func populateDB(db *gorm.DB) {

	// types of account
	accountTypes := []models.AccountType{
		{Type: "Savings"},
		{Type: "Payroll"},
		{Type: "Credit"},
		{Type: "Debit"},
		{Type: "Mega-Credit"},
	}

	result := db.Create(&accountTypes)

	// check for errors
	if result.Error != nil {
		log.Println(result.Error)
		return
	}

	// methods of payment
	paymentMethods := []models.PaymentMethod{
		{Method: "Transfer"},
		{Method: "Check Deposit"},
		{Method: "Wiring"},
	}

	result = db.Create(&paymentMethods)

	// check for errors
	if result.Error != nil {
		log.Println(result.Error)
		return
	}

	banks := []models.Bank{
		{Name: "A Bank", Description: "Banks for Awesome people"},
		{Name: "B Bank", Description: "Banks for Babal People"},
		{Name: "C Bank", Description: "Banks for Cunning People"},
		{Name: "D Bank", Description: "Banks for Darn Good People"},
		{Name: "E Bank", Description: "Banks for E-tech Lovers"},
	}

	result = db.Create(&banks)

	// check for errors
	if result.Error != nil {
		log.Println(result.Error)
		return
	}

	var customers []models.Customer

	for i := 0; i < 30; i++ {
		index := (i / len(banks))
		if index == 5 {
			index = 1
		}

		temp := models.Customer{
			Email:  faker.Email(),
			Name:   faker.Name(),
			BankID: banks[index].ID}
		customers = append(customers, temp) // add to the customers
	}

	result = db.Create(&customers)
	if result.Error != nil {
		log.Println(result.Error)
		return
	}

	var accounts []models.Account

	for _, customer := range customers {
		index := (int(customer.ID) / len(accountTypes))
		if index == 5 {
			index = 1
		}

		acc := models.Account{
			Number:        faker.CCNumber(),
			Balance:       (1000 * float64(customer.ID)) / 2.0,
			CustomerID:    customer.ID,
			AccountTypeID: uint(index),
		}

		accounts = append(accounts, acc)
	}

	result = db.Create(&accounts)

	if result.Error != nil {
		log.Println(result.Error)
		return
	}

	transcType := []models.TransactionStatus{
		{Status: "Completed"},
		{Status: "Pending"},
	}

	db.Create(&transcType)
	if result.Error != nil {
		log.Println(result.Error)
		return
	}

	var transx []models.Transaction

	// create a cyclic transaction type
	// first to second, second to third....last to first to complete it
	for i := 0; i < len(accounts); i++ {
		var tx models.Transaction
		// random index for tx type
		index := rand.Intn((len(transcType)) - 1)

		if i == len(accounts)-1 {
			tx = models.Transaction{
				Date:                time.Now(),
				Amount:              rand.Float64() * 5000,
				FromAccountID:       accounts[i].ID,
				ToAccountID:         accounts[0].ID,
				TransactionStatusID: transcType[index].ID,
			}

		} else {
			tx = models.Transaction{
				Date:                time.Now(),
				Amount:              rand.Float64() * 5000,
				FromAccountID:       accounts[i].ID,
				ToAccountID:         accounts[i+1].ID,
				TransactionStatusID: transcType[index].ID,
			}
		}
		transx = append(transx, tx)
	}

	db.Create(&transx)
	if result.Error != nil {
		log.Println(result.Error)
		return
	}

	for _, val := range transx {
		fmt.Printf("%+v\n", val)
	}

	fmt.Println("Succeded in populating db.")

}
