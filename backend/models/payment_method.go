package models

import "gorm.io/gorm"

// PaymentMethod  struct holds info about payment method
// such as direct transfer, check deposit, ...
type PaymentMethod struct {
	gorm.Model
	Method string `gorm:"uniqueIndex" json:"method"`
}
