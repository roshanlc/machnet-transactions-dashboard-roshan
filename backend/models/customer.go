package models

import (
	"fmt"

	"gorm.io/gorm"
)

// Information about a customer
type Customer struct {
	gorm.Model
	Email    string    `json:"email"`
	Name     string    `json:"name"`
	Accounts []Account `json:"accounts"`
	BankID   uint      `json:"bank"`

	Bank Bank `gorm:"foreignKey:BankID"`
}

// Pretty print for the Customer struct
func (customer Customer) String() string {
	return fmt.Sprintf("ID: %d, Name: %s, Email: %s, BankID: %d, Accounts: %v",
		customer.ID,
		customer.Name,
		customer.Email,
		customer.BankID,
		customer.Accounts)
}
