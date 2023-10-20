package models

import (
	"fmt"

	"gorm.io/gorm"
)

// Bank struct holds details about a bank
type Bank struct {
	gorm.Model
	Name        string `gorm:"uniqueIndex" json:"name"`
	Description string `json:"description"`
	Customers   []Customer
}

// Pretty print for the Bank struct
func (bank Bank) String() string {
	return fmt.Sprintf("ID: %d, Name: %s, Description: %s",
		bank.ID,
		bank.Name,
		bank.Description)
}
