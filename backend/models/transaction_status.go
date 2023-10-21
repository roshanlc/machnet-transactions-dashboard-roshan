package models

import (
	"fmt"

	"gorm.io/gorm"
)

// Status for a transaction
// such as pending, aborted, success, failed, ...
type TransactionStatus struct {
	gorm.Model
	Status string `json:"status"`
}

func (status TransactionStatus) String() string {
	return fmt.Sprintf(`ID: %d, Status: %s`, status.ID, status.Status)
}
