package models

import (
	"fmt"

	"gorm.io/gorm"
)

// Acount struct to hold info about an account
type Account struct {
	gorm.Model
	Number        string  `gorm:"uniqueIndex" json:"number"` // acount number
	CustomerID    uint    // many to one ,i.e a customer can have many accounts
	AccountTypeID uint    // type of the account
	Balance       float64 // balance in the account

	Customer    Customer    `gorm:"foreignKey:CustomerID"`
	AccountType AccountType `gorm:"foreignKey:AccountTypeID"`
}

func (acc Account) String() string {
	return fmt.Sprintf("AccountID: %d, Number: %s, CustomerID: %v, AccountTypeID: %v, Balance: %f",
		acc.ID,
		acc.Number,
		acc.CustomerID,
		acc.AccountTypeID,
		acc.Balance,
	)
}
