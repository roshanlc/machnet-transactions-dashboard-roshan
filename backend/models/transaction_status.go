package models

import "gorm.io/gorm"

// Status for a transaction
// such as pending, aborted, success, failed, ...
type TransactionStatus struct {
	gorm.Model
	Status string `gorm:"uniqueIndex" json:"status"`
}
