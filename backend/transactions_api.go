package main

import (
	"github.com/gin-gonic/gin"
	"github.com/roshanlc/machent-assignment-backend/models"
)

// api response
type Response struct {
	Data  any    `json:"data"`
	Pages *Pages `json:"pages"`
}

// Handler for the transaction endpoint
func (app *Application) transactionHandler(c *gin.Context) {
	// Pagination details
	pagination := c.MustGet("pagination").(*Pagination)

	offset := 0

	if pagination.Page > 1 {
		// eg: for page 2, the offset should be the contents of page 1 and so on
		offset = (pagination.Page - 1) * pagination.Limit
	}

	var customer []models.Customer

	// store the total count of items in table
	var count int64

	// fetch customers data with limit and offset
	app.DB.
		Offset(offset).
		Limit(pagination.Limit).
		Preload("Accounts").
		Preload("Accounts.AccountType").
		Preload("Accounts.Customer").
		Preload("Accounts.Customer.Bank").
		Find(&customer).
		Count(&count)

		// total pages count
	total := count / int64(pagination.Limit)

	if total <= 0 {
		total = 1
	}

	// next page for pagination
	var next int

	if count > int64(pagination.Page*pagination.Limit) {
		next = pagination.Page + 1
	}

	c.JSON(200, Response{
		Data: customer,
		Pages: &Pages{
			TotalPages:   total,
			CurrentPage:  pagination.Page,
			NextPage:     next,
			ItemsPerPage: pagination.Limit},
	})
}
