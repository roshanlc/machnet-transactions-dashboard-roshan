package main

import (
	"log"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/roshanlc/machent-assignment-backend/models"
	"gorm.io/gorm"
)

// api response
type Response struct {
	Data  any    `json:"data"`
	Pages *Pages `json:"pages"`
}

// Handler for the transaction endpoint (GET Method)
func (app *Application) transactionHandler(c *gin.Context) {
	// Pagination details
	pagination := c.MustGet("pagination").(*Pagination)

	offset := 0

	if pagination.Page > 1 {
		// eg: for page 2, the offset should be the contents of page 1 and so on
		offset = (pagination.Page - 1) * pagination.Limit
	}

	var tx []models.Transaction

	// store the total count of items in table
	var count int64

	// fetch customers data with limit and offset
	app.DB.
		Offset(offset).
		Limit(pagination.Limit).
		Preload("FromAccount").
		Preload("FromAccount.AccountType").
		Preload("FromAccount.Customer").
		Preload("FromAccount.Customer.Bank").
		Preload("ToAccount").
		Preload("ToAccount.AccountType").
		Preload("ToAccount.Customer").
		Preload("ToAccount.Customer.Bank").
		Preload("TransactionStatus").
		Find(&tx)

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
		Data: tx,
		Pages: &Pages{
			TotalPages:   total,
			CurrentPage:  pagination.Page,
			NextPage:     next,
			ItemsPerPage: pagination.Limit},
	})
}

// handler for single transaction detail (GET method)
func (app *Application) singleTransactionHandler(c *gin.Context) {
	id := c.Param("id")

	idVal, err := strconv.Atoi(id)

	// check for values
	if err != nil {
		log.Println(err)
		c.JSON(500, gin.H{"error": err.Error()})
	}

	// check for negative and zero values
	if idVal <= 0 {
		c.JSON(400, gin.H{"error": "provide a positive id value."})
	}

	// fetch transaction based on id val
	var tx models.Transaction

	result := app.DB.
		Preload("FromAccount").
		Preload("FromAccount.AccountType").
		Preload("FromAccount.Customer").
		Preload("FromAccount.Customer.Bank").
		Preload("ToAccount").
		Preload("ToAccount.AccountType").
		Preload("ToAccount.Customer").
		Preload("ToAccount.Customer.Bank").
		Preload("TransactionStatus").
		First(&tx, idVal)

	if result.Error != nil {
		log.Println(result.Error) // log the errors
		var errCode int = 404
		var errMsg any = gin.H{"error": result.Error.Error()}

		if result.Error == gorm.ErrRecordNotFound {
			errCode = 404
			errMsg = gin.H{"error": result.Error.Error()}
		}
		c.JSON(errCode, errMsg)
		return
	}

	c.JSON(200, tx)
}
