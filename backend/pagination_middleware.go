package main

import (
	"strconv"

	"github.com/gin-gonic/gin"
)

// struct to hold info about pagination details
type Pagination struct {
	Limit int
	Page  int
}

// struct for pagination details in api response
type Pages struct {
	CurrentPage  int   `json:"current_page"`
	NextPage     int   `json:"next_page"`
	TotalPages   int64 `json:"total_pages"`
	ItemsPerPage int   `json:"limit"`
}

// middleware that handles pagination
func paginationMiddleware(c *gin.Context) {
	limit := c.Query("limit")
	page := c.Query("page")

	// check for empty values
	if limit == "" {
		limit = "25"
	}

	if page == "" {
		page = "1"
	}

	limitVal, _ := strconv.Atoi(limit)
	pageVal, _ := strconv.Atoi(page)

	// check for negative values
	if limitVal < 0 {
		limitVal = 25
	}

	if pageVal <= 0 {
		pageVal = 1
	}

	c.Set("pagination", &Pagination{
		Limit: int(limitVal),
		Page:  int(pageVal),
	})
	c.Next()
}
