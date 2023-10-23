package models

import (
	"fmt"
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
	PaymentMethodID     uint

	FromAccount       Account           `gorm:"foreignKey:FromAccountID"`
	ToAccount         Account           `gorm:"foreignKey:ToAccountID"`
	TransactionStatus TransactionStatus `gorm:"foreignKey:TransactionStatusID"`
	PaymentMethod     PaymentMethod     `gorm:"foreignKey:PaymentMethodID"`
}

func (tx Transaction) String() string {
	return fmt.Sprintf("ID: %d,Date: %v, Amount: %f, FromAccountID: %d, ToAccountID: %d, TransactionStatusID: %d",
		tx.ID,
		tx.Date,
		tx.Amount,
		tx.FromAccountID,
		tx.ToAccountID,
		tx.TransactionStatusID,
	)
}
