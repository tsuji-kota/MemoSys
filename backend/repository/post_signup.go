package repository

import (
	"github.com/tsuji-kota/MemoSys/backend/schema"
	"golang.org/x/crypto/bcrypt"
	"log"
)

func PostSignup(user schema.Users) error {
	log.Printf("info: processing user is %v", user.UserId)
	log.Printf("info: processing user ps %v", user.Password)
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
	if err != nil {
		log.Fatalf("failed to generate hash ps: %v", err)

	}
	log.Printf("info: processing user id %v", hashedPassword)

	_, err = db.Exec("INSERT INTO users (user_id,password) VALUES (?,?)", user.UserId, hashedPassword)
	if err != nil {
		log.Fatalf("failed to send data to the db: %v", err)

	}

	//TODO
	//同じユーザーIDが存在する場合はエラーを返す処理を実行
	//空の場合もエラーを返す処理を実行（フロントで実装したい）
	return err
}
