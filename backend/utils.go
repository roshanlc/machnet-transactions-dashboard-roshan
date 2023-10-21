package main

import (
	"os"

	"github.com/joho/godotenv"
)

// struct to hold dtabase credentials
type DBCredentials struct {
	Host     string
	Port     string
	Username string
	Password string
	DBname   string
}

// read environment variables
func readEnv() (*DBCredentials, error) {
	credentials := DBCredentials{}

	err := godotenv.Load()
	if err != nil {
		return nil, err
	}

	credentials.Host = os.Getenv("host")
	credentials.Port = os.Getenv("port")
	credentials.Username = os.Getenv("username")
	credentials.Password = os.Getenv("password")
	credentials.DBname = os.Getenv("dbname")

	return &credentials, nil
}
