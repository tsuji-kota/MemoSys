package repository

import (
	_ "github.com/go-sql-driver/mysql"
	_ "github.com/tsuji-kota/MemoSys/backend/schema"
	_ "golang.org/x/crypto/bcrypt"
	_ "log"
)


func DeleteIssue(bill_id string,) (error) {

	_, err := db.Exec("DELETE FROM bills WHERE id = ?", bill_id)

	return  err
}