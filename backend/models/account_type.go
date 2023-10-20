package models

import "gorm.io/gorm"

// Type of Account
// such as savings, current, ...
type AccountType struct {
	gorm.Model
	Type string `gorm:"uniqueIndex" json:"type"`
	// Accounts []Account
}
