package main

import (
	"os"
	"testing"
)

func TestReadEnv(t *testing.T) {

	// set Environment variables
	os.Setenv("host", "localhost")
	os.Setenv("port", "9000")
	os.Setenv("username", "admin")
	os.Setenv("password", "password")
	os.Setenv("dbname", "test")

	tempEnv, _ := os.Create(".env")
	creds, err := readEnv()

	if err != nil {
		t.Errorf("Error reading env variables: %v", err)
	}
	type tests struct {
		description string
		input       string
		expected    string
	} // define test cases

	// test cases
	testCases := []tests{
		{
			description: "Host",
			input:       creds.Host,
			expected:    "localhost",
		},
		{
			description: "Username",
			input:       creds.Username,
			expected:    "admin",
		},
		{
			description: "Password",
			input:       creds.Password,
			expected:    "password",
		},
		{
			description: "Port",
			input:       creds.Port,
			expected:    "9000",
		},
		{
			description: "DBname",
			input:       creds.DBname,
			expected:    "test",
		},
	}

	// run tests
	for _, test := range testCases {
		t.Run(test.description, func(t *testing.T) {
			if test.input != test.expected {
				t.Errorf("Expected: %v, Got: %v", test.expected, test.input)
			}
		})
	}

	// cleanup
	tempEnv.Close()
	os.Remove("env")
}
