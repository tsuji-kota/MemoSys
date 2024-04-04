package repository

import (
	_ "github.com/go-sql-driver/mysql"
	"github.com/tsuji-kota/MemoSys/backend/schema"
	"golang.org/x/crypto/bcrypt"
	"log"
)

func PostLogin(user schema.Users) (error, int) {
	var hashedPassword string
	var id int

	err := db.QueryRow("SELECT password,id FROM users WHERE user_id = ?", user.UserId).Scan(&hashedPassword,&id)
	if err != nil {
		log.Printf("failed to get data to the db: %v", err)

	}
	//TODO
	//空の場合にエラーを返す処理を実行（フロントで実装したい）
	// user.Password と hashedPassword が string 型の場合
	err = bcrypt.CompareHashAndPassword([]byte(hashedPassword), []byte(user.Password))
	if err != nil {
		log.Printf("failed to login: %v", err)		

	}

	return err, id

}
