package main

import (
	"strconv"

	"github.com/gin-gonic/gin"
)

// struct to hold info about pagination details
type Pagination struct {
	Limit  int
	Offset int
	Total  int
}

// struct for pagination details in api response
type Pages struct {
	Current int `json:"current"`
	Next    int `json:"next"`
	Total   int `json:"total"`
}

// middleware that handles pagination
func paginationMiddleware(c *gin.Context) {
	limit := c.Query("limit")
	offset := c.Query("offset")

	// check for empty values
	if limit == "" || len(limit) == 0 {
		limit = "25"
	}

	if offset == "" || len(offset) == 0 {
		offset = "0"
	}

	limitVal, _ := strconv.Atoi(limit)
	offsetVal, _ := strconv.Atoi(offset)

	// check for negative values
	if limitVal < 0 {
		limitVal = 25
	}

	if offsetVal < 0 {
		offsetVal = 0
	}

	c.Set("pagination", &Pagination{Limit: int(limitVal), Offset: int(offsetVal)})
	c.Next()
}
