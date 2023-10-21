package models

import (
	"fmt"

	"gorm.io/gorm"
)

// Type of Account
// such as savings, current, ...
type AccountType struct {
	gorm.Model
	Type string `gorm:"uniqueIndex" json:"type"`
	// Accounts []Account
}

func (accountType AccountType) String() string {
	return fmt.Sprintf(`ID: %d, Type: %s`, accountType.ID, accountType.Type)
}
