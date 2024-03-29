package repository

import (
	"database/sql"
	"fmt"
	_ "github.com/go-sql-driver/mysql"
)

func init() {
	log.Println("connect to database")
	openDB()
}

func openDB() {
	db, err := sql.Open("mysql", "root:root@tcp(memmosys-db:3306)/memosys-db?")
	if err != nil {
		log.Fatalf("main sql.Open error err:%v", err)
	}

}

func CloseDB() {
	log.Println("disconnect from database")
	db.Close()
}
