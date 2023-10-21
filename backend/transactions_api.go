package main

import (
	"fmt"

	"github.com/gin-gonic/gin"
	"github.com/roshanlc/machent-assignment-backend/models"
)

// Handler for the transaction endpoint
func (app *Application) transactionHandler(c *gin.Context) {
	pagination := c.MustGet("pagination").(*Pagination)

	fmt.Println(pagination)

	var customer []models.Customer
	app.DB.Preload("Accounts").Preload("Accounts.AccountType").Preload("Accounts.Customer").Preload("Accounts.Customer.Bank").Find(&customer)
	c.JSON(200, customer)
}
