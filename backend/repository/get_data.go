package repository

import (
	_ "github.com/go-sql-driver/mysql"
	"github.com/tsuji-kota/MemoSys/backend/schema"
	"golang.org/x/crypto/bcrypt"
	"log"
)

func GetData(fkUser_id int) error {
	err := db.QueryRow("SELECT password,id FROM users WHERE user_id = ?", user.UserId)


}