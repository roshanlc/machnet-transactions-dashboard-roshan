package main

import (
	"fmt"

	"github.com/roshanlc/machent-assignment-backend/models"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

func main() {

	db := setupDB()
	populateDB(db)
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
	// db.Where("customer_id = ?", user.ID).Find(&accounts)
	fmt.Println("Succeded in populating db.")

}
