package models

import (
	"time"

	"gorm.io/gorm"
)

// Info related to a transaction
type Transaction struct {
	gorm.Model
	Date                time.Time
	Amount              float64
	FromAccountID       uint // from account belongs to a transaction
	ToAccountID         uint // similar as above
	TransactionStatusID uint

	FromAccount       Account           `gorm:"foreignKey:FromAccountID"`
	ToAccount         Account           `gorm:"foreignKey:ToAccountID"`
	TransactionStatus TransactionStatus `gorm:"foreignKey:TransactionStatusID"`
}
