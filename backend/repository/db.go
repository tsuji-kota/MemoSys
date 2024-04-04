package repository

import (
	"database/sql"
	_ "github.com/go-sql-driver/mysql"
	"log"
)

var db *sql.DB

func init() {
	log.Println("connect to database")
	openDB()
}

func openDB() {
	db_name, err := sql.Open("mysql", "root:root@tcp(memosys-db:3306)/memosys-db?")
	if err != nil {
		log.Fatalf("main sql.Open error err:%v", err)
	}
	db = db_name

}

func closeDB() {
	log.Println("disconnect from database")
	db.Close()
}
